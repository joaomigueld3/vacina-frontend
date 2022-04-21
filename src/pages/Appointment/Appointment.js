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
        phones: "",
        appDate:"",
        appTime:"",
        isSolved:"",
        
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
      } catch (error) {
        showNotification({
          color: "red",
          title: "Failed",
          message: error.message,
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

        <InputWrapper id="email" required label="Email Address" mb={8}>
          <Input
            id="email"
            name="email"
            onChange={onChange}
            placeholder="example@mantine.com"
            value={form.email}
          />
        </InputWrapper>
        
        <DatePicker
          label="Birthdate"
          onChange={(value) => onChange({ target: { name: "birthDate", value } })}
          required
          value={form.birthDate}
        />       
        
        <InputWrapper id="phones" required label="Phone Number" mb={8}>
          <Input
            label="Phone Number"
            id="phones"
            name="phones"
            onChange={onChange}
            placeholder="81999999999"
            value={form.phones}
          />
        </InputWrapper>
  
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

        <Button mt={16} onClick={onSubmit}>
          {pageTitle}
        </Button>
      </div>
    );
  };
  
  export default Appointment;