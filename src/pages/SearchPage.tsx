import { useSearchRestaurants } from '@/api/RestaurantApi';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultInfo from '@/components/SearchResultInfo';
import Spinner from '@/components/Spinner';
import { useParams, Link } from 'react-router-dom';

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if(isLoading) {
    return <Spinner />
  }

  if (!results?.data || !city) {
    return (
      <div>
        <p>No results found for <span className='text-orange-500'>{city}</span>.</p>
        <p>Click <Link to='/'  className='text-orange-500'>here</Link> to return to homepage</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        cuisines
      </div>
      <div id="main-content" className='flex flex-col gap-5'>
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage 