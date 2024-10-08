import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBookingDetail, useDeleteBooking } from './queries';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { HiArrowDownOnSquare } from 'react-icons/hi2';
import useCheckout from '../check-in-out/queries/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

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
  const { isCheckingOut, checkout } = useCheckout();

  const { isDeleting, mutate: deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoading || isCheckingOut || isDeleting) return <Spinner />;

  if (!booking) return <Empty resource='booking' />;

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

        {status === 'checked-in' && (
          <Button
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
            icon={<HiArrowDownOnSquare />}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opensWindowName='delete'>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resource='Booking'
              onConfirm={() =>
                deleteBooking(id, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
