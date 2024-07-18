import styles from "../Login/Login.module.css" 
import image1 from "../../assets/images/doctor2.jpg"

import {TextField} from '@mui/material';

import {Button} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



import { useSelector, useDispatch } from 'react-redux'

import { addUser } from "./SignupDataSlice";

import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import Icon from "react-icons-kit";


function Signup() {

    const dispatch = useDispatch()
    const userList = useSelector((state) => state.newUser)
    const serverError = userList.error


    serverError === null ? console.log("true") : console.log("false")

    const navigate = useNavigate()



    const [input, setInput] = useState({Email: "", Password: "", ConfirmPassword: ""})
    const [formErrors, setFormErrors] = useState({})


    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    
    let formFields = [
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
            type: type,
            errorMsg: "",
            valid: false
        },
        {
            id: 2,
            label: "ConfirmPassword",
            placeholder: "Confirm your password...",
            type: type,
            errorMsg: "Enter matching passwords",
            valid: false
        }
    ]


    function saveInput(e){
        setInput((prevState) => ({...prevState, [e.target.name]: e.target.value}))
      }
      console.log(input)



      const handleSubmit = (e) => {
        console.log(e)
        console.log('handlesubmit working')
        e.preventDefault()
        setFormErrors(validate(input))

        if(Object.keys(formErrors).length === 0){
    

            dispatch(addUser({Email: input.Email, Password: input.Password}))
            .then((response) => {
                return response
            })
            .then((data) => {
                console.log("letssee if we have data",data)
                if(data.type === "sendSignup/fulfilled"){
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(error)
            })
            
        }

      }











      const validate = (values) => {
         
            const errors = {}

           

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

            if(!values.ConfirmPassword){
                errors.ConfirmPassword = "Enter password again to confirm"
            }
            else if(values.Password !== values.ConfirmPassword){
                errors.ConfirmPassword = "Both passwords should be matching"
            }

            return errors;
      }
      


      const handleToggle = () => {
        if(type === 'password'){
          setIcon(eye)
          setType('text')
        }
        else{
          setIcon(eyeOff)
          setType('password')
        }
      }
    
      


    const formContent = formFields.map((field) => {
        return(
          <div className={styles.formFields} key={field.id}>

        
                    <div>
                        <div className={styles.iconStyling}>

                        <TextField
                        name={field.label}
                        label={field.label}
             
                        className={styles.inputField}
                        type={field.type}
                        value={TextField[field.label]}
                        onChange={(e) => {saveInput(e)}}
                        />

                        <div  className={styles.eyeIcon}>
                        {(field.label === "Password" || field.label === "ConfirmPassword")&& <span  onClick={handleToggle}><Icon icon={icon}/></span>}
                        </div>

                        </div>

                        <p className={styles.requiredError}>{formErrors[field.label]}</p>
                    </div>
    
            </div>
        )
      })




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

                        <p>Create your account</p>
                </div>

                <div className={styles.inputs}>

                    <form className={styles.inputs} onSubmit={(e) => {handleSubmit(e)}}>

                        {formContent}

                        <Button variant="contained" type='submit'>Sign Up</Button>
                    </form>

                        
                </div>            
                


                <p>Already have an account? <Link to='/'><span id={styles.span}>Log in</span></Link>
                </p>

            </div>

        </div>
    </>
  )
}

export default Signup

