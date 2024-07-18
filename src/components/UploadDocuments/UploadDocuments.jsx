import { styled } from '@mui/material/styles';
import {Button} from '@mui/material';

import styles from './UploadDocuments.module.css'
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {sendDocuments} from './UploadDocumentsSlice.jsx'
import { putDocuments } from './UploadDocumentsSlice.jsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const documentList = [
    {
        id: 0,
        label: 'Aadhar card front side',
        name: "aadharCardFront"
    },
    {
        id: 1,
        label: 'Aadhar card back side',
        name: "aadharCardBack"
    },
    {
        id: 2,
        label: 'Medical insurance front side',
        name: "medicalInsuranceCardFront"
    },
    {
        id: 3,
        label: 'Medical insurance back side',
        name: "medicalInsuranceCardBack"
    }
]






function UploadDocuments() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("location",location)


    const docState = useSelector(state => state.documentDetails)
    console.log('this is state from slice',docState)


    const [submit, setSubmit] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [input, setInput] = useState({    
        aadharCardFront: "",
        aadharCardBack: "",
        medicalInsuranceCardFront: "",
        medicalInsuranceCardBack: ""
    })


    const [editable, setEditable] = useState(true)


    const [files, setFiles] = useState([])

    console.log(files)
  


    const packFiles = useCallback(() => {
        const data = new FormData();
        ([...files]).forEach((file, i) => {
            data.append(`${documentList[i]?.name}`, file)
        })
        return data
    }, [files])

       



        
  const handleSubmit = (e) => {
    console.log(e)
    console.log('handlesubmit working')
    e.preventDefault()
    setFormErrors(validate(input))
    setSubmit(true)
  }

  const newState = (location !== 'undefined') ? location : false

  useEffect(() => {
    console.log("formerrors",formErrors)

    setEditable(newState.state)
    if(files.length && Object.keys(formErrors).length === 0 && submit && editable){
        const data = packFiles(files)
        dispatch(putDocuments(data))
        navigate("/userDashboard")
    }
    else{
        if(files.length && Object.keys(formErrors).length === 0 && submit){
            const data = packFiles(files)
            dispatch(sendDocuments(data))
            navigate("/userDashboard")
        }
    }

  }, [formErrors, input, submit, dispatch, navigate, files, packFiles, editable, newState])



  const validate = (values) => {
        console.log('validate function is working')

        const errors = {}

        for (const [key, value] of Object.entries(values)) {
          if(value === ""){
            console.log(key, ":", value)
            console.log(`these are rikame  Key: ${key}, Value: ${value}`);
            errors[key] = "Please upload this document"
          }
          
      }
    return errors;
  }







    

        function saveFilesToState(e){
            setFiles((prevState) => ([...prevState, e.target.files[0]]))
            setInput((prevState) => ({...prevState, [e.target.name]: e.target.value}))
        }



    const documents = documentList.map((document) => {
        return(
    
            <div  key={document.id} className={styles.documentAndLabel}>
    
                <p>
                    Upload your {document.label}
                </p>
    
                <div className={styles.uploadSection}>
                    <div>
                    <Button
                    className={styles.uploadBtn}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    color='secondary'
                    // onChange={(e) => {appendFileName(e, document.id)}}
                    // onChange={(e) => {saveInput(e)}}
                    // onChange={(e) => {setFiles((prevState) => ([...prevState, e.target.files[0]]))}}
                    onChange={(e) => {saveFilesToState(e)}}
                    >
                    Choose file
                    <VisuallyHiddenInput type="file" name={document.name}/>
                    </Button>
                    
                    <p className={styles.requiredError}>{formErrors[document.name]}</p>
                    </div>

                    <p>{input[document.name]}</p>
                </div>
    
            </div>
        )
    })
    





  return (
    <div className={styles.container}>

        <div className={styles.formTitle}>
            <h1>Upload Documents</h1>
        </div>

        <p className={styles.ifEditable}>{editable ? "upload all the documents again" : ""}</p>
        <form    
            onSubmit={(e) => {
            handleSubmit(e);
            }}
        >
        <div className={styles.documents}>
            {documents}
        </div>


        <div className={styles.nextButton}>
            <Button
                type='submit'
                variant="contained"
                >
                Submit form
            </Button>
        </div>

        </form>

    </div>
  )
}

export default UploadDocuments