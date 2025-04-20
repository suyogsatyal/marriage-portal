import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

import Home from '../pages/Home.tsx'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import UserDashboard from '../pages/user/Dashboard'
import SubmitApplication from '../pages/user/NewApplication.tsx'
// import MyApplications from '../pages/user/MyApplications'
import EditApplication from '../pages/user/EditApplication'
// import Profile from '../pages/user/Profile.tsx'
import NewApplication from '../pages/user/NewApplication.tsx'
import AdminDashboard from '../pages/admin/Dashboard'
// import ApplicationList from '../pages/admin/ApplicationList.tsx'
import ApplicationReview from '../pages/admin/ApplicationReview.tsx'

import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'
import ApplicationView from '../pages/user/ApplicationView.tsx'
import CertificatePage from '../pages/user/Certificate.tsx'
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User */}
                <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
                <Route path="/apply" element={<ProtectedRoute role="user"><SubmitApplication /></ProtectedRoute>} />
                <Route path="/application/new" element={<ProtectedRoute role="user"><NewApplication /></ProtectedRoute>} />
                <Route path="/user/application/:id" element={<ProtectedRoute role="user"><EditApplication /></ProtectedRoute>} />
                <Route path="/view/application/:id" element={<ProtectedRoute role="user"><ApplicationView /></ProtectedRoute>} />
                <Route path="/user/certificate/:id" element={<ProtectedRoute role="user"><CertificatePage /></ProtectedRoute>} />

                {/* Admin */}
                <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                {/* <Route path="/admin/applications" element={<ProtectedRoute role="admin"><ApplicationList /></ProtectedRoute>} /> */}
                <Route path="/admin/application/:id" element={<ProtectedRoute role="admin"><ApplicationReview /></ProtectedRoute>} />
                <Route path="/admin/certificate/:id" element={<ProtectedRoute role="admin"><CertificatePage /></ProtectedRoute>} />

                {/* Not found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
