import userStyle from '../styles/components/user.module.scss'
import {EyeOutlined} from "@ant-design/icons"

const User = ({ data })=>{
    return (
        <div className={userStyle.eachUser}>
            <div className={userStyle.userName}>
                <span>{ data.user.username }</span>
            </div>

            <div className={userStyle.userSee}>
                <EyeOutlined className={userStyle.userSeeIcon}/>
            </div>

        </div>
    )
}

export default User