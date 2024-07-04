
import {Routes,Route} from 'react-router-dom'
import OpenRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Auth from './pages/Auth';
import DashBoard from './pages/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Users from './components/dashboard/admin/Users';
import AddStore from './components/dashboard/admin/AddStore';
import AddUser from './components/dashboard/admin/AddUser';
import { useSelector } from 'react-redux';
import UserDashboard from './components/dashboard/UserDashboard';
import UpdatePassword from './components/dashboard/common/UpdatePassword';
import StoreOwnerDashboar from './components/dashboard/StoreOwnerDashboar';


function App() {
  const {user}=useSelector(state=>state.profile)
  console.log(user?.role);
  return (
    <>
      <Routes>
        {/* OpenRoute allows access to routes that don't require authentication */}
        <Route path='/' element={<OpenRoute>
                                   <Auth/>
                                 </OpenRoute>}
        />
        <Route element={<PrivateRoute>
                         <DashBoard/>
                        </PrivateRoute>
                       }>  
              {
                user?.role==="admin"&&<Route path='/dashboard' element={<AdminDashboard/>}></Route>
              }
              {
                user?.role==="admin"&&<Route path='/dashboard/users' element={<Users/>}></Route>
              }
              {
                user?.role==="admin"&&<Route path='/dashboard/addstore' element={<AddStore/>}></Route>
              }
              {
                user?.role==="admin"&&<Route path='/dashboard/adduser' element={<AddUser/>}></Route>
              }   
              {
                user?.role==="user"&&<Route path='/dashboard' element={<UserDashboard/>}></Route>
              } 
              {
                user?.role==="storeOwner"&&<Route path='/dashboard' element={<StoreOwnerDashboar/>}></Route>
              }
              <Route path='/dashboard/updatepassword' element={<UpdatePassword/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
