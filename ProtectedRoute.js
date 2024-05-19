import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const location = useLocation();
  const isAuthenticated = // Add your authentication check here

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

<ProtectedRoute path="/profil" element={<Profil />} />
