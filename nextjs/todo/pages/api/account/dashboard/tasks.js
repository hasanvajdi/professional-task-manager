import { api } from '../../../api'
import refreshToken from '../auth/refreshToken'
import cookie from 'cookie';



const getTasksApi = async (token)=>{
    const { data }  = await api.get("/task/", {
        headers:{
            Authorization : "Bearer " + token
        }
    })
    return data
}


const getTasks = async (req, res)=>{
    try{
        const taskList = await getTasksApi(req.cookies.access_token)
        return taskList
    }

    catch(err){
        if(err.response && err.response.status == 401){
            try{
                const newAccessToken = await refreshToken(req.cookies.refresh_token)
    
                res.setHeader('Set-Cookie',
                    [
                        cookie.serialize('access_token', newAccessToken, {
                            path: '/',
                            httpOnly:true,
                            sameSite:"lax",
                            secure:true
                        }),
                
                    ]
                );
    
                const taskList2 = await getTasksApi(newAccessToken)
                return taskList2
            }
            catch(refreshError){
                throw "refresh token error"
            }
        } 
    }
}

export default getTasks;



