import React from "react";
import Student from "./Student";
import PropTypes from "prop-types";

function StudentList(props){

  return (
    <React.Fragment>
      {props.studentList.map((student) =>
        <Student
          img = {student.pic}
          firstName = {student.firstName}
          lastName = {student.lastName}
          email = {student.email}
          company = {student.company}
          skill = {student.skill}
          grades = {student.grades}
          tags = {student.tags ? student.tags : null}
          id={student.id}
          key={student.id}
          addTagToStudent = {props.addTagToStudent}
        />
      )}
    </React.Fragment>
  );
}


StudentList.propTypes = {
  studentList: PropTypes.array,
  addTagToStudent: PropTypes.func
};
export default StudentList;