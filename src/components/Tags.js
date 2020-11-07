import React from "react";
import Tag from "./Tag";
import PropTypes from "prop-types";

function Tags(props){
  return (
    <React.Fragment>
      {props.tags.map((tag, index) =>
        <Tag tag={tag} key={index}/>
      )}
    </React.Fragment>
  );
}

Tags.propTypes = {
  tags: PropTypes.array
};

export default Tags;