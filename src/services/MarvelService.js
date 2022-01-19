class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=da44da8e8cc8adedfe8c0ce3bc6ea446';

    getData = async (url) => {
        const result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status - ${result.status}`);
        }

        return await result.json();
    }

    getAllCharacters = async () => {
        const allCharacters = await this.getData(`${this._apiBase}characters?limit=9&offset=100&${this._apiKey}`);
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
            name: char.name,
            description: descr,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;