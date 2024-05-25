import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBookingDetail() {
  const { bookingId } = useParams();

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(bookingId),

    // By default, React Query will try to refetch 3 times before giving up
    // But here, it the request failed for the first time, that means the booking doesn't exist in the first place.
    // there is no need to retry
    retry: false,
  });

  return { isLoading, error, booking };
}
