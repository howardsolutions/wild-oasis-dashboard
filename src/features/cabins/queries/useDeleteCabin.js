import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../../services/apiCabins';
import toast from 'react-hot-toast';

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Cabin deleted successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isDeleting };
}

export default useDeleteCabin;
