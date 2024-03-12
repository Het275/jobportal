import React from 'react'
import './App.css'
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { About } from './Pages/about';
import { Home } from './Pages/Home';
import { Router, Route, Link, BrowserRouter, json } from 'react-router-dom';

// function Pages() {
//   return(
//     <BrowserRouter>
//         <nav>
//           <h1>The Ninja Clothing Company</h1>
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//         </nav>
//         <Router>
//           <Route exact path="/" Component={Home} />
//           <Route path="/about">
//             <About />
//           </Route>
//         </Router>
//       </BrowserRouter>
//   );
// }
const paramObj = window.location.search;
const searchParams = new URLSearchParams(paramObj);
const param = searchParams.get('current_job_designation');
class SecondaryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      noticePeriod: '',
      jobLocation: '',
      currentOrganization: '',
      currentCtc: '',
      expectedCtc: '',
      experience: '',
      selectedName: '',
      selectedFile: null,
      fileValidationError: '',
      captachaRef: null,
      submitClicked: false,
      checked: false,
      param: '',
      status: '',
      myRef: React.createRef(),
      items: [],
      fields: {},
      errors: {
        nameErrors: '',
        emailErrors: '',
        phoneErrors: '',
        noticeErrors: '',
        expectedErrors: '',
        experienceErrors: '',
        invalidEmail: '',
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.emailChange = this.emailChange.bind(this)
    this.phoneChange = this.phoneChange.bind(this)
    this.noticeChange = this.noticeChange.bind(this)
    this.expectedChange = this.expectedChange.bind(this)
    this.experienceChange = this.experienceChange.bind(this)
    this.removeFile = this.removeFile.bind(this)
    // this.validateForm = this.validateForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.onClickButton = this.onClickButton.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    });
    // const file = e.target.files;
    // Valid file types (PDF, Word, and Doc)
    // const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    // if (file && allowedFileTypes.includes(file.type)) {
    //   this.setState({
    //     selectedFile: file,
    //     selectedName: file.name,
    //     fileValidationError: '',
    //   });
      
    //   // Log file details to the console
    // } else {
    //   this.setState({
    //     selectedFile: null,
    //     selectedName: '',
    //     fileValidationError: 'Invalid file type. Please upload a PDF, Word, or Doc file.',
    //   });
    // }
  }

  onFileChange(e) {
    const {selectedFile} = this.state;
    const file = e.target.files[0];
    this.setState({selectedFile : file})
    console.log(file)
    // Valid file types (PDF, Word, and Doc)
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    // const render = new FileReader();
    // render.onload = (event)=>{
    //   const binry = event.target.result;
    //   this.setState({binry})
    // }
    // render.readAsDataURL(file)
    if (file && allowedFileTypes.includes(file.type)) {
      this.setState({
        selectedFile: file,
        selectedName: file.name,
        fileValidationError: '',
      });
    } else {
      this.setState({
        selectedFile: null,
        selectedName: '',
        fileValidationError: 'Invalid file type. Please upload a PDF, Word, or Doc file.',
      });
    }
    console.log({cv : selectedFile})
  }



  nameChange(e)
  { 
      this.setState({ name: e.target.value }); 
      if(!this.state.name){
          this.setState({
              nameErrors: "Name is Required"
          });
      }
  }
  
  emailChange(e)
  { 
      this.setState({ email: e.target.value }); 
      if(!this.state.email){
          this.setState({
              emailErrors: "Email is Required"
          })
      } else if (!/\S+@\S+\.\S+/.test(this.state.email)){
          this.setState({ 
              isValidEmail : "Email is invalid"
          })
        }
  }
  
  phoneChange(e)
  { 
      this.setState({ phone: e.target.value });
      if(!this.state.phone){
          this.setState({
              phoneErrors: "Must be a valid phone number"
          })
      }
  }
  
  noticeChange(e)
  { 
      this.setState({ noticePeriod: e.target.value }); 
      if(!this.state.noticePeriod){
          this.setState({
              noticeErrors: "Notice Period is Required"
          })
      }
  }
  
  expectedChange(e)
  { 
      this.setState({ expectedCtc: e.target.value }); 
      if(!this.state.expectedCtc){
          this.setState({
              expectedErrors: "Expected CTC is Required"
          })
      }
  }
  
  experienceChange(e)
  { 
      this.setState({ experience: e.target.value }); 
      if(!this.state.experience){
          this.setState({
              experienceErrors: "Experience is Required"
          })
      }
  }
  // validateForm() {
  //   const {name, email, phone} = this.state;

  //   let status = true;
  //   if(name.length === 0){
  //     status = false;
  //   }
  //   if(email.length == ""){
  //     status = false;
  //   }
  //   if(phone.length === ""){
  //     status = false;
  //   }
  //   return status;
  // }

  handleChecked(e) {
    const { checked } = this.state;
    // save the target object for future reference
    const target = e.target;
    // Check if the target is the checkbox or text input to save the value
    const value = target.name === 'checked' ? target.checked : target.value;
    // Save the input name, i.e. name = state object
    const name = target.name;
    this.setState({ [name]: value });
    console.log(checked);
  };

  // onClickButton() {
  //   experienceHandleChange(e) {
  // this.setState({
  //   experience: e.target.value
  //  });
  //  if (
  //   this.state.experienceErrors
  // ) {
  //   let user = {
  //     experience: this.state.experience,
  //   };
  //   let userD = Object.assign([], this.state.items);
  //   userD.push(user);
  //   this.setState({
  //     submitClicked: true,
  //     items: userD
  //   });
  // } else {
  //   if (!this.state.experience) {
  //     this.setState({
  //       experienceErrors: "Experience is required"
  //     });
  //   }
  // }
  // }
  // }

  handleSubmit(e) {
    e.preventDefault();
    const { myRef, selectedFile, name, email, phone, noticePeriod, jobLocation, currentOrganization, currentCtc, expectedCtc, experience, status, selectedName } = this.state;
    this.setState({status})
    const captchaValue = myRef.current;
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("noticePeriod", noticePeriod)
    formData.append("jobLocation", jobLocation)
    formData.append("currentOrganization", currentOrganization)
    formData.append("currentCtc", currentCtc)
    formData.append("expectedCtc", expectedCtc)
    formData.append("experience", experience)
    formData.append("cv", selectedFile)
    formData.append("designationValue", param)
    console.log(formData)
    axios.post('https://blobstation.free.beeceptor.com', formData)
      .then((res) => { console.log(res) })
      .then((response) => {
        if (response.status === 200) {
          alert('Thank You!');
          this.resetForm()
        } else if (response.status === 400 || 500) {
          alert('Error')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeFile() {
    this.setState({ selectedFile: null, selectedName: '' });
    console.log('Successful');
  }

  onChange() {
    console.log("Successfully loaded captcha");
  };

  render() {
    const { selectedName, fileValidationError, myRef, checked, items, isLoaded, status } = this.state;

    return (
      <div className='page-section'>
        {/* <Pages /> */}
        <div className="form-container">
          <div className="card-container">
            <div className="header-container">
              <h1 className="header-heading">Application Form</h1>
              <p className="header-paragraph-blue">{param}</p>
              <p className="header-paragraph">Please complete the form below to apply for a position with us.</p>
            </div>
            <div className="line-break"></div>
            <div className="content-container">
              <div className="commonForm">
                <form className="form-react" onSubmit={this.handleSubmit}>
                  <div className="form-inputs-div">
                    <div className="two-input-div">
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={this.nameChange}
                          placeholder="Name*"
                        />
                        <p className="text-danger">
                          {!this.state.name ? this.state.nameErrors : ""}
                        </p>
                      </div>
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="email"
                          name="email"
                          //pattern=""
                          value={this.state.email}
                          onChange={this.emailChange}
                          placeholder="Email(example@example.com)*"
                        />
                        <p className="text-danger">
                          {!this.state.email ? this.state.emailErrors : ""}
                        </p>

                      </div>
                    </div>
                    <div className="two-input-div">
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="phone"
                          name="phone"
                          inputMode="decimal"
                          value={this.state.phone}
                          onChange={this.phoneChange}
                          placeholder="Contact Number*"
                        />
                        <p className="text-danger">
                          {!this.state.phone ? this.state.phoneErrors : ""}
                        </p>
                      </div>
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="text"
                          name="noticePeriod"
                          value={this.state.noticePeriod}
                          onChange={this.noticeChange}
                          placeholder="Notice Period (MONTHS)*"
                        />
                        <p className="text-danger">
                          {!this.state.noticePeriod ? this.state.noticeErrors : ""}
                        </p>
                      </div>
                    </div>
                    <div className="two-input-div">
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="text"
                          name="jobLocation"
                          value={this.state.jobLocation}
                          onChange={this.handleChange}
                          placeholder="Job Location"
                        />
                      </div>
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="text"
                          name="currentOrganization"
                          value={this.state.currentOrganization}
                          onChange={this.handleChange}
                          placeholder="Current Organization"
                        />
                      </div>
                    </div>
                    <div className="two-input-div">
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="text"
                          name="currentCtc"
                          value={this.state.currentCtc}
                          onChange={this.handleChange}
                          placeholder="Current CTC(LPA)"
                        />
                      </div>
                      <div className="single-input-div">
                        <input
                          className="reactForm-input"
                          type="text"
                          name="expectedCtc"
                          value={this.state.expectedCtc}
                          onChange={this.expectedChange}
                          placeholder="Expected CTC(LPA)*"
                        />
                        <p className="text-danger">
                          {!this.state.expectedCtc ? this.state.expectedErrors : ""}
                        </p>
                      </div>
                    </div>
                    <div className="full-width-input">
                      <input
                        className="reactForm-input"
                        type="text"
                        name="experience"
                        value={this.state.experience}
                        onChange={this.experienceChange}
                        placeholder="Experience Years and Months*"
                      />
                      <p className="text-danger">
                        {!this.state.experience ? this.state.experienceErrors : ""}
                      </p>
                    </div>
                    <div className="file-upload">
                      <div className="file-content">
                        <img src="https://uploads-ssl.webflow.com/64819f0e618c99bec1ce8f6c/65a7aff657eb015c40897fb1_uploadImg.png" alt="upload" />
                        <h3 className="file-name">Upload File</h3>
                      </div>
                      <input
                        className="reactForm-input"
                        type="file"
                        name="selectedFile"
                        accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        onChange={this.onFileChange}
                      />
                    </div>
                    {this.state.selectedFile && <div><p className="file-name">{selectedName || "Upload CV"}</p>
                      <button onClick={this.removeFile}><span className='material-symbol-rounded'>Delete</span></button></div>}
                    {fileValidationError && (
                      <p className="error-message" style={{ marginBottom: "-22px" }}>{fileValidationError}</p>
                    )}
                    <div>
                      <input
                        type='checkbox'
                        name='checked'
                        value={checked}
                        onChange={this.handleChecked}
                        checked={checked} />
                      <label>Agreed with our terms & conditions to proceed further.</label>
                      {
                        checked ? (
                          <div className='recaptcha'>
                            <ReCAPTCHA
                              ref={myRef}
                              sitekey="6Lc24lQpAAAAAOE1xc0Mw7oyPfjLMJjxlTlJ3txP"
                              onChange={this.onChange}
                            />
                          </div>
                        ) : (<div></div>)
                      }
                  

                    </div>
                    <div className="form-button-submit">
                      <button className="form_submit" type="submit" > Submit </button>
                      {status ? <h1>{status}</h1> : null}
                      <div>
                        {items.map((item, index) => {
                          return (
                            <div classname="Col" item xs={5} key={index}>
                              <p>
                                <span>Name:{item.name}</span>
                              </p>
                              <p>
                                <span>Email:{item.email}</span>
                              </p>
                              <p>
                                <span>Phone:{item.phone}</span>
                              </p>
                              <p>
                                <span>Notice Period:{item.noticePeriod}</span>
                              </p>
                              <p>
                                <span>Job Location: {item.jobLocation}</span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryForm;