import axios from 'axios';
import Cookies from 'js-cookie'



const api = axios.create({
    baseURL : "http://localhost:8000",
    withCredentials: true,
    headers : {
        'Authorization' : 'Bearer ' + Cookies.get('access_token'),
    }
})



const authApi = axios.create({
    baseURL : "http://localhost:8000/dj-rest-auth",
    withCredentials: true,
})



const deleteObj = async (typeobj, id)=>{
    const { data } = api.delete(`${typeobj}/${id}`)
    console.log("del data :", data)
}



export{
    api,
    authApi,
    deleteObj,
}