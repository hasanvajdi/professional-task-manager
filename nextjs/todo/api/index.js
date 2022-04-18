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

    api.post("/dj-rest-auth/token/verify/", 
                JSON.stringify({"token":tokens.access_token}),
                {
                    headers:{
                        "Content-Type":"application/json",
                    },
                }
            )
    .then(resAccessVerify=>{
        console.log("access is ok")
    })
    .catch(errAccessVerify=>{
        console.log("access error")
        api.post("/dj-rest-auth/token/refresh/", 
            JSON.stringify({"refresh":tokens.refresh_token}),
            {
                headers:{
                    "Content-Type":"application/json",
                },
            }
        )
        .then(resRefreshVerify=>{
            console.log("refresh is ok")
        })
        .catch(errRefreshVerify=>{
            console.log("refresh error", errRefreshVerify)
        })
    })


    //return data
}



export{
    apilogin,
    apiSignup,
    getGroups,
    getTasks,
    getUsers,
    apiJwtToken,
}