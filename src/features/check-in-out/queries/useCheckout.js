import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // invalidate all the current active query in the current page, don't have to remember query key
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
