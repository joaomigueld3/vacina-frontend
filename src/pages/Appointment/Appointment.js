import {
    Input,
    InputWrapper,
    Autocomplete,
    Select,
    PasswordInput,
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
  
  import axios from "../../services/api";
    import AutoCompleteItem from "../../components/AutoCompleteItem";
  

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
        if (isNewApp) {
          await axios.post("/appointment", form);
        } else {
          await axios.put(`/appointment/${appId}`, form);
        }
  
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

        <InputWrapper id="email" required label="Email Address" mb={8}>
          <Input
            id="email"
            name="email"
            onChange={onChange}
            placeholder="example@mantine.com"
            value={form.email}
          />
        </InputWrapper>
        
        <DateView
                    id="Birthdate"
                    label="Birthdate"
                    selected={form.birthDate}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    utcOffSet="-3"
                    required
                    onChange={(value) => onChange({ target: { name: "birthDate", value } })}
                  />

        <DatePicker
          label="Birthdate"
          onChange={(value) => onChange({ target: { name: "birthDate", value } })}
          required
          value={form.birthDate}
        />       
        
        
        <InputWrapper id="appDate" required label="Appointment Date" mb={8}>
          <Input
            label="Appointment Date"
            id="appDate"
            name="appDate"
            onChange={onChange}
            placeholder="2022-05-04"
            value={form.appDate}
          />
        </InputWrapper>

        <InputWrapper id="appTime" required label="Appointment Time" mb={8}>
          <Input
            label="Appointment Time"
            id="appTime"
            name="appTime"
            onChange={onChange}
            placeholder="8:00 ou 8:30 ou 9:00 ..."
            value={form.appTime}
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