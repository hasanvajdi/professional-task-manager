import { api } from '../../../api'
import refreshToken from '../auth/refreshToken'
import cookie from 'cookie';



const getGroupsApi = async (token)=>{
    const { data }  = await api.get("/group/", {
        headers:{
            Authorization : "Bearer " + token
        }
    })
    return data
}


const getGroups = async (req, res)=>{
    try{
        const groupList = await getGroupsApi(req.cookies.access_token)
        return groupList
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
    
                const groupList2 = await getGroupsApi(newAccessToken)
                return groupList2
            }
            catch(refreshError){
                throw "refresh token error"
            }
        }

        
    }
    
    if (res.redirect){
        res.redirect(200, "/")
    }
}

export default getGroups;



