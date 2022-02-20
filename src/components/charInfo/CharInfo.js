import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import propTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const [showChar, setShowChar] = useState(false);

    const {getCharacter, resetError, process, setProcess} = useMarvelService();

    useEffect(() => {
        setShowChar(false);
        updateChar();
        // eslint-disable-next-line
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        resetError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setShowChar(true);
    }

    return (
        <CSSTransition in={showChar} timeout={800} classNames="char__info">
            <div className="char__info">
                {setContent(process, RenderCharInfo, char)}
            </div>
        </CSSTransition>
    )
}

const RenderCharInfo = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            {comics.length ? <div className="char__comics">Comics:</div> : null}
            <ul className="char__comics-list">
                {
                    comics.map((item, index) => {
                        return (
                            <li key={index} className="char__comics-item">
                                <Link to={'/comics/' + item.resourceURI.slice(item.resourceURI.lastIndexOf('/') + 1)}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: propTypes.number
}

export default CharInfo;