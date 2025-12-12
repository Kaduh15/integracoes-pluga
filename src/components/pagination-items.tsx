import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={() => {
              if (currentPage < arrayOfPages.length) {
                onPageChange(currentPage + 1)
              }
            }}
          >
            Next
          </PaginationNext>
        </PaginationItem>
        {arrayOfPages.map((page) => (
          <PaginationItem className="cursor-pointer" key={page}>
            <PaginationLink
              data-active={page === currentPage}
              className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1)
              }
            }}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
