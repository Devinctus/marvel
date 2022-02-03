import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComics.scss';

const SingleComics = () => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const {loading, error, getComics, resetError} = useMarvelService();

    useEffect(() => {
        updateComics();
    // eslint-disable-next-line
    }, [comicsId]);

    const updateComics = () => {
        if(!comicsId) {
            return;
        }
        resetError();
        getComics(comicsId)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comics) ? <RenderComicsInfo comics={comics}/> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const RenderComicsInfo = ({comics}) => {
    const {title, description, pageCount, thumbnail, language, price} = comics;

    return (
        <div className="single-comics">
            <img src={thumbnail} alt={title} className="single-comics__img"/>
            <div className="single-comics__info">
                <h2 className="single-comics__name">{title}</h2>
                <p className="single-comics__descr">{description}</p>
                <p className="single-comics__descr">{pageCount}</p>
                <p className="single-comics__descr">{language}</p>
                <div className="single-comics__price">{price}</div>
            </div>
            <Link to="/comics/" className='single-comics__back'>Back to All</Link>
        </div>
    )
}

export default SingleComics;