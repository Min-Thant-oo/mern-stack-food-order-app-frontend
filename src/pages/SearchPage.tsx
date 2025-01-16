import { useSearchRestaurants } from '@/api/RestaurantApi';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultInfo from '@/components/SearchResultInfo';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export type SearchState = {
  searchQuery: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({ searchQuery: "" });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

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
        <SearchBar 
          onSubmit={setSearchQuery} 
          placeHolder='Search by Cuisines or Restaurant Name' 
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}

export default SearchPage 