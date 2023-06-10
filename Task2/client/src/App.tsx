import {Routes,Route, Navigate,useLocation, useNavigate} from "react-router-dom"
import './App.css';
import SidebarComponent from "./components/SidebarComponent";
import UploadComponent from "./components/UploadComponent";
import AdminComponent from "./components/AdminComponent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import ExceltableComponent from "./components/ExceltableComponent";

function App() {
  const authenticated = localStorage.getItem('token')
 
  const location = useLocation()
 const navigate= useNavigate()
  const getInitialRoute = () => {
  
    if (!authenticated) {
      return '/login';
    }
     else {
      return '/main'
    }
    
  }
  
  

  useEffect(() => {
  const validRoutes = [
      '/login',
      '/register',
      
    ]

    if (!authenticated&& !validRoutes.includes(location.pathname)) {
      navigate('/login')
    } else if (authenticated && validRoutes.includes(location.pathname)) {
      navigate('/')
    }
},[authenticated,location,navigate])


  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={getInitialRoute()} replace />}       
    />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/main" element={<SidebarComponent />}>
          <Route index element={<UploadComponent />} />
          
          <Route path="admin" element={<AdminComponent />} />

          
          <Route path="admin/:id" element={<ExceltableComponent />}/>
          
        </Route>
     </Routes>
    </div>
  );
}

export default App;
