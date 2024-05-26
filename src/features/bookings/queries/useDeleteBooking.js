import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../../services/apiBookings';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });

      toast.success('Booking deleted successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isDeleting };
}

export default useDeleteBooking;
