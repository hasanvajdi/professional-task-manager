import { apilogin } from '../../../api'
import cookie from 'cookie';



const nextLogin = async (req, res)=>{
    const loginData = JSON.stringify(req.body)
    try{

        const data = await apilogin(loginData)
    
        res.setHeader('Set-Cookie',
            [
                cookie.serialize('access_token', data.access_token, {
                    secure: true,
                    httpOnly: true,
                    sameSite: "lax",
                    path: '/',
                }),
        
                cookie.serialize('refresh_token', data.refresh_token, {
                    secure: true,
                    httpOnly: true,
                    sameSite: "lax",
                    path: '/',
                }),
            ]
        );
        
        res.status(200).json({"success":"you logged in successfully"})

    }
    catch(err){
        console.log("err login : ", err)

        let errorText = ""

        if(err.response){

            if(err.response.data.non_field_errors){
                errorText = "اطلاعات وارد شده اشتباه است"
            }

            console.log(errorText)
        }
        
        else{
            errorText = "خطا در ارتباط با سرور"
        }

        res.status(400).json({"error":`${errorText}`})

    }  
}

export default nextLogin;