
import Homes from "./pages/Home";
import Appointments from "./pages/Appointment";
import Appointment from "./pages/Appointment/Appointment";
import Registrations from "./pages/Registration";
import{BrowserRouter, Routes, Route, Link, Outlet} from "react-router-dom"
import Layout from "./components/Layout"



const Router=()=>{

    return(
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}> 
                     <Route element={<Homes/>} index />                     
                     <Route path="appointment" element={<Outlet/>}>
                        <Route element={<Appointments/>} index />
                        <Route element={<Appointment/>} path=":appointmentId"/>
                    </Route>    
                    </Route>             
                </Routes>
        <Link to="/">Home</Link> &ensp;
        <Link to="/appointment">Appointment</Link> &ensp;
        
        </BrowserRouter>
    )
    

}

export default Router;