import {TextField} from '@mui/material';

import apiCall from "../AxiosInstance/AxiosInstance.jsx";

import styles from "../PersonalData/PersonalData.module.css"

import {Button} from '@mui/material';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {sendFamilyDetails} from './FamilyDataSlice.jsx'
import { putFamilyDetails } from './FamilyDataSlice.jsx';

function FamilyData() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log("LOCATION",location)

    const familyData = useSelector(state => state.familyDetailsForm)
    console.log("this is data from useSelector",familyData)

    const [formErrors, setFormErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    const [input, setInput] = useState({FathersName: "", FathersAge: "", FathersCountry: "", MothersName: "", mothersAge: "", motherCountry: "", diabetic: "", preDiabetic: "", CardiacPast: "", cardiacPresent: "", bloodPressure: ""})

    const [editable, setEditable] = useState(false)
    const [successfulGet, setSuccessfulGet] = useState(false)

    const formFields = [
        {
            id: 0,
            label: "Father's Name",
            name: "FathersName",
            question: "Enter your father's name",
            type: "text",
            validation: /^[a-zA-Z]+?$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 1,
            label: "Father's age",
            name: "FathersAge",
            question: "Enter your father's age",
            type: "number",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 2,
            label: "Father's country",
            name: "FathersCountry",
            question: "Enter your father's country of origin",
            type: "text",
            validation: /^[a-zA-Z]+?$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 3,
            label: "Mother's Name",
            name: "MothersName",
            question: "Enter your mother's name",
            type: "text",
            validation: /^[a-zA-Z]+?$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 4,
            label: "Mother's age",
            name: "mothersAge",
            question: "Enter your mother's age",
            type: "number",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 5,
            label: "Mother's country ",
            name: "motherCountry",
            question: "Enter your mother's country of origin",
            type: "text",
            validation: /^[a-zA-Z]+?$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 6,
            label: "Parents diabetes status",
            name: "diabetic",
            question: "Is any of your parents presently diabetic?",
            type: "radio",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 7,
            label: "Parents diabetes status",
            name: "preDiabetic",
            question: "Were any of your parents diabetic in the past?",
            type: "radio",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 8,
            label: "Parents cardiac issues",
            name: "CardiacPast",
            question: "Have any of your parents suffered any cardiac related issues in the past? ",
            type: "radio",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 9,
            label: "Parents cardiac issues",
            name: "cardiacPresent",
            question: "Are any of your parents currently suffering any cardiac related issues? ",
            type: "radio",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
        {
            id: 10,
            label: "Parents blood pressure",
            name: "bloodPressure",
            question: "Are any of your parents concerned with their blood pressure?",
            type: "radio",
            validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            errorMsg: "Enter a valid email",
            valid: false,
        },
    ]

    function saveInput(e){
        setInput((prevState) => ({...prevState, [e.target.name]: (e.target.type === 'text' ? e.target.value : JSON.parse(e.target.value))}))
        console.log(typeof(e.target.value))
      }
      console.log(input)


      const getFamilyDetails = async() => {
        try{
            const token = JSON.parse(localStorage.getItem('loginToken'))
            console.log(token.token)
            const res = await apiCall.get("/FamilyData", {headers: {
              Authorization: token.token
            }});
            console.log('this is the reponsee',res.data.data[0])
            const derivedData = res.data.data[0]
            console.log('this eez derivedDta',derivedData)
            const {FathersName, FathersAge, FathersCountry, MothersName, mothersAge, motherCountry, diabetic, preDiabetic, CardiacPast, cardiacPresent, bloodPressure} = derivedData;
      
            const obj = {
              FathersName, FathersAge, FathersCountry, MothersName, mothersAge, motherCountry, diabetic, preDiabetic, CardiacPast, cardiacPresent, bloodPressure
            }
      
            console.log('obj: ', obj)
            
            Object.keys(obj).forEach((item) => {
              if(obj[item] === 0){
                obj[item] = false
              }
              else if(obj[item] === 1){
                obj[item] = true
              }
            })
            
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
      getFamilyDetails()
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
        console.log(input)
        if(Object.keys(formErrors).length === 0 && submit && editable === true){
            if(successfulGet){
              dispatch(putFamilyDetails(input))
              navigate("/uploadDocuments", {state: true})
            }
        }
        else{
          if(Object.keys(formErrors).length === 0 && submit){
            console.log("correct input",input)
            dispatch(sendFamilyDetails(input))
            navigate("/uploadDocuments")
          }
        }
    
      }, [formErrors, input, submit, dispatch, navigate, editable, successfulGet, location.state])
    
    


    
      const validate = (values) => {
            console.log('validate function is working')
     
            const errors = {}

            
            const errorMessages = {
                FathersName: "Please enter fathers first name",
                FathersAge: "Please enter fathers correct age",
                MothersName: "Please enter mothers first name",
                mothersAge: "Please enter mothers correct age"
            }
    
            const regex = {
              FathersName : /^[a-zA-Z]+?$/,
              FathersAge : /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/,
              MothersName: /^[a-zA-Z]+?$/,
              mothersAge: /^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/,
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
            return(
                <div className={styles.formFields} key={field.id}>
      
                          <label className={styles.formLabel} htmlFor={field.label}>{field.question}</label>
                          
                          <div>
                              <TextField
                              id="outlined-error-helper-text"
                              label={field.label}
                              name={field.name}
                             
                              className={styles.inputField}
                              type={field.type}
                              value={input[`${field.name}`]}
                              onChange={(e) => {saveInput(e)}}
                              />

                              <p className={styles.requiredError}>{formErrors[field.name]}</p>
                          </div>
                  </div>
              )
          }
      })
  

  return (
    <div className={styles.container}>

        <div className={styles.formTitle}>
            <h1>Family details</h1>
        </div>
        
        <form  onSubmit={(e) => {
          handleSubmit(e);
        }}>
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
  )
}

export default FamilyData

