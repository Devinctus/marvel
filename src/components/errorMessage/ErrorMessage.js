import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <img src={img} alt="Error" style={{display: 'block', width: '200px', height: '200px', objectFit: 'cover', margin: '0 auto', alignSelf: 'center'}}/>
    )
}

export default ErrorMessage;