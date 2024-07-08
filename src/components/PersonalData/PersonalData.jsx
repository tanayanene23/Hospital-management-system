import { TextField } from "@mui/material";

import apiCall from "../AxiosInstance/AxiosInstance.jsx";

import styles from "./PersonalData.module.css";

import {Button} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {sendPersonalDetails} from './PersonalDataSlice.jsx'
import { putPersonalDetails } from "./PersonalDataSlice.jsx";


function PersonalData() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const personalData = useSelector(state => state.personalDetailsForm)
    console.log("this is data from useSelector",personalData)

    const [submit, setSubmit] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    const [input, setInput] = useState({firstName: "", lastName: "", mobileNumber: "", dateOfBirth: "", weight: "", height: "", countryOfOrigin: "", isDiabetic: "", hasCardiacIssues: "", hasBloodPressureConcerns: "", diseaseType: "", diseaseDescription: ""})

    const [editable, setEditable] = useState(false)
    const [successfulGet, setSuccessfulGet] = useState(false)
    

  const formFields = [
    {
      id: 0,
      label: "First Name",
      name: "firstName",
      question: "Enter your first name",
      type: "text",
      validation: /^[a-zA-Z]+?$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 1,
      label: "Second Name",
      name: "lastName",
      question: "Enter your second name",
      type: "text",
      validation: /^[a-zA-Z]+?$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 2,
      label: "Mobile number",
      name: "mobileNumber",
      question: "Enter your mobile number",
      type: "number",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 3,
      label: "Date of birth",
      name: "dateOfBirth",
      question: "Enter your date of birth",
      type: "date",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 4,
      label: "Weight",
      name: "weight",
      question: "Enter your precise weight.",
      //  Eg. 50.2
      type: "string",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 5,
      label: "Height",
      name: "height",
      question: "Enter your height.",
      //  Eg. 5-7
      type: "string",
      validation: /^[a-zA-Z]+?$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 6,
      label: "Country of origin",
      name: "countryOfOrigin",
      question: "Enter the country you belong to",
      type: "text",
      validation: /^[a-zA-Z]+?$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 7,
      label: "Diabetic/Prediabetic",
      name: "isDiabetic",
      question: "Are you diabetic or pre-diabetic?",
      type: "radio",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 8,
      label: "Cardiac issues",
      name: "hasCardiacIssues",
      question: "Have you suffered any cardiac related issues in the past or are suffering currently?",
      type: "radio",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 9,
      label: "Blood pressure concerns",
      name: "hasBloodPressureConcerns",
      question: "Do you have concerns with your blood pressure?",
      type: "radio",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 10,
      label: "Disease type",
      name: "diseaseType",
      question: "Enter the type of disease that you have. Type NA if not applicable.",
      type: "text",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
    {
      id: 11,
      label: "Disease description",
      name: "diseaseDescription",
      question: "Enter your disease description. Type NA if not applicable.",
      type: "text",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false,
    },
  ];


  function saveInput(e){
    setInput((prevState) => ({...prevState, [e.target.name]: (e.target.type === 'radio' ? JSON.parse(e.target.value) : e.target.value)}))
  }
  console.log(input)



  const getPersonalDetails = async() => {
  try{
      const token = JSON.parse(localStorage.getItem('loginToken'))
      console.log(token.token)
      const res = await apiCall.get("/patients", {headers: {
        Authorization: token.token
      }});
      console.log('this is the reponsee',res.data.data[0])
      const derivedData = res.data.data[0]
      console.log('this eez derivedDta',derivedData)
      const {firstName, lastName, mobileNumber, dateOfBirth, weight, height, countryOfOrigin, isDiabetic, hasCardiacIssues, hasBloodPressureConcerns, diseaseType, diseaseDescription} = derivedData;

      const obj = {
        firstName,
        lastName, mobileNumber, dateOfBirth: new Date(`${dateOfBirth}`).toISOString().replace(/T.*/,''), weight, height, countryOfOrigin, isDiabetic: (isDiabetic === 0 ? false : true), hasCardiacIssues : (hasCardiacIssues === 0 ? false : true), hasBloodPressureConcerns : (hasBloodPressureConcerns === 0 ? false : true), diseaseType, diseaseDescription
      }

      

      console.log('obj: ', obj)

      setInput(obj)
      setSuccessfulGet(true)

   
      return res.data;
  }
  catch(error){
      console.log(error)
  }
}




  const newState = (location !== 'undefined') ? location : false


  useEffect(() => {
    setEditable(newState.state)
    if(editable === true){
      getPersonalDetails()
    }
  },[editable, newState])

  console.log("editable state",editable)
  console.log("input",input)





  const handleSubmit = (e) => {
    console.log(e)
    console.log('handlesubmit working')
    e.preventDefault()
    setFormErrors(validate(input))
    setSubmit(true)
  }




  useEffect(() => {
    console.log("formerrors",formErrors)
    console.log('input',input)
    if(Object.keys(formErrors).length === 0 && submit && editable === true){
        if(successfulGet){
          const putInput = input
          delete putInput.dateOfBirth
          console.log('before putpersonal')
          dispatch(putPersonalDetails(putInput))
          console.log('putpersonal working')
          navigate("/familyData", {state: true})
        }
    }
    else{
      if(Object.keys(formErrors).length === 0 && submit){
        console.log("correct input",input)
        navigate("/familyData")
        dispatch(sendPersonalDetails(input))
      }
    }



  }, [formErrors, submit, dispatch, navigate, location.state, editable, input, successfulGet])




  const validate = (values) => {
        console.log('validate function is working')

        const errors = {}

       
        
        const errorMessages = {
          firstName : "Enter first name only",
          lastName : "Enter last name only",
          mobileNumber : "Please enter a 10 digit mobile number",
          weight : "Please enter the weight as follows: eg. 50.5",
          height : "Please enter the height as follows: eg. 5-2",
        }

        const regex = {
          firstName: /^[a-zA-Z]+?$/,
          lastName: /^[a-zA-Z]+?$/,
          mobileNumber: /^\d{10}$/,
          weight: /^(\d{1,5}\.\d{1,})$/,
          height: /^(\d{1,5}-\d{1,})$/,
        }


        for (const [key, value] of Object.entries(values)) {
          if(value === ""){
            console.log(key, ":", value)
            console.log(`these are rikame  Key: ${key}, Value: ${value}`);

            errors[key] = "This field is required"
          }
        

          for(const abc of Object.keys(regex)){
              if(regex[abc].test(values[abc]) === false){
              errors[abc] = errorMessages[abc]

            }
          }
         
          
      }

        return errors;
  }








  const formContent = formFields.map((field) => {
    if(field.type === "radio"){
      return(
        <div className={styles.formFields} key={field.id}>
          <label className={styles.formLabel} htmlFor={field.label}>
            {field.question}
          </label>
   
          <div className={styles.radioInput}>
            <div className="forYes">
                <input
                  id="outlined-error-helper-text"
                  label={field.label}
                  name={field.name}
                 
                  type={field.type}
                  value={true}
                  checked={input[`${field.name}`] ? true : false}
                  onChange={(e) => {saveInput(e)}}
                />
                <label htmlFor="Yes">Yes</label>
            </div>

            <div className="forNo">
                <input
                  id="outlined-error-helper-text"
                  label={field.label}
                  name={field.name}
     
                  type={field.type}
                  value={false}
                  checked={input[`${field.name}`] === false ? true : false}
                  onChange={(e) => {saveInput(e)}}
                />
                <label htmlFor="no">No</label>
            </div>
            <p className={styles.requiredError}>{formErrors[field.name]}</p>
          </div>
     
      </div>
      )
    }
    else{
      return (
        <div className={styles.formFields} key={field.id}>
          <label className={styles.formLabel} htmlFor={field.label}>
            {field.question}
          </label>
    
            <div>
              <TextField
                id="outlined-error-helper-text"
                label={field.label}
                name={field.name}
             
                className={styles.inputField}
                type={field.type}
                required
                value={input[`${field.name}`]}
                onChange={(e) => {saveInput(e)}}
              />
              <p className={styles.requiredError}>{formErrors[field.name]}</p>
            </div>
        </div>
    )}
  });


  return (
    <div className={styles.container}>
      <div className={styles.formTitle}>
        <h1>Personal details</h1>
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >

        <div className={styles.gridContents}>
          {formContent}
          
        </div>

        <div className={styles.nextButton}>
          <Button
                type='submit'
                variant="contained"
                >
                Next step
          </Button>
        </div>


        

      </form>

    </div>
  );
}

export default PersonalData;
