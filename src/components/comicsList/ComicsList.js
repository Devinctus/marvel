import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [listEnded, setListEnded] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequestNewComics(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequestNewComics = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onListLoaded);
    }

    const onListLoaded = (newComicsList) => {
        const listEnded = newComicsList.length < 8 ? true : false;
        setComicsList(ComicsList => [...ComicsList, ...newComicsList]);
        setNewComicsLoading(false);
        setOffset(offset => offset + 20);
        setListEnded(listEnded);
    }

    const renderItems = (arr) => {
        const items = arr.map((item) => {
            return (
                <li tabIndex={0}
                    className="comics__item"
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return items;
    }

    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const items = renderItems(comicsList);

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {items}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newComicsLoading}
                onClick={() => onRequestNewComics(offset)}
                style={{'display': listEnded? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;