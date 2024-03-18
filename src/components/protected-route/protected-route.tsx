import { Navigate, useLocation } from 'react-router-dom';
import { getAuthChecked } from '../../services/auth/slice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(getAuthChecked);
  const location = useLocation();

  if (onlyUnAuth && isAuthChecked) {
    // Для неавторизованных, но мы авторизованы
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    // Для авторизованных, мы неавторизованы
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // !onlyUnAuth && isAuthChecked
  // onlyUnAuth && !isAuthChecked

  return children;
};
