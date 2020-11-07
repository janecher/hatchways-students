import React from "react";
import StudentList from "./StudentList"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      studentList: [], // Original student list from the API call
      searchStudentList: [], // Filtered student list
      query: "",
      tagQuery: ""
    };
  }

  makeApiCall = () => {
    fetch("https://api.hatchways.io/assessment/students")
    .then(response => response.json())
    .then(jsonResponse => {
        this.setState({
          studentList: jsonResponse["students"],
          searchStudentList: jsonResponse["students"]
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  componentDidMount() {
    this.makeApiCall();
  }

  handleNameSearch = event => {
    const query = event.target.value;
    this.setState ({
      query: query
    })
    this.handleSearch(query, this.state.tagQuery);
  };

  handleTagSearch = event => {
    const tagQuery = event.target.value;
    this.setState ({
      tagQuery: tagQuery
    });
    this.handleSearch(this.state.query, tagQuery);
  };

  handleSearch = (query, tagQuery) => {
    let studentList = this.state.studentList
    if(query) {
      studentList = this.searchByName(studentList, query)
    }
    if(tagQuery) {
      studentList = this.searchByTag(studentList, tagQuery)
    }
    this.setState({
         searchStudentList: studentList
        });
  }

  searchByName = (studentList, query) => {
    // NOTE: To improve performance for large student collections, we could use dictionaries here.
    return studentList
        .filter(element => element.firstName.toLowerCase().includes(query.toLowerCase()) ||
                           element.lastName.toLowerCase().includes(query.toLowerCase()) ||
                           (element.firstName + " " + element.lastName).toLowerCase().includes(query.toLowerCase()));
  }

  searchByTag = (studentList, tagQuery) => {
    const studentWithTag = studentList.filter(element => element.tags);
    return studentWithTag.filter(element => element["tags"].filter(tag => tag.includes(tagQuery)).length !== 0)
  }
  
  handleAddTagToStudent = (id, tag) => {
    const editedStudent = this.state.studentList.filter(student => student.id === id)[0];
    if(!editedStudent.tags) {
      editedStudent.tags = [];
    }
    editedStudent.tags.push(tag);
    this.setState({
      studentList: this.state.studentList.filter(student => student.id !== id).concat(editedStudent)
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
              onChange={this.handleNameSearch}
              className = "col-12 border-0 shadow-none"
            />
            <hr/>
            <input
              placeholder="Search by tag"
              value={this.state.tagQuery}
              onChange={this.handleTagSearch}
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
