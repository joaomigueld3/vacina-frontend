/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Table, Button } from '@mantine/core';
import { Trash, Pencil } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

function User() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4444/api/appointment')
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const onCreateAppointment = () => {
    // navigate("new")
  };

  // eslint-disable-next-line no-unused-vars
  const onEditAppointment = async (_id) => {
    /*
        await axios.put(`http://localhost:4444/api/appointment/${_id}`)
        .then(()=>setAppointments(appointments.filter((app) => app._id !==_id)))

        .catch((error)=> console.error(error)); */
  };

  const onRemoveUser = async (_id) => {
    try {
      await axios.delete(`http://localhost:4444/api/appointment/${_id}`);
      setAppointments(appointments.filter((app) => app._id !== _id));
      showNotification({
        color: 'green',
        title: 'Success',
        message: 'Appointment removed with success!',
      });
    } catch (error) {
      console.error(error);
      showNotification({
        color: 'red',
        title: 'Error',
        message: error.response.data.message,
      });
    }
  };

  return (
    <div>
      <h1>
        Appointments (
        {appointments.length}
        )
      </h1>

      <Table
        horizontalSpacing="xs"
        verticalSpacing="xs"
        fontSize="xs"
        highlightOnHover
        striped
        overflow="hidden"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>CPF</th>
            <th>Email</th>
            <th>BirthDate</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Is Vaccinated?</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index}>
              <td>{app._id}</td>
              <td>{app.name}</td>
              <td>{app.cpf}</td>
              <td>{app.email}</td>
              <td>{app.birthDate}</td>
              <td>{app.appDate}</td>
              <td>{app.appTime}</td>
              <td>{app.isSolved.toString()}</td>
              <td>
                {app.report}
                {' '}
              </td>
              <td>
                <Button
                  leftIcon={<Pencil />}
                  variant="white"
                  size="xs"
                  ml={10}
                  color="gray"
                  onClick={() => navigate(app._id)}
                >
                  Edit Appointment
                </Button>
                <Button
                  leftIcon={<Trash />}
                  variant="white"
                  size="xs"
                  ml={10}
                  color="red"
                  onClick={() => onRemoveUser(app._id)}
                >
                  Remove Appointment
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default User;
