import React from "react";
import Student from "./Student";
import PropTypes from "prop-types";

function StudentList(props){

  return (
    <React.Fragment>
      <hr/>
      {props.studentList.map((student) =>
        <Student
          img = {student.pic}
          firstName = {student.firstName}
          lastName = {student.lastName}
          email = {student.email}
          company = {student.company}
          skill = {student.skill}
          grades = {student.grades}
          id={student.id}
          key={student.id}/>
      )}
    </React.Fragment>
  );
}


StudentList.propTypes = {
  studentList: PropTypes.array
};
export default StudentList;