export interface PaginationProps {
  page: number
  setPage?: (value: number | ((prev: number) => number)) => void
  hasPrevPage: boolean
  hasNextPage: boolean
  length?: number
}