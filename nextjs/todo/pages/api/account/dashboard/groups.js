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
        const groupsList = await getGroupsApi(req.cookies.access_token)
        return groupsList
    }
    
    catch(groupErr){
        if(groupErr.response.status==401){
            // get new access token with sending refresh token
            const newAccessToken = await refreshToken(req.cookies.refresh_token)
            // set new access token in cookies
            res.setHeader('Set-Cookie',
                    [
                        cookie.serialize('access_token', newAccessToken, {
                            path: '/',
                            httpOnly: true,
                            secure: true,
                            sameSite: "lax"
                        }),
                    ]
            );
            // get group data again
            const groupsList = await getGroupsApi(newAccessToken)
            return groupsList
        }
    }

    return "groupsList"
}

export default getGroups;