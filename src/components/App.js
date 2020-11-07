import React from "react";
import StudentList from "./StudentList"

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
      searchStudentList: [],
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
    if(!query && !tagQuery) {
      this.setState({
        searchStudentList: this.state.studentList
      });
    } else if(!query) {
      const studentWithTag = this.state.studentList.filter(element => element.tags);
      const studentWithSearchTag = studentWithTag.filter(element => element["tags"].filter(tag => tag.includes(tagQuery)).length !== 0);
      this.setState({
        searchStudentList: studentWithSearchTag
      });
    } else if(!tagQuery) {
      const studentSearchByName = this.state.studentList.filter(element => element.firstName.toLowerCase().includes(query.toLowerCase()) || element.lastName.toLowerCase().includes(query.toLowerCase()));
      this.setState({
        searchStudentList: studentSearchByName
      });
    } else {
      const studentSearchByName = this.state.studentList.filter(element => element.firstName.toLowerCase().includes(query.toLowerCase()) || element.lastName.toLowerCase().includes(query.toLowerCase()));
      const studentWithTag = studentSearchByName.filter(element => element.tags);
      const studentWithSearchTag = studentWithTag.filter(element => element["tags"].filter(tag => tag.includes(tagQuery)).length !== 0);
      this.setState({
        searchStudentList: studentWithSearchTag
      });
    }
  }
  
  handleAddTagToStudent = (id, tag) => {
    const editedStudent = this.state.studentList.filter(student => student.id === id)[0];
    if(editedStudent.tags) {
      editedStudent.tags.push(tag);

    } else {
      editedStudent.tags = [];
      editedStudent.tags.push(tag);
    } 
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
