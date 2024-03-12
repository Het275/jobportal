import React from "react"
// import { useForm } from 'react-hook-form';
import './App.css';

const paramObj = window.location.search;
const searchParams = new URLSearchParams(paramObj);
const param = searchParams.get('current_job_designation');
class Function extends React.Component {
 constructor(props) 
 {
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
        cv: '', 
        selectedFile: null, 
        selectedName: '', 
        fileValidationError: '', 
        submitClicked: false, 
        items: [], 
        errors: { 
            nameErrors: '', 
            emailErrors: '', 
            phoneErrors: '', 
            noticeErrors: '', 
            expectedErrors: '', 
            experienceErrors: '',
            isValidEmail: '' 
        }
    }
 this.handleChange = this.handleChange.bind(this)
 this.onFileChange = this.onFileChange.bind(this)
 this.nameChange = this.nameChange.bind(this) 
//  this.emailChange = this.emailChange.bind(this) 
 this.phoneChange = this.phoneChange.bind(this) 
 this.noticeChange = this.noticeChange.bind(this) 
 this.expectedChange = this.expectedChange.bind(this) 
 this.experienceChange = this.experienceChange.bind(this) 
 this.handleSubmit = this.handleSubmit.bind(this) 
 this.removeFile = this.removeFile.bind(this)
 } 
handleChange(e)
{ 
    const name = e.target.name; 
    const value = e.target.value; 
    this.setState({[name] : value}); 
}

