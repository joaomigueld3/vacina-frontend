# Vaccination project frontend

project in branch 'master'

## 📌 Overview  
Frontend application built with **React.js**, designed for managing vaccination appointments.

---

## 🚀 Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/vacina-frontend.git
cd vacina-frontend
```

2️⃣ Install Dependencies
```sh
npm install
```

3️⃣ Run the Application
```sh
npm start
```
- The frontend runs on `http://localhost:3000`
- The API is expected at `http://localhost:4444/api`

## 🛠 Features
### 🏠 Home Page
- Redirects to "List of Appointments" and "Schedule an Appointment"

### 📋 List of Appointments
✔ Fetches all registered appointments via GET request (using SWR)  
✔ Displays data in a sortable table (sorted by date and time)  
✔ Remove Appointment button:  
- Sends a DELETE request to the API
- Updates the table in real-time (SWR revalidation)  
✔ Edit Appointment button:
- Redirects to /appointment/:id
- Fetches and pre-fills data in a Mantine Form
- Updates the appointment via PUT request

### 🗓️ Schedule an Appointment
✔ Redirects to a Formik form  
✔ Validates all fields using Yup  
✔ Create Appointment button:  
- Sends a POST request to the API
- On success (200 response), redirects to List of Appointments

## 🎨 Tech Stack
✅ React.js – Frontend framework  
✅ Mantine – UI components & styling  
✅ Formik – Form management  
✅ Yup – Form validation  
✅ Axios – HTTP client  
✅ SWR – Data fetching & real-time updates  
