import styled from 'styled-components';
import useUser from '../features/authentication/queries/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: var(--color-grey-50);
  height: 100vh;
`;

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
