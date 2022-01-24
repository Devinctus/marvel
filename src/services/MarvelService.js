class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=da44da8e8cc8adedfe8c0ce3bc6ea446';
    _baseOffsetChar = 200;

    getData = async (url) => {
        const result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status - ${result.status}`);
        }

        return await result.json();
    }

    getAllCharacters = async (offset = this._baseOffsetChar) => {
        const allCharacters = await this.getData(`${this._apiBase}characters?limit=15&offset=${offset}&${this._apiKey}`);
        //const withImg = allCharacters.data.results.forEach(item => console.log(!item.thumbnail.includes('image_not_available')));
        //console.log(withImg);
        return allCharacters.data.results.map(this._transformCharData);
    }

    getCharacter = async (id) => {
        const char = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharData(char.data.results[0]);
    }

    _transformCharData = (char) => {
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
}

export default MarvelService;