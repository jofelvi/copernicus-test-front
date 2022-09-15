import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import './UserForm.css';
import {CountriesJson} from "../utils/countriesJson";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {createUserAsync, selectEditStatus, selectUser, selectUsers, updateUserAsync} from "../store/user/userSlice";
import {useNavigate, useParams} from "react-router-dom";

export const UserForm = () => {
    const [countries, setCountries] = useState(CountriesJson);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useAppDispatch();
    const userState = useAppSelector(selectUser);
    const btnEditState = useAppSelector(selectEditStatus);
    let { id } = useParams();
    let navigate = useNavigate();

    let initialValues = {
        email: '',
        first: '',
        last: '',
        company: "",
        country: "",
    }

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        btnEditState ?  initialValues = userState : initialValues
        console.log({id})
    }, [btnEditState, btnEditState]);

    const formik = useFormik({
        initialValues: userState  ,
        validate: (data:any) => {
            let errors = {};

            if (!data.first) {
                // @ts-ignore
                errors.first = 'Nombre es requerido';
            }
            if (!data.email) {
                // @ts-ignore
                errors.email = 'Email  es requerido.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                // @ts-ignore
                errors.email = 'email invalido debe ser  ejemplo example@email.com';
            }
            if (!data.last) {
                // @ts-ignore
                errors.last = 'Apellido es requerido.';
            }
            if (!data.company) {
                // @ts-ignore
                errors.company = 'Compañia es requerido';
            }
            if (!data.country) {
                // @ts-ignore
                errors.country = 'Pais es requerido';
            }
            return errors;
        },
        onSubmit: async (data:any) => {
            setFormData(data);
            data.country = data.country.name

            if( id === undefined){
                delete data.id
                delete data.created_at
                await dispatch(createUserAsync(data))
            }else{
                data.id = id
                //delete data.created_at
                await dispatch(updateUserAsync(data))
            }
            setShowMessage(true);
            formik.resetForm();
        }
    });

    // @ts-ignore
    const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: string) => {

        // @ts-ignore
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const handleHideModal = ()=>{
        navigate("/users");
        setShowMessage(false)
    }
    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => handleHideModal()} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5 }}>Su usuario fue editado satisfatoriamente
                        <b>{
                            // @ts-ignore
                            formData.name
                         }</b> ; muchas gracias por preferir a copernicus <b>
                        {
                            // @ts-ignore
                             formData.email
                        }</b> le enviaremos un mail con los siguientes pasos. jaja.
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Registrar </h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="first"
                                    name="first"
                                    // @ts-ignore
                                    value={formik.values.first}
                                    onChange={formik.handleChange}
                                    autoFocus className={classNames({ 'p-invalid': isFormFieldValid('first') })}
                                />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('first') })}>Nombre*</label>
                            </span>
                            {getFormErrorMessage('first')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                              <InputText
                                  id="last"
                                  name="last"
                                  value={formik.values.last}
                                  onChange={formik.handleChange}
                                  className={classNames({ 'p-invalid': isFormFieldValid('last') })}
                              />
                                <label htmlFor="last" className={classNames({ 'p-error': isFormFieldValid('last') })}>Apellido*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={classNames({ 'p-invalid': isFormFieldValid('email') })}
                                />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('Email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Dropdown
                                    id="country"
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    options={countries}
                                    optionLabel="name"
                                />
                                <label htmlFor="country">Pais</label>
                            </span>
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                              <InputText
                                  id="company"
                                  name="company"
                                  value={formik.values.company}
                                  onChange={formik.handleChange}
                                  className={classNames({ 'p-invalid': isFormFieldValid('company') })}
                              />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Empresa*</label>
                            </span>
                            {getFormErrorMessage('company')}
                        </div>

                        <Button type="submit" label="Enviar" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserForm
