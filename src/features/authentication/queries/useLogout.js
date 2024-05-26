import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // remove all queries from react query cache after loging out.
      // supabase will remove data from localStorage, but data still in React query cache
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isLoading };
}

export default useLogout;
