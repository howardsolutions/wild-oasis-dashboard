/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBookingDetail from '../bookings/queries/useBookingDetail';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import useCheckin from './queries/useCheckin';
import useSettings from '../settings/queries/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  const { booking, isLoading: isLoadingBookingDetail } = useBookingDetail();

  const { checkin, isCheckingIn } = useCheckin();

  const { settings, isLoading: isLoadingSetting } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  const moveBack = useMoveBack();

  let isLoading = isLoadingSetting || isLoadingBookingDetail || isCheckingIn;

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optinalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (!addBreakFast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optinalBreakfastPrice,
          totalPrice: totalPrice + optinalBreakfastPrice,
        },
      });
    }

    if (addBreakFast) {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Want to add breakfast for {optinalBreakfastPrice}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          value={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          checked={confirmPaid}
          id='confirm'
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount{' '}
          {!addBreakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optinalBreakfastPrice
              )} (${formatCurrency(totalPrice)} cabins + ${formatCurrency(
                optinalBreakfastPrice
              )} breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
