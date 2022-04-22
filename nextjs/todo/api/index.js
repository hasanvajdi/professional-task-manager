import axios from 'axios';


const api = axios.create({
    baseURL : "http://localhost:8000",
    withCredentials: true,

})


const apilogin = async (values)=>{
    const { data } = await api.post("/dj-rest-auth/login/", values, {
        headers:{
            "Content-Type":"application/json",
        },
        withCredentials: true,
    })
    return data
}


const apiSignup = async (values)=>{
    const { data } = await api.post("/dj-rest-auth/signup/", values, {
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials: true,
        })
    return data
}


const getGroups = async ()=>{
    console.log("in api group")
    const { data } = await api.get("/group", { withCredentials: true })
    return data
}


const getTasks = async ()=>{
    const { data } = await api.get("/task")
    return data
}


const getUsers = async ()=>{
    const { data } = await api.get("/profile", {
        withCredentials: true,
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
        console.log("apiJwtToken return")

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
            console.log("bad request")
            return {"error":"bad request"}
        }
    }
}



export{
    apilogin,
    apiSignup,
    getGroups,
    getTasks,
    getUsers,
    apiJwtToken,
}