/* eslint-disable no-unused-vars */
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './queries';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

function getFilteredCabins(filteredDiscountValue, cabins) {
  if (filteredDiscountValue === 'all') {
    return cabins;
  } else if (filteredDiscountValue === 'no-discount') {
    return cabins.filter((cabin) => cabin.discount === 0);
  } else if (filteredDiscountValue === 'with-discount') {
    return cabins.filter((cabin) => cabin.discount > 0);
  }
}

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filteredDiscountValue = searchParams.get('discount') || 'all';

  let filteredCabins = getFilteredCabins(filteredDiscountValue, cabins);

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
        data={filteredCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
