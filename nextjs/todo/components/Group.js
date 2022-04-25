import groupStyle from '../styles/components/group.module.scss'

const Group = ({ data })=>{
    return (
        <div className={groupStyle.eachGroup}>
            <div className={groupStyle.groupName}>
                { data.name }
            </div>
            <div className={groupStyle.groupSee}>
                <span className={groupStyle.groupSeeText}>مشاهده</span>
            </div>
        </div>
    )
}

export default Group;