import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination";
  
  type Props = {
    page: number;  // current page
    pages: number; // total pages available
    onPageChange: (page: number) => void;
  };

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    // pages = 3
    // pageNumbers = [1, 2, 3]
    for(let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                {page !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => onPageChange(page - 1)}
                        />
                    </PaginationItem>
                )}

                {pages > 1 && (
                    pageNumbers.map((number) => (
                        <PaginationItem key={number}>
                            <PaginationLink
                                href="#"
                                onClick={() => onPageChange(number)}
                                isActive={page === number}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                )}
        
        
                {/* pageNumber = [1,2,3]  */}
                {/* if currentPage(page) = 3 then PaginationNext won't show */}
                {page < pages && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationSelector;