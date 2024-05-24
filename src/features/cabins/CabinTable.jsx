/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './queries';
import Table from '../../ui/Table';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

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
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
