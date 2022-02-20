import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Validate from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './charSearch.scss';

const CharSearch = () => {
    const [char, setChar] = useState(undefined);
    const {getCharacterByName, resetError, process, setProcess} = useMarvelService();

    const updateChar = ({charName}) => {
        console.log('update char');
        resetError();
        getCharacterByName(charName)
            .then(() => setProcess('confirmed'))
            .then(response => {
                console.log('set char');
                    setChar(response);
                    if (response === null) {
                        setTimeout(() => {
                            setChar(undefined);
                        }, 7000);
                    }
                });
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

    console.log('render CharSearch');

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{charName: ''}}
                validationSchema={Validate.object({
                    charName: Validate.string().min(3, 'Minimum 3 symbols required').required('This field is required')
                })}
                onSubmit={(name, {resetForm}) => {
                    updateChar(name);
                    resetForm();
                }}
            >
                <Form>
                    <div className="char__search-label">Or find a character by name:</div>
                    <div className="char__search-wrapper">
                        <Field 
                            name="charName" 
                            type="text"
                            id="charName"
                            placeholder="Enter name" />
                        <button 
                            className="button button__main"
                            type="submit"
                            disabled={process === 'loading'}>
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <ErrorMessage name="charName" component="div" className="char__search-error" />
                </Form>
            </Formik>
            {content}
        </div>
    )
}

export default CharSearch;