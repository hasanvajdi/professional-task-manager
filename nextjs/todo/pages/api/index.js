import axios from 'axios';



const api = axios.create({
    baseURL : "http://localhost:8000",
    withCredentials: true,
})


const authApi = axios.create({
    baseURL : "http://localhost:8000/dj-rest-auth",
    withCredentials: true,
})


const routeApi = axios.create({
    baseURL: "http://localhost:3000/api"
})





export{
    api,
    authApi,
    routeApi,
}