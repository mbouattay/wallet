import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Depenses from "./pages/Depenses/Depenses"
import Revenus from "./pages/Revenus/Revenus"
import Dashboard from "./pages/Dashboard/Dashboard"
import Categorie from "./pages/Categorie/Categorie"
import Profile from "./pages/Profile/Profile"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} >
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/depenses" element={<Depenses/>}/>
            <Route path="/revenus" element={<Revenus/>}/>
            <Route path="/categorie" element={<Categorie/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>  
        <Route path="/register" element={<Register/>}/>
        </Routes>
        <ToastContainer/>
    </BrowserRouter> 
        
  )
}

export default App
