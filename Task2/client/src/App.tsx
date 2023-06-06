import {Routes,Route} from "react-router-dom"
import './App.css';
import SidebarComponent from "./components/SidebarComponent";
import UploadComponent from "./components/UploadComponent";
import AdminComponent from "./components/AdminComponent";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<SidebarComponent />}>
          <Route index element={<UploadComponent />} />
          
          <Route path="admin" element={<AdminComponent />} />
          
        </Route>
     </Routes>
    </div>
  );
}

export default App;
