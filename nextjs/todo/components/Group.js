import groupStyle from '../styles/components/group.module.scss'
import {EyeOutlined} from "@ant-design/icons"

const Group = ({ data })=>{
    return (
        <div className={groupStyle.eachGroup}>
            <div className={groupStyle.groupName}>
                { data.name }
            </div>
            <div className={groupStyle.groupSee}>
                <EyeOutlined className={groupStyle.groupSeeIcon}/>
            </div>
        </div>
    )
}


export default Group;