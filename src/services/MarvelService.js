import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=da44da8e8cc8adedfe8c0ce3bc6ea446';
    const _baseOffsetChar = 200;
    const _baseOffsetComics = 100;

    const {loading, error, request, resetError} = useHttp();

    const getAllCharacters = async (offset = _baseOffsetChar) => {
        const allCharacters = await request(`${_apiBase}characters?limit=20&offset=${offset}&${_apiKey}`)
            .then(response => {
                    return response.data.results.filter(item => !item.thumbnail.path.includes('image_not_available') && !item.thumbnail.extension.includes('gif'));
                })
                .then(response => response.slice(0, 9))
                .then(response => response.map(_transformCharData));

        return allCharacters;
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

    const getAllComics = async (offset = _baseOffsetComics) => {
        const allComics = await request(`${_apiBase}comics?issueNumber=1&limit=10&offset=${offset}&${_apiKey}`)
            .then(response => {
                return response.data.results.filter(item => !item.thumbnail.path.includes('image_not_available') && !item.thumbnail.extension.includes('gif'));
            })
            .then(response => response.slice(0, 8))
            .then(response => response.map(_transformComicsData));
        return allComics;
    }

    const _transformComicsData = (comics) => {
        const {id, title, thumbnail, prices} = comics;

        return {
            id: id,
            title: title,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            price: prices[0].price
        }
    }

    return {loading, error, getAllCharacters, getCharacter, resetError, getAllComics};
}

export default useMarvelService;