import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../../utils/constants';

function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //////// FILTER   ////////
  const filteredValue = searchParams.get('status');

  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue };

  //////// SORT    ////////
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortByRaw.split('-');

  let sortBy = { field, direction };

  /////// PAGINATION   ////////
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: bookings, totalCount } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);
  const isOnLastPage = page === pageCount;

  // PREFETCHING
  if (!isOnLastPage) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  return { bookings, totalCount, isLoading, error };
}

export default useBookings;
