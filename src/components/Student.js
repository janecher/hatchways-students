import React, {useState} from 'react';
import Grades from "./Grades";
import Tags from "./Tags";
import PropTypes from "prop-types";

function Student(props){

  const {img, firstName, lastName, email, company, skill, grades, id, tags} = props;

  const [showGradesList, setShowGradesList] = useState(false);

  const average = (array) =>{
    let average = 0;
    array.forEach(element => average += parseInt(element));
    if(array.length !== 0) {
      average /= array.length;
    }
    return average;
  }

  const toggleGradeList = () => {
    setShowGradesList(!showGradesList);
  }

  const onEnterInputTag = (event) => {
    const EnterKeyCode = 13;
    if(event.keyCode === EnterKeyCode) {
      event.preventDefault();
      props.addTagToStudent(id, event.target.value);
      event.currentTarget.value = "";
    }
  }

  let gradeList = null;

  let buttonSign = null;

  let tagsInfo = tags ? <Tags tags={tags}/> : null;

  if(showGradesList){
    gradeList = <Grades grades={grades} />
    buttonSign = <span className="fa fa-minus" aria-hidden="true"></span>
  } else {
    gradeList = null;
    buttonSign = <span className="fa fa-plus" aria-hidden="true"></span>
  } 

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3 text-center align-text-center">
          <img src={img} alt="Profile picture" className="img-fluid rounded-circle border"/>
        </div>
        <div className="col-6">
          <h2><b>{firstName.toUpperCase()} {lastName.toUpperCase()}</b></h2>
          <p className="pl-3 m-0">Email: {email}</p>
          <p className="pl-3 m-0">Company: {company}</p>
          <p className="pl-3 m-0">Skill: {skill}</p>
          <p className="pl-3 m-0">Average: {average(grades)}%</p>
          <p className="mt-1 mb-1 pl-3">{tagsInfo}</p>
          <div className="border-bottom mt-2 col-6">
            <input
              placeholder="Add a tag"
              onKeyDown={onEnterInputTag}
              className = "border-0"
            />
          </div>
          <div className="mt-3 pl-3">
            {gradeList}
          </div>
        </div>        
        <div className="col-3 text-right">
          <button type="button" className="btn btn-light btn-lg" onClick={toggleGradeList}>
            {buttonSign}          
          </button>
        </div>
      </div>
      <hr/>
    </React.Fragment>
  );
}

Student.propTypes = {
  img: PropTypes.string, 
  firstName: PropTypes.string, 
  lastName: PropTypes.string, 
  email: PropTypes.string, 
  company: PropTypes.string, 
  skill: PropTypes.string, 
  grades: PropTypes.array,
  tags: PropTypes.array,
  addTagToStudent: PropTypes.func
};

export default Student