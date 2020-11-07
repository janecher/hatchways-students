import React from "react";
import Grade from "./Grade";
import PropTypes from "prop-types";

function Grades(props){
  return (
    <React.Fragment>
      {props.grades.map((grade, index) =>
        <Grade grade={grade} index={index} key={index}/>
      )}
    </React.Fragment>
  );
}

Grades.propTypes = {
  gradesList: PropTypes.array
};

export default Grades;