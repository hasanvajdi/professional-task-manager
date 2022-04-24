import axios from 'axios';


const api = axios.create({
    baseURL : "http://localhost:8000",
})


const apilogin = async (values)=>{
    const { data } = await api.post("/dj-rest-auth/login/", values, {
        headers:{
            "Content-Type":"application/json",
        },
    })
    return data
}


const apiSignup = async (values)=>{
    const { data } = await api.post("/dj-rest-auth/signup/", values, {
            headers:{
                "Content-Type":"application/json",
            },
        })
    return data
}


const apiLogout = async (refresh_token)=>{
    const { data } = await api.post("/dj-rest-auth/logout/", JSON.stringify({refresh:refresh_token}), 
        {
            headers:{
                "Content-Type":"application/json",
            },
        }
    )
    console.log(" logoute data :", data)
    return data
}


const getGroups = async (access_token)=>{
    const { data } = await api.get("/group", {
        headers:{
            'Authorization' : 'Bearer ' + access_token,
        }
        })
    return data
}


const getTasks = async (access_token)=>{
    const { data } = await api.get("/task",{
        headers:{
            'Authorization' : 'Bearer ' + access_token,
        }
    })
    return data
}


const getUsers = async (access_token)=>{
    const { data } = await api.get("/profile", {
        headers:{
            'Authorization' : 'Bearer ' + access_token,
        }
        })
    return data
}


const apiJwtToken = async (tokens)=>{
    
    try{
        const { data } = await api.post("/dj-rest-auth/token/verify/", 
            JSON.stringify({"token":tokens.access_token}),
            {
                headers:{
                    "Content-Type":"application/json",
                },
            }
        )

        return {"valid":"access token is valid"}
    }
    catch (error){
        if(error.response.status === 401 && tokens.refresh_token){
            try{
                const { data } = await api.post("/dj-rest-auth/token/refresh/", 
                    JSON.stringify({"refresh":tokens.refresh_token}),
                    {
                        headers:{
                            "Content-Type":"application/json",
                        },
                    }
                )
                return data
            }
            catch (refreshError){
                return {"error":"Auth Error"}
            }
        }
        else{
            return {"error":"bad request"}
        }
    }
}



export{
    apilogin,
    apiSignup,
    apiLogout,
    getGroups,
    getTasks,
    getUsers,
    apiJwtToken,
}