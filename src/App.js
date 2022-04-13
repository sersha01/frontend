import './App.css';
import { PrivateRoute, AdminRoute } from './utils/PrivateRoute';
import HomePage from './pages/user/HomePage';
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import AdminCreate from './pages/admin/AdminCreate';
import AdminEdit from './pages/admin/AdminEdit';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminRoute><AdminHome /></AdminRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/create" element={<AdminRoute><AdminCreate /></AdminRoute>} />
            <Route path="/admin/edit" element={<AdminRoute><AdminEdit /></AdminRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
