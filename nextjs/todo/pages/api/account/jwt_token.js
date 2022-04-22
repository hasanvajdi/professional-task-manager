import cookie from 'cookie';
import { apiJwtToken } from '../../../api'



const JwtToken = async (req, res)=>{
    console.log("in jwt")

    const authResult = await apiJwtToken(req.cookies)
    console.log("before authResult", authResult)

    if(authResult){
        if (authResult.access){
            res.setHeader('Set-Cookie',
                [
                    cookie.serialize('access_token', authResult.access, {
                        secure: true,
                        httpOnly: true, 
                        sameSite: "lax",
                        path: '/',
                    }),
                ]
            );
        }
        else if (authResult.error){
            return authResult.error
        }
    }
    
}

export default JwtToken;