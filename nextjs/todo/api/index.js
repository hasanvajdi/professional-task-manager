import axios from 'axios';


const api = axios.create({
    baseURL : "http://localhost:8000"
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
    
    try{
        const gdata = await api.get("/group", {
            withCredentials: true,
            
        })
        return gdata.data
    }
    catch( gerror){
        console.log("gerror")
    }
}


const getTasks = async ()=>{

    const { data } = await api.get("/task", {
        withCredentials: true,
    })
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
        return {"valid":"access token is valid"}
    }
    catch (error){
        if(error.response.status === 401){
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