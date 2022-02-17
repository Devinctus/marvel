import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Validate from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './charSearch.scss';

const CharSearch = () => {
    const [char, setChar] = useState(undefined);
    const {getCharacterByName, resetError} = useMarvelService();

    const updateChar = ({charName}) => {
        resetError();
        getCharacterByName(charName)
            .then(response => setChar(response));
    }
    const content = char === undefined ? null : char ? 
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char.name} page?</div>
            <Link to={`/characters/${char.id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> : 
        <div className="char__search-error">
            The character was not found!<br/>Check the name and try again
        </div>;

    return (
        <div>
            <Formik
                initialValues={{charName: ''}}
                validationSchema={Validate.object({
                    charName: Validate.string().min(3, 'Minimum 3 symbols required').required('This field is required')
                })}
                onSubmit={name => updateChar(name)}
            >
                <Form className="char__search-form">
                    <div className="char__search-label">Or find a character by name:</div>
                    <div className="char__search-wrapper">
                        <Field name="charName" type="text" />
                        <button 
                            className="button button__main"
                            type="submit">
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <ErrorMessage name="charName" component="div" className="char__search-error" />
                    {content}
                </Form>
            </Formik>
        </div>
    )
}

export default CharSearch;