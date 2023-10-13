import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useColorModeValue } from '@chakra-ui/react'
import '../App.css';

//SUPER ADMIN ROUTES
import SuperAdminSidebar from '../components/navigation/sideBar/01-superAdminSidebar'
import EditSuperAdminProfile from '../pages/01-super-admin/01-auth/02-editSuperAdminProfile'
import SuperAdminDashboard from '../pages/01-super-admin/01-SuperAdminDashboard';
import ManageDistUsers from '../pages/01-super-admin/02-manageDistUsers';
import NcacpStudentsList from '../pages/01-super-admin/03-ncacpStudentsList';
import PrlEthStudentsList from '../pages/01-super-admin/04-prlEthStudentsList';
import SuperAdminLogin from '../pages/01-super-admin/01-auth/01-superAdminLogin';
import DistAdminLogin from '../pages/02-district-admin/01-auth/01-distAdminLogin';
import BoardMembersGrid from '../components/grids/boardMembersGrid';
import AlumuniList from '../pages/01-super-admin/06-alumuniList';
import Settings from '../pages/01-super-admin/07-settings';

//DIST ADMIN Routes
import DistAdminSidebar from '../components/navigation/sideBar/02-distAdminSidebar';
import ManageStudents from '../pages/02-district-admin/02-manageStudents';
import AlumuniListDist from '../pages/02-district-admin/03-alumuniList';

//NON USER ROUTES
// import Header from '../components/header/header';



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
        <Route path="/" element={<SuperAdminDashboard />} />
        <Route path="/profile" element={<EditSuperAdminProfile />} />
        <Route path="/user-management" element={<ManageDistUsers />} />
        <Route path="/ncacp-students" element={<NcacpStudentsList />} />
        <Route path="/prl-eth-students" element={<PrlEthStudentsList />} />
        <Route path="/board-members" element={<BoardMembersGrid />} />
        <Route path="/alumuni" element={<AlumuniList />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </>
  )
}

const DistAdminRoutes = () => {
  return (
    <>
      <DistAdminSidebar />
      <Routes >
        <Route path="/student-management" element={<ManageStudents />} />
        <Route path="/alumuni" element={<AlumuniListDist />} />
      </Routes>
    </>
  )
}

const UserRoutes = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <NavBar zIndex={10} /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

const NonUserRoutes = () => {
  return (
    <>
      {/* <NavBar zIndex={10} /> */}
      <Routes>
        <Route path="/super-admin-login" element={<SuperAdminLogin />} />
        <Route path="/dist-admin-login" element={<DistAdminLogin />} />
      </Routes>
    </>
  )
}

export default ConditionalRoute





