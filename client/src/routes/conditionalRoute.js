import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useColorModeValue } from '@chakra-ui/react'
import '../App.css';
import Home from "../pages/03-users/01-home.js"
// import Header from '../components/header/header';
import NavBar  from '../components/navigation/navbar'
import SuperAdminLogin from '../pages/01-super-admin/01-auth/01-superAdminLogin';
import SuperAdminDashboard from '../pages/01-super-admin/02-superAdminDashboard';


const ConditionalRoute = () => {
  const { userRole } = useSelector(state => state.user)
  if (userRole === 'superAdmin') {
    return <SuperAdminRoutes />
  }else if (userRole === 'distAdmin') {
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
      {/* <AdminNavBar /> */}
      <Routes bg={useColorModeValue('purple.100', 'purple.800')}>
      <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
      
        
        
      </Routes>
    </>
  )
}

const DistAdminRoutes = () => {
  return (
    <>
      {/* <AdminNavBar /> */}
      <Routes bg={useColorModeValue('purple.100', 'purple.800')}>
        {/* <Route path="/" element={<Home />} /> */}
        
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
        {/* <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/brochure" element={<Brochure />} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

const NonUserRoutes = () => {
  return (
    <>
      {/* <Header /> */}
      <NavBar zIndex={10} />
      <Routes>
      <Route path="/super-admin-login" element={<SuperAdminLogin />} />
      {/* <Route path="/" element={<Home />} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default ConditionalRoute





