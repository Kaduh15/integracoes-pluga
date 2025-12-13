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
  nextPage?: () => void
  previousPage?: () => void
  onPageChange?: (page: number) => void
}

export function PaginationItems({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  previousPage,
  nextPage
}: PaginationItemsProps) {
  const arrayOfPages = Array.from(
    { length: Math.ceil(totalItems / itemsPerPage) },
    (_, i) => i + 1,
  )

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                previousPage?.()
              }
            }}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {
          currentPage > 2 && (
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                onClick={() => onPageChange?.(1)}
              >
                ...
              </PaginationLink>
            </PaginationItem>
          )
        }

        {arrayOfPages
          .map((page) => (
            <PaginationItem className="cursor-pointer" key={page}>
              <PaginationLink
                data-active={page === currentPage}
                className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                onClick={() => onPageChange?.(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
          .slice(currentPage - 1, currentPage + 2)}

          {
          currentPage < arrayOfPages.length - 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                onClick={() => onPageChange?.(arrayOfPages.length)}
              >
                ...
              </PaginationLink>
            </PaginationItem>
          )
          }

        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={() => {
              if (currentPage < arrayOfPages.length) {
                nextPage?.()
              }
            }}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
