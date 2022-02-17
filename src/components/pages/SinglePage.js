import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, contentType}) => {
    const {id} = useParams();
    const [content, setContent] = useState(null);
    const {loading, error, getComics, getCharacter, resetError} = useMarvelService();

    useEffect(() => {
        updateContent();
    // eslint-disable-next-line
    }, [id]);

    const updateContent = () => {
        resetError();
        switch(contentType) {
            case 'character' : 
                getCharacter(id)
                .then(onContentLoaded);
                break;
            case 'comics' : 
                getComics(id)
                .then(onContentLoaded);
                break;
            default : break;
        }
    }

    const onContentLoaded = (content) => {
        setContent(content);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const data = !(loading || error || !content) ? <Component content={content}/> : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {data}
        </>
    )
}

export default SinglePage;