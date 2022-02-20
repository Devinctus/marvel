import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data, isList) => {
    switch (process) {
        case 'waiting':
            return isList ? <Spinner/> : <Skeleton/>;
        case 'loading':
            return isList ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <ErrorMessage/>;
        default: throw new Error('Unexpected process');
    }
}

export default setContent;