import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filteredValue = searchParams.get('status');

  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortByRaw.split('-');

  let sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}

export default useBookings;
