import { apiSignup } from '../../../api'
import cookie from 'cookie';


const nextSignup = async (req, res)=>{
    try{
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
        res.status(200).json({"success":"you registred in successfully"})
    }
    
    catch(err){
        let errorText = ""

        if(err.response){

            if(err.response.data.non_field_errors){
                errorText = "تکرار رمز عبور یکسان نیست"
            }

            else if (err.response.data.username){
                errorText = "این نام کاربری قبلا ثبت شده است"
            }

            else if (err.response.data.password1){
                errorText = "رمز وارد شده کوتاه است. حداقل 8 کاراکتر وارد کنید"
            }

            else if (err.response.data.password2){
                errorText = "تکرار رمز عبور نمی تواند خالی باشد"
            }      
        }
        
        else{
            errorText = "خطا در ارتباط با سرور"
        }

        res.status(400).json({"error":`${errorText}`})
    }

    
}

export default nextSignup;