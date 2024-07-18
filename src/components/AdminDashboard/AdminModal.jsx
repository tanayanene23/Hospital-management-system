
import { Button } from "@mui/material";
import {Modal} from "@mui/material";
import { Box } from "@mui/material";

import styles from "./AdminModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function AdminModal(props) {


const {
    open,
    handleClose,
    singlePerson,
    singleFamily,
  } = props;





  const {
        Id,
        firstName,
        lastName,
        mobileNumber,
        dateOfBirth,
        age,
        weight,
        height,
        Bmi,
        countryOfOrigin,
        isDiabetic,
        hasCardiacIssues,
        hasBloodPressureConcerns,
        diseaseType,
        diseaseDescription
  } = singlePerson ? singlePerson : "";



  const personObj = {
        Id,
        Name: firstName,
        Surname: lastName,
        "Mobile Number": mobileNumber,
        "Birth Date": dateOfBirth ? (dateOfBirth).replace(/T.*/, "").split("-").reverse().join("-") : "",
        "Age":age,
        "Weight":weight,
        height,
        "Height":Bmi,
        Country: countryOfOrigin,
        Diabetes: isDiabetic === 0 ? "No" : "Yes",
        "Cardiac Issues": hasCardiacIssues === 0 ? "No" : "Yes",
        "Blood pressure concerns":
          hasBloodPressureConcerns === 0 ? "No" : "Yes",
        "Disease Type": diseaseType,
        "Disease Description": diseaseDescription,
  }


  const personalInfo = personObj
    ? Object.keys(personObj).map((key) => {
        return (
          <div key={key} className={styles.information}>
            <div className={styles.keys}>{key}:</div>


            <div>{personObj[key]}</div>


          </div>
        );
      })
    : "";



    const {
        FathersName,
        FathersAge,
        FathersCountry,
        MothersName,
        mothersAge,
        motherCountry,
        diabetic,
        preDiabetic,
        CardiacPast,
        cardiacPresent,
        bloodPressure,
    } = singleFamily ? singleFamily : ""


    const familyObj = {
        "Father's Name": FathersName,
        "Father's Age": FathersAge,
        "Father's country": FathersCountry,
        "Mother's Name": MothersName,
        "Mother's Age": mothersAge,
        "Mother's Country": motherCountry,
        "Currently Diabetic": diabetic === 0 ? "No" : "Yes",
        "Pre Diabetic": preDiabetic === 0 ? "No" : "Yes",
        "Cardiac History": CardiacPast === 0 ? "No" : "Yes",
        "Current Cardiac Issues": cardiacPresent === 0 ? "No" : "Yes",
        "Blood Pressure Concerns": bloodPressure === 0 ? "No" : "Yes",
    }



  const familyInfo = familyObj
    ? Object.keys(familyObj).map((key) => {
        return (
          <div key={key} className={styles.information}>
            <div className={styles.keys}>{key}:</div>

            <div>{familyObj[key]}</div>

          </div>
        );
      })
    : "";

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
  
      >
        <Box sx={style} className={styles.modalContents}>
          <div className={styles.details}>
            <h3>User Personal details: </h3>
            <div className={styles.showData}>{personalInfo}</div>
          </div>

          <div className={styles.details}>
            <h3>User Family details:</h3>
            <div className={styles.showData}>{familyInfo}</div>
          </div>

          <div className={styles.buttons}>
          

            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
