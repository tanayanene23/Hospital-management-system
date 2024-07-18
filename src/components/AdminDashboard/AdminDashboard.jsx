import styles from './AdminDashboard.module.css'
import apiCall from "../AxiosInstance/AxiosInstance";

import logout from "../../assets/images/Logout.svg";
import medical from "../../assets/images/Medical.svg";
import view from "../../assets/images/view.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AdminModal from "./AdminModal";


import { FaSearch } from "react-icons/fa";

import Pagination from './Pagination';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/");
  };

  const [credentials, setcredentials] = useState();

  const [personal, setPersonal] = useState();
  const [family, setFamily] = useState();

  const [singlePerson, setSinglePerson] = useState();
  const [singleFamily, setSingleFamily] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // state for searching 
  const [query, setQuery] = useState("")
  // console.log(query)


  // for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = credentials ? credentials.slice(indexOfFirstEntry, indexOfLastEntry) : ""



  // console.log('credentials',credentials)


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    console.log("page number from paginate",pageNumber)
  }

  const prevPage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }




  // for sorting 
  // credentials ? credentials.sort((a, b) => a.Email.localeCompare(b.Email)) : ""
  // console.log(credentials)


  const sort = (e) => {
    if(e.target.value === "asc"){
        const ascSorted = [...credentials].sort((a, b) => a.Email.localeCompare(b.Email))
        console.log(credentials)
        console.log("sortAscending clicked")
        setcredentials(ascSorted)
    }
    if(e.target.value === "desc"){
      const descSorted = [...credentials].sort((a, b) => b.Email.localeCompare(a.Email))
        console.log("sortdescending clicked")
        setcredentials(descSorted)
    }
  }




  const getFamilyDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loginToken"));
      const res = await apiCall.get("/FamilyData", {
        headers: {
          Authorization: token.token,
        },
      });
      const derivedData = res.data.data;
      setFamily(derivedData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonalDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loginToken"));
      const res = await apiCall.get("/patients", {
        headers: {
          Authorization: token.token,
        },
      });
      const derivedData = res.data.data;
      setPersonal(derivedData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCredentials = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("loginToken"));
      const res = await apiCall.get("/PatientData", {
        headers: {
          Authorization: token.token,
        },
      });
      const derivedData = res.data.data;
      setcredentials(derivedData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getFamilyDetails();
    getPersonalDetails();
    getCredentials();
  }, []);



  function viewData(rowData) {
    for (const obj in personal) {
      const values = personal[obj];

      for (const key in values) {
        if (key === "Id") {
          const personalId = values[key];

          if (personalId === rowData.Id) {
            console.log("personalid", personalId);
            console.log(personal[obj]);
            setSinglePerson(personal[obj]);
          }
          // else{
          //   setSinglePerson(null)
          // }
             
        }
      }
    }


    for (const obj in family) {
      const values = family[obj];

      for (const key in values) {
        if (key === "Id") {
          const familyId = values[key];
          if(familyId === rowData.Id) {
            console.log("familyID", familyId);
            console.log(family[obj]);
            setSingleFamily(family[obj]);
            console.log("id found")
          }
          // else{
          //   setSingleFamily(null)
          // }
        }
      }
    }

    handleOpen();
  }



    let registeredCount = 0 
    for (const credential in credentials){
      // console.log("total registered patients", credentials[credential])
      registeredCount += 1
    }

    // pagination nextPage funtion
    const nextPage = () => {
      if(currentPage !== Math.ceil(registeredCount / entriesPerPage)){
        setCurrentPage(currentPage + 1)
      }
    }

    let diabetesCount = 0
    let cardiacCount = 0
    let diseaseCount = 0

    for (const personData in personal){
      const patientsData = personal[personData]
      
      if(patientsData["isDiabetic"] === 1){
        // console.log("diabetic patients",patientsData)
        diabetesCount += 1
      }


      if(patientsData["hasCardiacIssues"] === 1){
        // console.log("cardiac patients",patientsData)
        cardiacCount += 1
      }


      if(patientsData["diseaseType"] !== "NA"){
        // console.log("diseased patients",patientsData)
        diseaseCount += 1
      }

    }




    const stats = {
      "Total Registered Patients" : registeredCount,
      "Diabetic Patients" : diabetesCount,
      "Patients with Cardiac Issues" : cardiacCount,
      "Patients having Diseases" : diseaseCount
  }


    const kpiCards = Object.keys(stats).map((key) => {
      return(
          <div key={key} className={styles.dataCard}>
              <h5 className={styles.titles}>{key}:</h5>
              <h3 className={styles.numbers}>{stats[key]}</h3>
          </div>
      )
  })




  const objects = currentEntries
    ? Object.keys(currentEntries)
    .filter((item) => {
      const itemObj = currentEntries[item]
      return query.toLocaleLowerCase() === "" ? item : itemObj.Email.toLocaleLowerCase().includes(query)
    })
    .map((key) => {
      // console.log("key from .map", credentials[key])
        const rows = currentEntries[key];
        const rowData = Object.keys(rows).map((key) => {
          return <td key={key}>{rows[key]}</td>;
        });

        return (
          <tr key={key}>
            {rowData}
            <td
              className={styles.view} 
            >

            <img className={styles.openModal} onClick={() => {
                viewData(rows);
            }} src={view} alt="view" />


            </td>
          </tr>
        );
      })
    : "";


  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={medical} alt="medical" />
          <div>Medassist</div>
        </div>

        <div className={styles.logout} onClick={navigation}>
          <p>Logout</p>
          <img
            className={styles.logoutImage}
            src={logout}
            alt="logout"
          />
        </div>
      </nav>

      <div>
        <h2 className={styles.heading}>Welcome Admin!</h2>
        <p>You can view the details of all the registered users here.</p>
      </div>

        <div className={styles.dataCards}>
            {kpiCards}
        </div>

        <div className={styles.search}>
            <h3>Patient details:</h3>
            <div className={styles.searchBar}>
                <input 
                className={styles.searchInput}
                type="text"
                placeholder='Search'
                value={query}
                onChange={(e) => {setQuery(e.target.value)}}
                />
                <FaSearch className={styles.searchIcon}/>
            </div>
        </div>


      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>
              <div className={styles.sorting}>
                Email
                <select className={styles.selectSort} onChange={sort}>
                  <option value="" selected disabled hidden>Sort by</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </th>
            <th>role</th>
            <th>View details</th>
          </tr>
        </thead>
        <tbody>{objects}</tbody>
      </table>

      <Pagination
      entriesPerPage={entriesPerPage}
      totalEntries={registeredCount}
      paginate={paginate}
      prevPage={prevPage}
      nextPage={nextPage}
      />

      <AdminModal
        open={open}
        handleClose={handleClose}
        singlePerson={singlePerson}
        singleFamily={singleFamily}
        setSinglePerson={setSinglePerson}
        setSingleFamily={setSingleFamily}
      />

    </div>
  );
};

export default AdminDashboard;
