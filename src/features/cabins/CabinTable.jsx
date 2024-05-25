/* eslint-disable no-unused-vars */
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './queries';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function getFilteredCabins(filteredDiscountValue, cabins) {
  if (filteredDiscountValue === 'all') {
    return cabins;
  } else if (filteredDiscountValue === 'no-discount') {
    return cabins.filter((cabin) => cabin.discount === 0);
  } else if (filteredDiscountValue === 'with-discount') {
    return cabins.filter((cabin) => cabin.discount > 0);
  }
}

function getSortedCabins(filteredCabins, sortBy) {
  const [field, direction] = sortBy.split('-');

  const modified = direction === 'asc' ? 1 : -1;
  // By default sort of JS will be in ascending order, return 1 will keep the order,
  // -1 will reverse the order

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modified
  );

  return sortedCabins;
}

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource='Cabins' />;

  const filteredDiscountValue = searchParams.get('discount') || 'all';
  const sortBy = searchParams.get('sortBy') || 'name-asc';

  let filteredCabins = getFilteredCabins(filteredDiscountValue, cabins);

  let sortedCabins = getSortedCabins(filteredCabins, sortBy);

  return (
    <Table role='table' columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
