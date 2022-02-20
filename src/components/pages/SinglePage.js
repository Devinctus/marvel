import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, contentType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComics, getCharacter, resetError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateContent();
    // eslint-disable-next-line
    }, [id]);

    const updateContent = () => {
        resetError();
        switch(contentType) {
            case 'character' : 
                getCharacter(id)
                .then(onContentLoaded)
                .then(() => setProcess('confirmed'));
                break;
            case 'comics' : 
                getComics(id)
                .then(onContentLoaded)
                .then(() => setProcess('confirmed'));
                break;
            default : break;
        }
    }

    const onContentLoaded = (content) => {
        setData(content);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;