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
import BettingMachinesPage from './pages/betting-machines/BettingMachinesPage';
import NewBettingMachinePage from './pages/betting-machines/NewBettingMachinePage';
import EditBettingMachinePage from './pages/betting-machines/EditBettingMachinePage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UsersPage from './pages/users/UsersPage';
import NewUserPage from './pages/users/NewUserPage';
import EditUserPage from './pages/users/EditUserPage';
import ProfilePage from './pages/profile/ProfilePage';
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
          <ProtectedRoute path='/betting-machines/:id/edit' component={EditBettingMachinePage} />
          <ProtectedRoute path='/betting-machines/new' component={NewBettingMachinePage} />
          <ProtectedRoute path='/betting-machines' component={BettingMachinesPage} />
          <ProtectedRoute path='/users/:id/edit' component={EditUserPage} />
          <ProtectedRoute path='/users/new' component={NewUserPage} />
          <ProtectedRoute path='/users' component={UsersPage} />
          <ProtectedRoute path='/profile' component={ProfilePage} />
          <ProtectedRoute path='/' component={DashboardPage} exact />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </AuthProvider>
    </>
  );
}
