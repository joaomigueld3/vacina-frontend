import React from 'react';
import {
    Button,
  } from "@mantine/core";
import {
  Formik, Form,
} from 'formik';
import * as yup from 'yup';
import { showNotification } from "@mantine/notifications";
import FormikControl from '../../components/Formik/FormikControl';
import axios from '../../services/api';
import { useNavigate, useParams } from "react-router-dom";


function FillForm() {
    const {navigate} = useNavigate();
    const { appId } = useParams();
    const initialValues = {
      name: '',
      cpf: '',
      email:'',
      birthDate: null,
      appDate: null,
      appTime: null,
      isSolved:'',
      report:'',
    };

    const isNewApp = appId === "new";
    const pageTitle = isNewApp === "Create Appointment";
    
    const onSubmit = async (values) => {
        
        try {
          await axios.post('/appointment', {
            name: values.name,
            cpf: values.cpf,
            email: values.email,
            birthDate: values.birthDate,
            appDate: values.appDate,
            appTime: values.appTime._d.toLocaleTimeString().slice(0,5),
            isSolved: false,
            report: '',
          });
          showNotification({
            color: "green",
            title: "Success",
            message: `Appointment ${isNewApp ? "created" : "updated"} with success`,
          });
          navigate("/appointment");
        } 
        catch (error){
            showNotification({
              color: "red",
              title: "Failed",
              message: error.response.data.message || error.message || error.data
            });
          }
      };

      const validationSchema = yup.object({
        name: yup.string().required('Required Field').matches(/^[A-Za-zà-úÀ-Ú ]+$/, 'Name field must have only characters a-z '),
        cpf: yup.string().required('Required Field').min(11, 'Verify CPF').max(11, 'Verify CPF')
          .matches(/^[0-9]*$/, 'CPF must have only numbers'),
        email: yup.string().required('Required Field').max(30,'Email field max length is 30').nullable(),
        birthDate: yup.date().required('Required Field').nullable(),
        appDate: yup.date().required('Required Field').nullable(),
        appTime: yup.date().required('Required Field').nullable(),
        isSolved: yup.bool(),
        report: yup.string().max(70,'Report field max lenght is 70')
      });

      return (
          <div>
              <h1>{pageTitle}</h1>
              <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {
            (formik) => (
              <Form>
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                  placeholder="John Doe"
                />
                <br />
                <FormikControl
                  control="input"
                  type="text"
                  label="CPF"
                  name="cpf"
                  placeholder="09180165681"
                />
                <br />
                <FormikControl
                  control="input"
                  type="text"
                  label="Email"
                  name="email"
                  placeholder="john@gmail.com"
                />
                <br />
                <FormikControl
                  control="date"
                  label="BirthDate"
                  name="birthDate"
                  maxDate={new Date()}
                />
                <br />
                <FormikControl
                  control="date"
                  label="Appointment Date"
                  name="appDate"
                  minDate={new Date()}
                  maxDate={new Date(2060, 1, 31)}
                />
                <br />
                <FormikControl
                  control="time"
                  label="Appointment Time"
                  name="appTime"
                />
                <br />
                <Button name="submit" type="submit">Post Form</Button>
                {pageTitle}
              </Form>
            )
          }
        </Formik>

          </div>
        
      );
}
export default FillForm;