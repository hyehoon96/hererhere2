import React from 'react';
import { Pagination } from 'react-bootstrap';

function CommonPagination({ renderItem }) {
  return (
    <Pagination size="sm">
      {renderItem()}
    </Pagination>
  );
}

export default React.memo(CommonPagination);