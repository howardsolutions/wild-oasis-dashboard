import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  const sortBy = searchParams.get('sortBy') || 'name-asc';

  return (
    <Select
      type='white'
      value={sortBy}
      options={options}
      onChange={handleChange}
    />
  );
}

export default SortBy;
