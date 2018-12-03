/* tslint:disable ordered-imports jsx-no-lambda no-console */
import * as React from "react";
import "./Pagination.css";

class Pagination extends React.Component<{
  handlePageChange: any;
  totalPages: number;
  currentPage: any;
}> {
  public render() {
    const { handlePageChange, totalPages, currentPage } = this.props;
    console.log(currentPage, totalPages)
    return (
      <div className="pagination-container">
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange({ value: currentPage - 1 })}>
              <i className="fa fa-arrow-left"/> Pagina anterior 
            </button>
          )}
          <span className="pagination-numbers">{currentPage} / {totalPages}</span>
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange({ value: currentPage + 1 })}>
              Proxima pagina <i className="fa fa-arrow-right"/>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Pagination;
