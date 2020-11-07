import React from "react";
import StudentList from "./StudentList"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      searchStudentList: [],
      query: ""
    };
  }

  makeApiCall = () => {
    fetch("https://api.hatchways.io/assessment/students")
    .then(response => response.json())
    .then(jsonResponse => {
        const { query } = this.state;
        const searchStudentList = jsonResponse["students"].filter(element => {
          return element.firstName.toLowerCase().includes(query.toLowerCase()) || element.lastName.toLowerCase().includes(query.toLowerCase())
        });
        this.setState({
          studentList: jsonResponse["students"],
          searchStudentList
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  componentDidMount() {
    this.makeApiCall();
  }

  handleSearch = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const searchStudentList = prevState.studentList.filter(element => {
        return element.firstName.toLowerCase().includes(query.toLowerCase()) || element.lastName.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        searchStudentList
      };
    });
  };
  
  handleAddTagToStudent = (index, tag) => {
    const newArray = [...this.state.studentList];
    const editedStudent = newArray[index];
    if(editedStudent.tags) {
      editedStudent.tags.push(tag);

    } else {
      editedStudent.tags = [];
      editedStudent.tags.push(tag);
    } 
    this.setState({
      studentList: newArray
    });
  }

  render(){
    return (
      <React.Fragment>
        <div className = "card col-lg-8 col-md-12 mx-auto">
          <div className = "card-body">
            <input
              placeholder="Search by name"
              value={this.state.query}
              onChange={this.handleSearch}
              className = "col-12 border-0 shadow-none"
            />
            <hr/>
            <StudentList studentList={this.state.searchStudentList} addTagToStudent={this.handleAddTagToStudent}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
