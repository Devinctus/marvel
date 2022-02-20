import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [showChar, setShowChar] = useState(false);
    const {getCharacter, resetError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // Update random char every 60 seconds
        /*
        const TimerId = setInterval(updateChar, 60000);
        return () => {
            clearInterval(TimerId);
        };
        */
        // eslint-disable-next-line
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
        setShowChar(true);
    }

    const updateChar = () => {
        const id = ~~(Math.random() * (1011400 - 1011000) + 1011000);
        resetError();
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="randomchar">
            <CSSTransition in={showChar} timeout={800} unmountOnExit classNames="randomchar__block">
                <div className="randomchar__csstransition">
                    {setContent(process, RenderRandomChar, char)}
                </div>
            </CSSTransition>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={() => {
                    setShowChar(false);
                    updateChar();
                    }} 
                    className="button button__main">
                    <div className="inner">Try it</div>
                </button>
                <img src={mjolnir} alt="Mjolnir" className='randomchar__decoration' />
            </div>
        </div>
    )
}

const RenderRandomChar = ({data}) => {
    const {name, shortDescr, thumbnail, homepage, wiki} = data;
    const style = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : {objectFit: 'cover'};
    return (
            <div className="randomchar__block">
                <img src={thumbnail} alt={name} className="randomchar__img" style={style}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{shortDescr}</p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
} 

export default RandomChar;