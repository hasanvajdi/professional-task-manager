import cookie from 'cookie';
import { apiJwtToken } from '../../../api'



const JwtToken = async (req, res)=>{

    const authResult = await apiJwtToken(req.cookies)

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
        
        return authResult
    }
    
}

export default JwtToken;