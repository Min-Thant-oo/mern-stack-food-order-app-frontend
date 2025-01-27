import { useSearchRestaurants } from '@/api/RestaurantApi';
import CuisineFilter from '@/components/SearchPage/CuisineFilter';
import PaginationSelector from '@/components/shared/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/shared/SearchBar';
import SearchResultCard from '@/components/SearchPage/SearchResultCard';
import SearchResultInfo from '@/components/SearchPage/SearchResultInfo';
import SortOptionDropdown from '@/components/SearchPage/SortOptionDropdown';
import Spinner from '@/components/shared/Spinner';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export type SearchState = {
  searchQuery: string;
  page: number; // current page that user is on
  selectedCuisines: string[];
  sortOption: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({ 
    searchQuery: "", 
    page: 1, 
    selectedCuisines: [],
    sortOption: "bestMatch"
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1, 
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => (
      {...prevState, page} //update page value in prevState object 
    ));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => (
      {...prevState,
      sortOption,
      page: 1,}
    ));
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
        <CuisineFilter 
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        />
      </div>
      <div id="main-content" className='flex flex-col gap-5'>
        <SearchBar 
          onSubmit={setSearchQuery} 
          placeHolder='Search by Cuisines or Restaurant Name' 
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />

        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo total={results.pagination.total} city={city} />

          <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}

        <PaginationSelector 
          page={results.pagination.page}   // current page that user is on
          pages={results.pagination.pages} // total pages available
          onPageChange={setPage} 
        />
      </div>
    </div>
  )
}

export default SearchPage 