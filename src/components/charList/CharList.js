import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component{
    state = {
        charsList: [],
        loading: true,
        error: false,
        newCharLoading: false,
        offset: 200,
        listEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequestNewChars();
    }

    onRequestNewChars = (offset) => {
        this.onListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onListLoaded)
        .catch(this.onError);
    }

    onListLoading = () => {
        this.setState({
            newCharLoading: true
        })
    }

    onListLoaded = (newCharsList) => {
        const listEnded = newCharsList.length < 15 ? true : false;
        this.setState(({charsList, offset}) => ({
            charsList: [...charsList, ...newCharsList],
            loading: false,
            newCharLoading: false,
            offset: offset + 15,
            listEnded: listEnded
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    renderItems(arr) {
        const allItemsFiltered = arr.filter(item => !item.thumbnail.includes('image_not_available') &&
            !item.thumbnail.includes('.gif'));
        const items =  allItemsFiltered.map((item) => {
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return items;
    }

    render() {
        const {charsList, loading, error, newCharLoading, offset, listEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const items = this.renderItems(charsList);
        const content = !(loading || error) ? items : null;

        //char__item_selected

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
                    onClick={() => this.onRequestNewChars(offset)}
                    style={{'display': listEnded? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;