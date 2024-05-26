import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useCheckin() {
  const updateFieldsObj = {
    status: 'checked-in',
    isPaid: true,
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, updateFieldsObj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // invalidate all the current active query in the current page, don't have to remember query key
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return { isCheckingIn, checkin };
}

export default useCheckin;
