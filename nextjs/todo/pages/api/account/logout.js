import { apiLogout } from '../../../api'
import cookie from 'cookie';



const logout = async (req, res)=>{
    console.log("in api routes")
    res.setHeader('Set-Cookie',
        [
            cookie.serialize("access_token", "none", {
                secure: true,
                    httpOnly: true,
                    sameSite: "lax",
                    path: '/',
            }),

            cookie.serialize("refresh_token", "none", {
                secure: true,
                    httpOnly: true,
                    sameSite: "lax",
                    path: '/',
            }),
        ]
    )
    
    res.redirect(200, '/')
    
}

export default logout;