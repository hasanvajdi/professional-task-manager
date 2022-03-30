import axios from 'axios';

const apilogin = async (values)=>{
    const { data } = await axios.post("http://localhost:8000/dj_auth/login/", values, {
        headers:{
            "Content-Type":"application/json"
        }
    })
    return data
}


const apiSignup = async (values)=>{
    const { data } = await axios.post("http://localhost:8000/dj_auth/signup/", values, {
            headers:{
                "Content-Type":"application/json"
            }
        })
    return data
}

export{
    apilogin,
    apiSignup,
}