import './ContactForm.scss';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import {addContact} from "../../store/contacts/contactSlice";
import {ContactType} from "../Contact/Contact";

type FormElementsConfig = {
    [key: string]: {
        defaultValue: string;
        inputType: string;
        placeholder: string;
        labelText: string;
        vSchema: any;
    };
}

type FormValues = {
    name: string;
    username: string;
    phone: string;
};

const formElementsConfig: FormElementsConfig = {
    name: {
        defaultValue: '',
        inputType: 'text',
        placeholder: 'Enter your name',
        labelText: 'Name',
        vSchema: string().min(5, 'Your Name is too short!').max(15, 'Your Name is too long').required('Name required!'),
    },
    username: {
        defaultValue: '',
        inputType: 'text',
        placeholder: 'Enter your username',
        labelText: 'Username',
        vSchema: string().min(5, 'Your Username is too short!').max(15, 'Your Username is too long').required('Username required!'),
    },
    phone: {
        defaultValue: '',
        inputType: 'text',
        placeholder: '0671234567',
        labelText: 'Phone Number',
        vSchema: string().length(10, 'Please, enter correct phone number!').required('Phone number required!'),
    },
};

function getValidationSchema() {
    let objWithSchemas: Record<string, any> = {};
    for (let key of Object.keys(formElementsConfig)) {
        objWithSchemas[key] = formElementsConfig[key].vSchema;
    }
    return object(objWithSchemas);
}

function ContactForm({ onAddContact: _onAddContact }: { onAddContact: (newContact: ContactType) => void }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            username: '',
            phone: '',
        },
        validationSchema: getValidationSchema(),
        onSubmit: async (values, { resetForm }) => {
            const newContact = {
                id: Date.now(),
                ...values,
            };
            dispatch(addContact(newContact));
            resetForm();
            navigate('/ContactList');
        },
    });

    const generateFormElements = () => {
        const formItems = [];
        for (let key of Object.keys(formElementsConfig)) {
            const { labelText, inputType, placeholder } = formElementsConfig[key];

            formItems.push(
                <Fragment key={key}>
                    <div className="input__wrapper">
                        <label className="input__label" htmlFor={key}>
                            {labelText}
                        </label>
                        <input
                            type={inputType}
                            id={key}
                            name={key}
                            value={formik.values[key as keyof FormValues]}
                            onChange={formik.handleChange}
                            placeholder={placeholder}
                        />
                        {formik.errors[key as keyof typeof formik.errors] && (
                            <p className="error">{formik.errors[key as keyof typeof formik.errors]}</p>
                        )}
                    </div>
                </Fragment>
            );
        }

        return (
            <fieldset className="form__inner">
                <legend className="form__title">Fill in the following form</legend>
                {formItems}
                <div className="button__wrapper">
                    <button className="btn-cancel" type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn-save" type="button" onClick={() => formik.submitForm()}>
                        Save
                    </button>
                </div>
            </fieldset>
        );
    };

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = () => {
        navigate('/ContactList');
    };

    return <form className="form">
        {generateFormElements()}
    </form>;
}

export default ContactForm;










