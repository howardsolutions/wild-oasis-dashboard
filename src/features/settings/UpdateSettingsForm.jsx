import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useEditSetting, useSettings } from './queries';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = settings || {};

  const { isEditing, editSetting } = useEditSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    editSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'maxGuestPerBooking')}
          type='number'
          id='max-guests'
          defaultValue={maxGuestPerBooking}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
