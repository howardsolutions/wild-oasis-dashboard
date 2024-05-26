import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user, 'user!');
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      toast.error('Provider email or password is incorrect');
    },
  });

  return { login, isLoading };
}

export default useLogin;
