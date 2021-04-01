import React from 'react';

export const FilterForm = ({ filterHandler }) => (
  <div>
    filter shown with: <input type="text" onChange={filterHandler} />
  </div>
);
