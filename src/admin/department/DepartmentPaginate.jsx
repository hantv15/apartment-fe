import React from "react";
import PropTypes from "prop-types";
// import ReactPaginate from "react-paginate";
DepartmentPagination.propTypes = {
  DepartmentPagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

DepartmentPagination.defaultProps = {
  onPageChange: null,
};

function DepartmentPagination(props) {
  const { pagination, onPageChange } = props;
  const { page, limit, totalRows } = pagination;
  const totalPages = Math.ceil(totalRows / limit);
  // console.log("Total page: ", totalPages);
  // 51 / 10 = 5.1 --> 6

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  return (
    <div>
      <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
        Prev
      </button>

      <button
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default DepartmentPagination;
