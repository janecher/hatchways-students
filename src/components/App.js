import React, {useState} from "react";
import SearchByName from "./SearchByName";
import StudentList from "./StudentList"

function App(){

  const [studentList, setStudentList] = useState([]);

  const makeApiCall = () => {
    fetch("http://localhost:5000/api/animals")
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        setStudentList(jsonifiedResponse["students"]);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  makeApiCall();
  
  return (
    <React.Fragment>
      <SearchByName />
      <StudentList studentList={studentList}/>
    </React.Fragment>
  );
}

export default App;
