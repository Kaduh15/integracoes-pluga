import { Activity } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

type PaginationItemsProps = {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function PaginationItems({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationItemsProps) {
  const arrayOfPages = Array.from(
    { length: Math.ceil(totalItems / itemsPerPage) },
    (_, i) => i + 1,
  )

  function handleNextPage() {
    if (currentPage < arrayOfPages.length) {
      onPageChange(currentPage + 1)
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePreviousPage}>
            Previous
          </PaginationPrevious>
        </PaginationItem>

        <Activity mode={currentPage > 2 ? 'visible' : 'hidden'}>
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => onPageChange(1)}>...</PaginationLink>
          </PaginationItem>
        </Activity>

        {arrayOfPages
          .map((page) => (
            <PaginationItem className="cursor-pointer" key={page}>
              <PaginationLink
                data-active={page === currentPage}
                className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
          .slice(currentPage === 1 ? 0 : currentPage - 2, currentPage + 2)}

        <Activity
          mode={currentPage < arrayOfPages.length - 2 ? 'visible' : 'hidden'}
        >
          <PaginationItem className="cursor-pointer">
            <PaginationLink onClick={() => onPageChange(arrayOfPages.length)}>
              ...
            </PaginationLink>
          </PaginationItem>
        </Activity>

        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNextPage}>Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
