import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComics.scss';

const SingleComics = ({content}) => {
    const {title, description, pageCount, thumbnail, language, price} = content;

    return (
        <div className="single-comics">
            <Helmet>
                <title>{`${title} Marvel comics book`}</title>
                <meta name="description" content={description} />
            </Helmet>
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