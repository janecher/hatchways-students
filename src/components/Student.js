import React, {useState} from 'react';
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

  let gradeList = null;

  // if(showGradesList){
  //   currentPage = <GradeList grades={grades} />
  // } 

  return (
    <React.Fragment>
      <div>
        <img src={img} alt="Profile picture"/>
        <h3>{firstName} {lastName}</h3>
        <p>Email: {email}</p>
        <p>Company: {company}</p>
        <p>Skill: {skill}</p>
        <p>Average: {average(grades)}</p>
      </div>
      <div>
        {gradeList}
      </div>
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