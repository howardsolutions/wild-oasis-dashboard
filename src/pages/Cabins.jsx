import { useEffect } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type='horizontal'>
      <Heading as='h1'>All cabins</Heading>
    </Row>
  );
}

export default Cabins;
