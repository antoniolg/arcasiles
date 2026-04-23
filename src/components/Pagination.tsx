interface PaginationProps {
  currentPage: number
  totalPages: number
  pageStart: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  pageStart,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const from = totalItems === 0 ? 0 : pageStart + 1
  const to = Math.min(pageStart + pageSize, totalItems)

  return (
    <nav className="pagination" aria-label="Paginacion de clubes">
      <div className="pagination-summary">
        Mostrando {from}-{to} de {totalItems} clubes
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <div className="pagination-pages">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={
                page === currentPage
                  ? 'pagination-page pagination-page-active'
                  : 'pagination-page'
              }
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </nav>
  )
}
