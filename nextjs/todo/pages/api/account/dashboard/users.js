import { api } from '../../../api'
import refreshToken from '../auth/refreshToken'
import cookie from 'cookie';



const getUsersApi = async (token)=>{
    const { data }  = await api.get("/profile/", {
        headers:{
            Authorization : "Bearer " + token
        }
    })
    return data
}


const getUsers = async (req, res)=>{
    try{
        const userList = await getUsersApi(req.cookies.access_token)
        return userList
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
    
                const userList2 = await getUsersApi(newAccessToken)
                return userList2
            }
            catch(refreshError){
                throw "refresh token error"
            }
        } 
    }
}

export default getUsers;



