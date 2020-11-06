  import React from "react";
//import SearchByName from "./SearchByName";
import StudentList from "./StudentList"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      studentList: []
    };
  }

  makeApiCall = () => {
    fetch("https://api.hatchways.io/assessment/students")
    .then(response => response.json())
    .then(
      (jsonifiedResponse) => {
        this.setState({
          studentList: jsonifiedResponse["students"]
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  componentDidMount() {
    this.makeApiCall();
  }

  render(){
    return (
      <React.Fragment>
        {/* <SearchByName /> */}
        <StudentList studentList={this.state.studentList}/>
      </React.Fragment>
    );
  }
}

export default App;
