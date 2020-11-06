import React, {useState} from 'react';
import Grades from "./Grades";
import PropTypes from "prop-types";

function Student(props){

  const {img, firstName, lastName, email, company, skill, grades} = props;

  const [showGradesList, setShowGradesList] = useState(false);

  const average = (array) =>{
    let average = 0;
    for(let i=0; i<array.length; i++){
      average += parseInt(array[i]);
      console.log(average);
    }
    if(array.length != 0)
    {
      average /= array.length;
      console.log(average);
    }
    return average;
  }

  const toggleGradeList = () => {
    setShowGradesList(!showGradesList);
  }

  let gradeList = null;

  let buttonSign = null

  if(showGradesList){
    gradeList = <Grades grades={grades} />
    buttonSign = <span class="fa fa-minus" aria-hidden="true"></span>
  } else {
    gradeList = null;
    buttonSign = <span class="fa fa-plus" aria-hidden="true"></span>
  } 

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3 text-center align-text-center">
          <img src={img} alt="Profile picture" className="img-fluid rounded-circle border"/>
        </div>
        <div className="col-7">
          <h2><b>{firstName.toUpperCase()} {lastName.toUpperCase()}</b></h2>
          <p className="pl-3 m-0">Email: {email}</p>
          <p className="pl-3 m-0">Company: {company}</p>
          <p className="pl-3 m-0">Skill: {skill}</p>
          <p className="pl-3 m-0">Average: {average(grades)}</p>
          <div className="mt-3">
            {gradeList}
          </div>
        </div>        
        <div className="col-2">
          <button type="button" class="btn btn-light btn-lg" onClick={toggleGradeList}>
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
  grades: PropTypes.array
};

export default Student