onFileChange(e) {
    let file = this.state.selectedFile;
    file = e.target.files[0]; 
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (file && allowedFileTypes.includes(file.type)) {
      this.setState({ 
        selectedFile: file, 
        selectedName: file.name, 
        fileValidationError: '', 
    }); 
    console.log('Selected File:', file); 
    console.log('File Name:', file.name); 
    console.log('File Size:', file.size); 
    console.log('File Type:', file.type); 
} else {
 this.setState({ 
    selectedFile: null, 
    selectedName: '', 
    fileValidationError: 'Invalid file type. Please upload a PDF, Word, or Doc file.', 
}); 
console.log(this.state.selectedFile);
} 
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

// emailChange(e)
// { 
//     this.setState({ email: e.target.value }); 
//     if(!this.state.email){
//         this.setState({
//             emailErrors: "Email is Required"
//         })
//     } else if (!/\S+@\S+\.\S+/.test(this.state.email)){
//         this.setState({ 
//             isValidEmail : "Email is invalid"
//         })
//       }
// }

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
  
handleSubmit(e)
{
 e.preventDefault();
 fetch('https://jobportal-api.blobstation.com/job', { 
    method: 'POST', 
    headers: { 
        'Content-type': 'application/json; charset=utf-8', 
    }, body: JSON.stringify ({ 
    name: this.state.name, 
    email: this.state.email, 
    contactNumber: this.state.phone, 
    noticePeriod: this.state.noticePeriod, 
    currentJobLocation: this.state.jobLocation, 
    currentOrganization: this.state.currentOrganization, 
    currentCtc: this.state.currentCtc, 
    expectedCtc: this.state.expectedCtc, 
    experience: this.state.experience, 
    CV: this.state.selectedName, 
    currentDesignation: param, 
})
 }) .then(response => {console.log(response)})
    .catch((err) => { console.log(err); }) 
}
 
removeFile()
{ 
    this.setState({selectedFile: null, selectedName:''}); 
    console.log('Successful'); 
}

render()
{ 
const {selectedName, fileValidationError, myRef, checked} = this.state;
// const form = useForm();
// const {register, formState} = form;
// const {errors} = formState;
 return ( 
 <div className="form-container"> 
 <div className="card-container"> 
 <div className="header-container"> 
 <h1 className="header-heading">Application Form</h1> 
 <p className="header-paragraph-blue">{param}</p> 
 <p className="header-paragraph">Please complete the form below to apply for a position with us.</p> </div> <div className="line-break"></div> 
 <div className="content-container"> 
 <div className="commonForm"> 
 <form className="form-react" onSubmit={this.handleSubmit} noValidate> 
 <div className="form-inputs-div"> 
 <div className="two-input-div"> 
    <div className="single-input-div"> 
        <input  className="reactForm-input" type = "text" name="name" value={this.state.name} onChange={this.nameChange} placeholder="Name*" />
        <p className="text-danger"> {!this.state.name ? this.state.nameErrors : ""}</p> 
        {/* {errors.name && <p className="text-danger">Name is required</p>} */}
    </div>
    <div className="single-input-div"> 
        <input className="reactForm-input" type = "email" name="email" value={this.state.email} onChange={this.emailChange} placeholder="Email(example@example.com)*" /> 
        <p className="text-danger"> {!this.state.email ? this.state.emailErrors : ""}</p>
        {/* {errors.email && <p className="text-danger">Email is required and must be valid</p>} */}
    </div> 
</div>
<div className="two-input-div"> <div className="single-input-div"> <input className="reactForm-input" type = "phone" name="phone" maxLength={10} value={this.state.phone} onChange={this.phoneChange} placeholder="Contact Number*" />
<p className="text-danger"> {!this.state.phone ? this.state.phoneErrors : ""}</p>
{/* {errors.phone && <p className="text-danger">Must be a valid phone number</p>} */}
    </div>
    <div className="single-input-div">
       <input className="reactForm-input" type = "text" name="noticePeriod" value={this.state.noticePeriod} onChange={this.noticeChange} placeholder="Notice Period (MONTHS)*" />
       <p className="text-danger"> {!this.state.noticePeriod ? this.state.noticeErrors : ""}</p>
    </div>
    </div>
    <div className="two-input-div">
    <div className="single-input-div">
       <input className="reactForm-input" type = "text" name="jobLocation" value={this.state.jobLocation} onChange={this.handleChange} placeholder="Job Location" />
    </div>
    <div className="single-input-div">
       <input className="reactForm-input" type = "text" name="currentOrganization" value={this.state.currentOrganization} onChange={this.handleChange} placeholder="Current Organization" />
    </div>
    </div>
    <div className="two-input-div">
    <div className="single-input-div">
       <input className="reactForm-input" type = "text" name="currentCtc" value={this.state.currentCtc} onChange={this.handleChange} placeholder="Current CTC(LPA)" />
    </div>
    <div className="single-input-div">
      <input className="reactForm-input" type = "text" name="expectedCtc" value={this.state.expectedCtc} onChange={this.expectedChange} placeholder="Expected CTC(LPA)*" />
       <p className="text-danger"> {!this.state.expectedCtc ? this.state.expectedErrors : ""}    </p>
    </div>
    </div>
    <div className="full-width-input">
       <input className="reactForm-input" type = "text" name="experience" value={this.state.experience} onChange={this.experienceChange} placeholder="Experience Years and Months*" />
<p className="text-danger"> {!this.state.experience ? this.state.experienceErrors : ""} </p>
    </div>
    <div className="file-upload"> <div className="file-content">
<img src= "https://uploads-ssl.webflow.com/64819f0e618c99bec1ce8f6c/65a7aff657eb015c40897fb1_uploadImg.png" alt="upload"/> <h3 className="file-name">Upload CV*</h3> </div> <input className="reactForm-input" type = "file" name="cv" value={this.state.cv} onChange={this.onFileChange} hidden/> {fileValidationError && (
            <p className="text-danger" style={{marginBottom: "-22px"}}>{fileValidationError}</p>
          )}
    </div>
    {this.state.selectedFile && <div className="selectedFile"><h3 className="file-name">{selectedName || "Upload CV"}</h3> <button onClick={this.removeFile}><span className="delete-icon"style={{cursor: 'pointer'}}><img src="https://uploads-ssl.webflow.com/64819f0e618c99bec1ce8f6c/65a923a1f35a26071625603c_svgviewer-output.svg" alt="Delete"/></span></button></div>}

   <div className="form-button-submit"> <button className="form_submit" type="submit"> Submit </button> </div> </div> </form> </div> </div> </div> </div>
  );
 }
}

export default Function;