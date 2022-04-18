import cookie from 'cookie';
import { apiJwtToken } from '../../../api'

const JwtToken = async (request)=>{
    apiJwtToken(request.cookies)
}

export default JwtToken;