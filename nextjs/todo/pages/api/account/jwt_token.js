import cookie from 'cookie';
import { apiJwtToken } from '../../../api'

const JwtToken = async (req, res)=>{
    const authResult = await apiJwtToken(req.cookies)
    console.log("auth res : ", authResult)

    if (authResult.access){
        console.log("ysss")
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
        console.log("refresh error")
    }
}

export default JwtToken;