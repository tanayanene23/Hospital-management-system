import styles from "./UserDashboard.module.css";
import logout from "../../assets/images/Logout.svg";
import medical from "../../assets/images/Medical.svg";
import { useNavigate } from "react-router-dom";
import apiCall from "../AxiosInstance/AxiosInstance";
import { useEffect, useState } from "react";
import BasicModal from "./Modal";
import { Button } from "@mui/material";
import background from "../../assets/images/bg.svg"

const UserDashboard = () => {
  const [getFamilyData, setGetFamilyData] = useState({});
  const [getPersonalData, setGetPersonalData] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const navigation = () => {
    navigate("/");
  };

  const token = JSON.parse(localStorage.getItem("loginToken"));

  function fetchFamilyInfo() {


    apiCall
      .get("/FamilyData", {
        headers: {
          Authorization: token.token,
        },
      })
      .then((response) => {
        return response.data.data[0];
      })
      .then((data) => {
        console.log(data);

        const {
          Id,
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
        } = data;

        const obj = {
          Id,
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
        };

        setGetFamilyData(obj);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async function fetchPersonalInfo() {
    try {
      const res = await apiCall.get("/patients", {
        headers: {
          Authorization: token.token,
        },
      });
      console.log("this is response", res.data.data[0]);

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
        diseaseDescription,
      } = res.data.data[0];

      const obj = {
        Id,
        Name: firstName,
        Surname: lastName,
        "Mobile Number": mobileNumber,
        "Birth Date": new Date(`${dateOfBirth}`)
          .toISOString()
          .replace(/T.*/, "")
          .split("-")
          .reverse()
          .join("-"),
        "Age": age,
        "Weight":weight,
        "Height":height,
        Bmi,
        Country: countryOfOrigin,
        Diabetes: isDiabetic === 0 ? "No" : "Yes",
        "Cardiac Issues": hasCardiacIssues === 0 ? "No" : "Yes",
        "Blood pressure concerns":
          hasBloodPressureConcerns === 0 ? "No" : "Yes",
        "Disease Type": diseaseType,
        "Disease Description": diseaseDescription,
      };

      setGetPersonalData(obj);

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAccount = () => {
    deleteUser();
    handleClose();
    // navigate("/")
  };

  const deleteUser = async () => {
    try {
      const res = await apiCall.delete("/PatientData", {
        headers: {
          Authorization: token.token,
        },
      });
      console.log("this is response", res);
      // navigate('/')
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
    fetchFamilyInfo();
  }, []);



  const personals = Object.keys(getPersonalData).map((key) => {
    return (
      <div key={key} className={styles.datas}>
        <p className={styles.dataKey}>{key}:</p>
        <p>{getPersonalData[key]}</p>
      </div>
    );
  });

  const families = Object.keys(getFamilyData).map((key) => {
    return (
      <div key={key} className={styles.datas}>
        <p className={styles.dataKey}>{key}:</p>
        <p>{getFamilyData[key]}</p>
      </div>
    );
  });



  const handleEdit = () => {
    navigate("/personalData", { state: true });
  };


  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={medical} alt="medical" />
          <div>Medassist</div>
        </div>

        <div className={styles.logout} onClick={navigation}>
          <p>Logout</p>
          <img className={styles.logoutImage} src={logout} alt="logout" />
        </div>
      </nav>


      <div className={styles.content}>
        <div className={styles.topPage}>
            <div>
            <h1>Welcome to MedAssist!</h1>
            <h4>A space for you to save all your medical information.</h4>
            <h1 className={styles.quote}>We bring our expertise and knowledge to help you actieve a better health</h1>
            </div>

            <div>
                <img className={styles.backgroundImage} src={background} alt="bgPicture" />
            </div>
        </div>
        

      

        <div className={styles.dataTables}>
             
        

        <div className={styles.options}>
    

          <Button variant="contained" onClick={handleEdit}>
            Edit your form
          </Button>
          <Button variant="contained" onClick={handleOpen}>
            Delete user account
          </Button>
        </div>

        <div className={styles.dataContainer}>
    
          <div className={styles.showDetails}>
            <h3 className={styles.dataHeading}>Your Personal details:</h3>
            {personals}
          </div>

          <div className={styles.showDetails}>
            <h3 className={styles.dataHeading}>Your family details:</h3>
            {families}
          </div>

        </div>

        </div>

      </div>

      <BasicModal
        open={open}
        handleClose={handleClose}
        deleteAccount={deleteAccount}
      />
    </div>
  );
};

export default UserDashboard;
