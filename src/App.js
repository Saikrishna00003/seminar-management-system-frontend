import './App.css';
import { Route } from "react-router-dom";
import { Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AttendSeminar from './components/AttendSeminar';
import InfoDistribution from './components/InfoDistribution';
import ProfilePage from './components/Profile';
import Help from './components/Help';
import SeminarList from './components/SeminarList';
import AdminHome from './components/AdminHome';
import DashboardPage from './components/Dashboard';
import ShowList from './components/ShowList';
import AdminLogin from './components/AdminLogin';
import AdminGuideAdd from './components/AdminGuideAdd';
import UserGuideList from './components/UserGuideList';
import ChangePasswordPage from './components/ChangePasswordPage';
import EditProfilePage from './components/EditProfile';

function App() {
  return (
    <div className="App">
         <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/enroll" element={<SeminarList/>}/>
            <Route path="attend" element={<AttendSeminar/>}/>
            <Route path="/info" element={<InfoDistribution/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/admin-home" element={<AdminHome/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/showlist" element={<ShowList/>}></Route>
            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/guide-add" element={<AdminGuideAdd/>}/>
            <Route path="/guide-info" element={<UserGuideList/>}/>
            <Route path="/edit-profile" element={<EditProfilePage/>}/>
            <Route path="/change-password" element={<ChangePasswordPage/>}/>
          </Routes>  
    </div>
  );
}

export default App;
