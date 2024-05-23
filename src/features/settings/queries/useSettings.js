import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/apiSettings';

function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
}

export default useSettings;
