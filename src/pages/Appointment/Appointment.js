import {
    Input,
    InputWrapper,
    Button,
  } from "@mantine/core";
  import { DatePicker } from "@mantine/dates";
  import { useNavigate, useParams } from "react-router-dom";
  import { useEffect, useState, useCallback } from "react";
  import { showNotification } from "@mantine/notifications";
  import React from 'react';
  import DateView from 'react-datepicker';
  import "react-datepicker/dist/react-datepicker.css"
  import * as yup from 'yup';
  import FormikControl from "../../components/Formik/FormikControl";
  import axios from "../../services/api";
  

  const Appointment = () => {
    const {navigate} = useNavigate();
    const { appId } = useParams();
    const [form, setForm] = useState({
        name: "",
        cpf:"",
        email: "",
        birthDate: "",
        appDate:"",
        appTime:"",
        isSolved:"",
        report: "",
        
    });
  
    
  
    const isNewApp = appId === "new";
    const pageTitle = isNewApp ? "Create Appointment" : "Update Appointment";
  
    useEffect(() => {
      if (!isNewApp) {
        axios
          .get(`/appointment/${appId}`)
          .then((response) =>
            setForm({
              ...response.data,
              birthDate: new Date(response.data.birthDate),
            })
          )
          .catch((error) => {
            showNotification({
              color: "red",
              title: "Error",
              message: error.response.data.message || error.message,
            });
  
            navigate("/appointment");
          });
      }
    }, [isNewApp, appId, navigate]);
  
    const onChange = (event) => {
      setForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    };
  
    const onSubmit = useCallback(async () => {
      try {
        await axios.put(`/appointment/${appId}`, form);
      
  
        showNotification({
          color: "green",
          title: "Success",
          message: `Appointment ${isNewApp ? "created" : "updated"} with success`,
        });
  
        navigate("/appointment");
      } catch (error){
        showNotification({
          color: "red",
          title: "Failed",
          message: error.response.data.message || error.message || error.data
        });
      }
    }, [form, isNewApp, navigate, appId]);
  
    

    return (
      <div>
        <h1>{pageTitle}</h1>
  
        <InputWrapper id="name" required label="Name" description="Appointment Fullname">
          <Input
            id="name"
            name="name"
            onChange={onChange}
            placeholder="John Doe"
            value={form.name}
          />
        </InputWrapper>
  
        <InputWrapper id="cpf" required label="CPF" mb={8}>
          <Input
            id="cpf"
            name="cpf"
            onChange={onChange}
            placeholder="09125345678"
            value={form.cpf}
          />
        </InputWrapper>

        <InputWrapper id="isSolved" required label="Is Vaccinated?" mb={8}>
          <Input
            label="Is Vaccinated?"
            id="isSolved"
            name="isSolved"
            onChange={onChange}
            placeholder="true or false"
            value={form.isSolved}
          />
        </InputWrapper>

        <InputWrapper id="report" required label="Report" mb={8}>
          <Input
            label="Report"
            id="report"
            name="report"
            onChange={onChange}
            placeholder="81999999999"
            value={form.report}
          />
        </InputWrapper>

        <Button mt={16} onClick={onSubmit}>
          {pageTitle}
        </Button>
      </div>
    );
  };
  
  export default Appointment;