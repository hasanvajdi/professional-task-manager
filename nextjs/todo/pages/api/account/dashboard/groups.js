import { api } from '../../../api'
import refreshToken from '../auth/refreshToken'
import cookie from 'cookie';


const deleteApi = async (token, id)=>{
    //const { data } = api.delete(`${typeobj}/${id}`)
    console.log("del data :")
}

const putApi = (token, id)=>{
    console.log("in puth apit")
}

const postApi = (token, data)=>{
    console.log("in post api")
}

const getApi = async (token)=>{
    const { data }  = await api.get("/group/", {
        headers:{
            Authorization : "Bearer " + token
        }
    })
    return data
    
}



const Groups = async (req, res)=>{
    const authCookies = cookie.parse(req.headers.cookie)
    
    try{

        if(req.method){

            if(req.method == "DELETE"){
                deleteApi(authCookies.access_token)
                console.log("delete delete delete", req.query.id)
            }

            else if(req.method == "PUT"){
                console.log("put put put")
            }

            else if(req.method == "POST"){
                console.log("post post post")
            }
            else if(req.method == "GET"){
                console.log("in getttttttttt")
                const groupList = await getApi(authCookies.access_token)
                return groupList
            }
        }

        else{
            console.log("in elseee")
        }
        
    }

    catch(err){
        if(err.response && err.response.status == 401){
            try{
                const newAccessToken = await refreshToken(authCookies.refresh_token)
    
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
    
                const groupList2 = await getApi(newAccessToken)
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

export default Groups;



