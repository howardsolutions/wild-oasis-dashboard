import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiAuth';

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['user'],
  });

  let isAuthenticated = user?.role === 'authenticated';

  return { user, isLoading, isAuthenticated };
}

export default useUser;
