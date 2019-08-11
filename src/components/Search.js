import React from "react";
import PropTypes from "prop-types";

const Search = ({search}) => {
  return (
    <input
      onChange={e => search(e)}
      placeholder={"Search by shipment ID"}
      className='search-bar'
    />
  );
};

Search.propTypes = {
  search: PropTypes.func
};

export default Search;
