import axios from 'axios'

// const token = JSON.parse(localStorage.getItem('loginToken'))

const apiCall = axios.create({
    baseURL: " http://localhost:3000/api/",
    // headers: {
    //     Authorization: token.token
    // }
})

export default apiCall