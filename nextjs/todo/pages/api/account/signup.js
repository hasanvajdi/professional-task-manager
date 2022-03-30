import { apiSignup } from '../../../api'
import cookie from 'cookie';


const nextSignup = async (req, res)=>{
    console.log("body : ", req.body.username)
    const signupData = JSON.stringify(req.body)

    const data = await apiSignup(signupData)
    res.setHeader('Set-Cookie',
        [
            cookie.serialize('access', data.access_token, {
                secure: true,
                httpOnly: true,
                sameSite: "lax",
                path: '/',
            }),
    
            cookie.serialize('refresh', data.refresh_token, {
                secure: true,
                httpOnly: true,
                sameSite: "lax",
                path: '/',
            }),
        ]
    );  
}

export default nextSignup;