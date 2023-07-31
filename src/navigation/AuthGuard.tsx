/* eslint-disable prettier/prettier */
import React, { Suspense  } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import AuthenticatedRoutes from './AuthenticatedRoutes';
import OnBoard from './OnBoard';

const AuthGuard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('isAuthenticated authGuard',isAuthenticated);
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
      {isAuthenticated ? <OnBoard /> : <AuthenticatedRoutes />}
    </Suspense>
  );
};

export default AuthGuard;
