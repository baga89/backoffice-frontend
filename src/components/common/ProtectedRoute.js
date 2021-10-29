import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../services/useAuth';
import Layout from './Layout';

const ProtectedRoute = ({ path, component, ...rest }) => {
  const { token } = useAuth();

  return token ? (
    <Layout>
      <Route component={component} path={path} {...rest} />
    </Layout>
  ) : (
    <Redirect to='/login' />
  );
};

export default ProtectedRoute;
