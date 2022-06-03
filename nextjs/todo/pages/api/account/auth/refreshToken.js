import { authApi } from "../.."




const refreshToken = async (refresh_token)=>{
    try{
        const {data} = await authApi.post("/token/refresh/", {'refresh':refresh_token},
            {
                headers:{
                    "Content-Type":"application/json",
                },
            }
        )
        return data.access
    }
    
    catch(err){
        return err.response
    }
}

export default refreshToken;