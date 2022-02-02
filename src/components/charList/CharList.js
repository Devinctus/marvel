import { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = (props) => {

    const [charsList, setCharsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharLoading, setNewCharLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [listEnded, setListEnded] = useState(false);
    const [activeChar, setActiveChar] = useState(null);


    const marvelService = new MarvelService();
    const charRef = useRef([]);
    const prevCharRef = useRef(activeChar);

    useEffect(() => {
        onRequestNewChars();
        // eslint-disable-next-line
    }, []);

    /* if needed to download chars by the end of scroll
    const scrollDown = useCallback(() => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            onRequestNewChars(offset);
        }
    }, [offset]);

    useEffect(() => {
        console.log('scroll');
        document.addEventListener('scroll', scrollDown);
        return () => {
            document.removeEventListener('scroll', scrollDown);
        };
    }, [scrollDown]);
    */

    useEffect(() => {
        prevCharRef.current = activeChar;
    }, [activeChar]);

    const focusOnChar = (index) => {
        if (charRef.current[index]) {
            //charRef.current.forEach(elem => elem.classList.remove('char__item_selected'));
            if(prevCharRef.current) {
                prevCharRef.current.classList.remove('char__item_selected');
            }
            charRef.current[index].classList.add('char__item_selected');
            charRef.current[index].focus();
        }
    }

    const onRequestNewChars = (offset) => {
        onListLoading();
        marvelService.getAllCharacters(offset)
        .then(onListLoaded)
        .catch(onError);
    }

    const onListLoading = () => {
        setNewCharLoading(true);
    }

    const onListLoaded = (newCharsList) => {
        const listEnded = newCharsList.length < 15 ? true : false;
        setCharsList(charsList => [...charsList, ...newCharsList]);
        setLoading(false);
        setNewCharLoading(false);
        setOffset(offset => offset + 15);
        setListEnded(listEnded);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const renderItems = (arr) => {
        const allItemsFiltered = arr.filter(item => !item.thumbnail.includes('image_not_available') &&
            !item.thumbnail.includes('.gif'));
        const items =  allItemsFiltered.map((item, index) => {
            return (
                <li tabIndex={0}
                    ref={element => (charRef.current[index] = element)}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        setActiveChar(charRef.current[index]);
                        focusOnChar(index);
                    }}
                    onKeyPress={event => {
                        if(event.key === 'Enter') {
                            props.onCharSelected(item.id);
                            setActiveChar(charRef.current[index]);
                            focusOnChar(index);
                        }
                    }}>
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return items;
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const items = renderItems(charsList);
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid">
                {content}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newCharLoading}
                onClick={() => onRequestNewChars(offset)}
                style={{'display': listEnded? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;