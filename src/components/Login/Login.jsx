import styles from "./Login.module.css";
import image1 from "../../assets/images/doctor2.jpg";

import apiCall from "../AxiosInstance/AxiosInstance.jsx";
import { TextField } from "@mui/material";

import { Button } from "@mui/material";

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {sendLogin} from './LoginSlice.jsx'

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const loginData = useSelector(state => state.userLogin)
  console.log('this is sample data',loginData)

  const loginError = useSelector(state => state.userLogin.error)
  console.log("this is the error state", loginError)



  const [login, setLogin] = useState({ Email: "", Password: "" });

  const [formErrors, setFormErrors] = useState({})




  const formFields = [
    {
      id: 0,
      label: "Email",
      placeholder: "Enter your email id...",
      type: "email",
      validation: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      errorMsg: "Enter a valid email",
      valid: false
    },
    {
      id: 1,
      label: "Password",
      placeholder: "Enter your password...",
      type: "password",
      errorMsg: "",
      valid: false
    },
  ];




  const getPersonalDetails = async() => {
    try{
        const token = JSON.parse(localStorage.getItem('loginToken'))
        console.log(token.token)
        const res = await apiCall.get("/patients", {headers: {
          Authorization: token.token
        }});

        return res;
    }
    catch(error){
        console.log(error)
    }
  }




 


  function saveInput(e) {
    setLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(input)
  }
  console.log(login);

  

  const handleSubmit = (e) => {
    console.log(e)
    console.log('handlesubmit working')
    e.preventDefault()
    setFormErrors(validate(login))


    if(Object.keys(formErrors).length === 0 ){

      dispatch(sendLogin(login))
      .then((response) => {
        return response
      })
      .then((data) => {
            if(data.type === "sendLogin/fulfilled"){
                getPersonalDetails()
                .then((response) => {
                  return response
                })
                .then((data) => {
                  console.log("this is dta from inside presonaldetails", data)
                  if(login.Email === "admin@gmail.com"){
                    navigate("/adminDashboard")
                  }
                  else if(data.statusText === "No Content"){
                    navigate('/personalData')
                  }
                  else if(data.statusText === "Created"){
                    navigate('/userDashboard')
                  }
                })
        }
      })
      .catch((error) => {
        console.log(error)
      })
      

    }
  }





  const validate = (values) => {
        console.log('validate function is working')
        console.log('values', values)

        for (const [key, value] of Object.entries(values)) {
            console.log(`Key: ${key}, Value: ${value}`);
        }
        const errors = {}

        console.log('object keys',Object.keys(values))      

        const EmailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        if(!values.Email){
            errors.Email = 'Email is required'
        }
        else if(!EmailValidation.test(values.Email)){
            errors.Email = 'This is not a valid email.'
        }

        if(!values.Password){
            errors.Password = "Password is required"
        }

        return errors;
  }



  const formContent = formFields.map((field) => {
    return (
      <div className={styles.formFields} key={field.id}>
      
          <div>
            <TextField
              id="outlined-error-helper-text"
              name={field.label}
              label={field.label}
      
              className={styles.inputField}
              type={field.type}
              value={TextField[field.label]}
              onChange={(e) => {
                saveInput(e);
              }}
            />

            <p className={styles.requiredError}>{formErrors[field.label]}</p>
          </div>
      </div>
    );
  });

  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <p>Get professional healthcare services for and your family</p>
          <img src={image1} alt="doctorimg" />
        </div>

        <div className={styles.content}>
          <div className={styles.formText}>
            <h2>Welcome!</h2>

            <p>Login to your account</p>
          </div>

          
          

          <form className={styles.inputs} onSubmit={(e) => {handleSubmit(e)}}>

              {formContent}

              <Button
              type='submit'
              variant="contained"
              >
              Log in
              </Button>
            
          </form>

      
          <p>
            Don&apos;t have an account? <Link to='/signUp'><span id={styles.span}>Sign in</span></Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;
