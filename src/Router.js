/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import {
  BrowserRouter, Routes, Route, Outlet,
} from 'react-router-dom';
import Homes from './pages/Home';
import Appointments from './pages/Appointment';
import Appointment from './pages/Appointment/Appointment';
import Layout from './components/Layout';
import FillForm from './pages/Appointment/FillForm';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Homes />} index />
          <Route path="appointment" element={<Outlet />}>
            <Route element={<Appointments />} index />
            <Route element={<Appointment />} path=":appId" />
          </Route>

          <Route path=":fillForm" element={<FillForm />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default Router;
