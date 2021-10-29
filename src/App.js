import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './services/useAuth';

import LoginPage from './pages/login/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import OfficesPage from './pages/offices/OfficesPage';
import NewOfficePage from './pages/offices/NewOfficePage';
import EditOfficePage from './pages/offices/EditOfficePage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UsersPage from './pages/users/UsersPage';
import NotFoundPage from './pages/notFound/NotFoundPage';

export default function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <ProtectedRoute path='/offices/:id/edit' component={EditOfficePage} />
          <ProtectedRoute path='/offices/new' component={NewOfficePage} />
          <ProtectedRoute path='/offices' component={OfficesPage} />
          <ProtectedRoute path='/users' component={UsersPage} />
          <ProtectedRoute path='/' component={DashboardPage} exact />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </>
  );
}
