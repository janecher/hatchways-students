import React from "react";
import PropTypes from "prop-types";

function Tag(props){
  return (
    <React.Fragment>
      <span className="tags ml-1 p-1">{props.tag}</span>
    </React.Fragment>
  );
}

Tag.propTypes = {
  tag: PropTypes.string
};

export default Tag;