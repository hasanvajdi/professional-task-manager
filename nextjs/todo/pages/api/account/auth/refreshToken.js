import { authApi } from "../.."




const refreshToken = async (refresh_token)=>{
    console.log("yesss in refresh")
    try{
        const {data} = await authApi.post("/token/refresh/", {'refresh':refresh_token},
            {
                headers:{
                    "Content-Type":"application/json",
                },
            }
        )
        
        console.log("refreshdat :", data)
        return data.access
    }
    
    catch(err){
        console.log("errr in reffferrssh", err)
    }
}

export default refreshToken;