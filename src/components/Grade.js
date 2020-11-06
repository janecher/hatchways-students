import React from "react";
import PropTypes from "prop-types";

function Grade(props){
  return (
    <React.Fragment>
      <p className="p-0 m-0">Test {props.index+1}: <span className="pl-5">{props.grade}%</span></p>
    </React.Fragment>
  );
}


Grade.propTypes = {
  grade: PropTypes.string
};
export default Grade;