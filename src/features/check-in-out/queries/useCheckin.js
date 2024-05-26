import { useMutation } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckin() {
  const updateFieldsObj = {
    status: 'checked-in',
    isPaid: true,
  };

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, updateFieldsObj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
    },
  });

  return { isCheckingIn, checkin };
}

export default useCheckin;
