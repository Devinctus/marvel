import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=da44da8e8cc8adedfe8c0ce3bc6ea446';
    const _baseOffsetChar = 200;

    const {loading, error, request, resetError} = useHttp();

    const getAllCharacters = async (offset = _baseOffsetChar) => {
        const allCharacters = await request(`${_apiBase}characters?limit=15&offset=${offset}&${_apiKey}`);
        //const withImg = allCharacters.data.results.forEach(item => console.log(!item.thumbnail.includes('image_not_available')));
        //console.log(withImg);

        return allCharacters.data.results.map(_transformCharData);
    }

    const getCharacter = async (id) => {
        const char = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharData(char.data.results[0]);
    }

    const _transformCharData = (char) => {
        let descr = char.description ? char.description : 'There is no description for this character';

        if (descr.length > 210) {
            let i = 209;
            while (/\d|\w/i.test(descr[i])) {
                i--;
            }
            descr = descr.slice(0, i) + '...';
        }
        
        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items.slice(0, 10)
        }
    }

    return {loading, error, getAllCharacters, getCharacter, resetError};
}

export default useMarvelService;