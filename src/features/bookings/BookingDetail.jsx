import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBookingDetail } from './queries';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
};

function BookingDetail() {
  const { booking, isLoading } = useBookingDetail();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id } = booking;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
