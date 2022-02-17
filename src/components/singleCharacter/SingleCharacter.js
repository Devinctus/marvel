import './singleCharacter.scss';

const SingleCharacter = ({content}) => {

    const { name, description, thumbnail } = content;

    return (
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__img"/>
            <div>
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharacter;