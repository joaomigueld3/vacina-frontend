# Getting Started with Create React App

ReactJS application
validations with yup, styles with Mantine, HTTP client Axios
run 'npm start'
default adress is localhost:3000
api adress is 'localhost:4444/api'
Home page redirects to 'List of Appointments' and 'Schedule an Appointment'
List of Appointments makes a GET request to the api and returns a table with all appointments 
registred in the database sorted by date and time using SWR
in the 'Remove Appointment' button the axios sends DELETE request and removes the appointment 
from database updating in realtime (using SWR) the list displayed for the user.
the 'Edit Appointment' button redirects to '/appointment/:id' makes a GET request to show 
the 'appointment' data in the field of the mantine form,
when the user clicks 'Update Appointment' axios sends a PUT request to de api, updates 
the 'appointment' data and redirects back to 'List of Appointments' (using SWR)
Button 'Schedule Appointment' redirects to a Formik form which validates every 
field with Yup, 'Create Appointment' button calls a function which 
sends a POST request do the api, if the api returns a status(200) the 'appointment' 
is posted in the db and the user is redirected to 'List of Appointments'.
