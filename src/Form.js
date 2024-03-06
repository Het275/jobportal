import React, { Component } from 'react';
import axios from 'axios'

class CommonForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      salary: '',
      age: '',
      selectedFile: null
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }

  onFileChange(e){
    let file = e.target.files[0];
    this.setState({selectedFile: file});
    console.log(this.state.selectedFile);
  }

  handleSubmit(e) {
    e.preventDefault();
    let file = e.target.files;
    console.log(this.state);
    let data = this.state;
    let formData = new FormData();
    formData.append('selectedFile', file);
    axios.post('https://blobstation.free.beeceptor.com', {formData, data})
    .then(response => console.log(response))
    .catch(err => {console.log(err)})
  }

  
  render() {
    const {
      name,
      salary,
      age,
      selectedFile,
    } = this.state;

    return (
      <div className="commonForm-container">
        <form onSubmit={this.handleSubmit} >
          <div className="input-container">
            
            <input type="text" name="name" value={name} placeholder='Name' onChange={(e) => {this.setState({name: e.target.value})}} required />
            <br />
            
            <input type="text" name="salary" value={salary} placeholder='Salary' onChange={(e) => {this.setState({salary: e.target.value})}} required />
            <br />

            <input type="text" name="age" value={age} placeholder='Age' onChange={(e) => {this.setState({age: e.target.value})}} required />
            <br />

            <input type="file" name="selectedFile" onChange={this.onFileChange} required />
            <br />
          </div>

          <div className="submit-container">
            <button type="submit" className="commonForm-submit">
              <span className="submit-span">Submit</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CommonForm;
