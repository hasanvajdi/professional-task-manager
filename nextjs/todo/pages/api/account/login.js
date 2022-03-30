import { apilogin } from '../../../api'
import cookie from 'cookie';

import { setCookies } from 'cookies-next';


const nextLogin = async (req, res)=>{
    const loginData = JSON.stringify(req.body)
    const data = await apilogin(loginData)

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

    res.status(200).json({"success":"you logged in successfully"})
  
}

export default nextLogin;