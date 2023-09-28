import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useColorModeValue } from '@chakra-ui/react'
import '../App.css';

//SUPER ADMIN ROUTES
import SuperAdminSidebar from '../components/navigation/sideBar/01-superAdminSidebar'
import EditSuperAdminProfile from '../pages/01-super-admin/01-auth/02-editSuperAdminProfile'
import SuperAdminDashboard from '../pages/01-super-admin/01-SuperAdminDashboard';
import ManageDistUsers from '../pages/01-super-admin/02-manageDistUsers';

//NON USER ROUTES
import Home from "../pages/03-users/01-home.js"
// import Header from '../components/header/header';
import NavBar from '../components/navigation/navbar'
import SuperAdminLogin from '../pages/01-super-admin/01-auth/01-superAdminLogin';



const ConditionalRoute = () => {
  const { userRole } = useSelector(state => state.user)
  if (userRole === 'superAdmin') {
    return <SuperAdminRoutes />
  } else if (userRole === 'distAdmin') {
    return <DistAdminRoutes />
  } else if (userRole === 'user') {
    return <UserRoutes />
  } else {
    return <NonUserRoutes />
  }
}


const SuperAdminRoutes = () => {
  return (
    <>
      <SuperAdminSidebar />
      <Routes >
        <Route path="/" element={<SuperAdminDashboard  />} />
        <Route path="/profile" element={<EditSuperAdminProfile />} />
        <Route path="/user-management" element={<ManageDistUsers />} />

      </Routes>
    </>
  )
}

const DistAdminRoutes = () => {
  return (
    <>
      <Routes bg={useColorModeValue('purple.100', 'purple.800')}>

      </Routes>
    </>
  )
}

const UserRoutes = () => {
  return (
    <>
      {/* <Header /> */}
      <NavBar zIndex={10} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

const NonUserRoutes = () => {
  return (
    <>
      <NavBar zIndex={10} />
      <Routes>
        <Route path="/super-admin-login" element={<SuperAdminLogin />} />
      </Routes>
    </>
  )
}

export default ConditionalRoute





