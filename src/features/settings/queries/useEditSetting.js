import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../../services/apiSettings';
import toast from 'react-hot-toast';

function useSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: editSetting,
    isLoading: isEditing,
    error,
  } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Settings updated successfully');
      queryClient.invalidateQueries(['settings']);
    },
    onError: (err) => toast.error(err?.message),
  });

  return { editSetting, isEditing, error };
}

export default useSettings;
