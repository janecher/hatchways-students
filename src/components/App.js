  import React from "react";
//import SearchByName from "./SearchByName";
import StudentList from "./StudentList"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      searchStudents: []
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

  handleSearch = e => {
    const { value } = e.target;
    const lowercasedValue = value.toLowerCase();

    this.setState(prevState => {
      const searchStudents = prevState.studentList.filter(element =>
        element.dataConnectionName.toLowerCase().includes(lowercasedValue)
      );
    });
  };

  render(){
    return (
      <React.Fragment>
        <div className = "card col-lg-8 col-md-12 mx-auto">
          <div className = "card-body">
            {/* <SearchByName /> */}
            <StudentList studentList={this.state.studentList}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
