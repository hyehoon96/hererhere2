import React, { useMemo } from 'react';
import { Pagination } from 'react-bootstrap';

function PlacePagination({ pagination, onPageChange }) {
  const items = useMemo(() => {
    const tempItems = [];
    for (let number = 1; number <= pagination.last; number++) {
      tempItems.push(
        <Pagination.Item 
          onClick={() => pageChange(number)} 
          key={number} 
          active={number === pagination.current}
        >
          {number}
        </Pagination.Item>
      );
    }
    return tempItems;
  }, [pagination.last, pagination.current, pagination.gotoPage]);


  const pageChange = (page) => {
    pagination.gotoPage(page);
    onPageChange();
  }
  return (
    <div>
      {items.length > 0 && (
        <Pagination size="sm">{items}</Pagination>
      )}
    </div>
  );
}

export default React.memo(PlacePagination);