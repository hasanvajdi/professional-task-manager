import PrivateHeader from '../../components/PrivateHeader';
import dashboardStyle from '../../styles/dashboard.module.scss'

import { useEffect } from 'react';
import JwtToken from '../api/account/jwt_token';


//ant design
import { Row, Col, Menu, Dropdown, Divider } from 'antd';
import { LogoutOutlined, UserSwitchOutlined, EditOutlined, CaretDownOutlined, UserOutlined, SettingFilled} from '@ant-design/icons';
import { BsPeopleFill, BsPersonFill, BsListTask, BsAwardFill, BsSkipEndFill } from "react-icons/bs";

//api folder
import * as api from '../../api'

//react query
import { useQuery } from 'react-query';
import axios from 'axios';




const userMenu = (
    <Menu>
      <Menu.Item key="0" icon={<EditOutlined className={dashboardStyle.userMenuIcon}/>} className={dashboardStyle.userMenuItem}>
        <span>ویرایش پروفایل</span>
      </Menu.Item>

      <Menu.Item key="1" icon={<UserSwitchOutlined className={dashboardStyle.userMenuIcon}/>} className={dashboardStyle.userMenuItem}>
        <span>وظایف شخصی</span>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="3" icon={<LogoutOutlined className={[dashboardStyle.userMenuIcon]} style={{color:"red"}}/>} className={[dashboardStyle.userMenuItem, dashboardStyle.userMenuLogout]}>
        <sapn>خروج از حساب</sapn>
      </Menu.Item>
    </Menu>
);


const dashboard = ({groups, tasks, users})=>{
    //const { data:groupsData } = useQuery("groups", api.getGroups,  { initialData:groups.list })
    //const { data:tasksData } = useQuery("tasks", api.getTasks,  { initialData:tasks.list })
    //const { data:usersData } = useQuery("tasks", api.getUsers,  { initialData:users.list })

    //console.log("hasan: ", groupsData)
   

    return(
        <div className={dashboardStyle.profileContainer} style={{height:"auto !important"}}>
            <Row className={dashboardStyle.profileHeader}>
                    <Col className={dashboardStyle.headerUserContainer} span={2} >
                        <UserOutlined className={dashboardStyle.headerUserIcon} />
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <CaretDownOutlined className={dashboardStyle.headerNavIcon} />
                        </Dropdown>
                    </Col>
                    <Col span={20} >
                        <PrivateHeader />
                    </Col>
                    <Col span={2} className={dashboardStyle.headerSettingCol}>
                        <SettingFilled className={dashboardStyle.headerSettingIcon} />
                    </Col>

            </Row>

            <Row className={dashboardStyle.profileBody}>
                    <Col className={dashboardStyle.allStatisticsCol}>

                        <Row className={dashboardStyle.allStatisticsColRow} justify="space-between" >

                            <Col className={dashboardStyle.allStatisticsGroups} span={7}>
                                <span>{groups.list?.length}</span>
                                <span>کل گروه ها</span>
                            </Col>

                            <Col className={dashboardStyle.allStatisticsUsers} span={7}>
                                <span>{ users.list?.length }</span>
                                <span>کل کاربر ها</span>
                            </Col>

                            <Col className={dashboardStyle.allStatisticsTasks} span={7}>
                                <span>{ tasks.list?.length }</span>
                                <span>کل وظیفه ها</span>
                            </Col>
                        </Row>

                        <Row className={dashboardStyle.groupRow} justify="space-between">
                            <Col span={17} className={dashboardStyle.groupList} >
                               <div className={dashboardStyle.groupRowDiv}>
                                    <span>لیست گروه ها</span>
                                    <BsPeopleFill className={dashboardStyle.groupListIcon}/>
                               </div>
                               <div className={dashboardStyle.groupRowList}>
                                    {
                                        groups.list.length > 0 || groups.list ? groups.list.map((group, key)=>{
                                            return <div className={dashboardStyle.eachGroup} key={key}>
                                                        <div className={dashboardStyle.groupName}>
                                                            { group.name }
                                                        </div>
                                                        <div className={dashboardStyle.groupSee}>
                                                            <span className={dashboardStyle.groupSeeText}>مشاهده</span>
                                                        </div>
                                                    </div>
                                        }) 
                                        : "no group"
                                    }
                               </div>
                            </Col>

                            <Col span={6} className={dashboardStyle.groupMostWork} >
                                <div>
                                    <span>گروه های پرکار</span>
                                    <BsAwardFill className={dashboardStyle.groupMostWorkIcon}/>
                                </div>
                            </Col>
                        </Row>

                        <Row className={dashboardStyle.userStatisticRow} justify="space-between" >

                            <Col className={dashboardStyle.userStatisticToday} span={7}>
                                <span>۲۳۴</span>
                                <span>کاربران امروز</span>
                            </Col>

                            <Col className={dashboardStyle.userStatisticRecent} span={7}>
                                <span>۷۵۶</span>
                                <span>کاربران اخیر</span>
                            </Col>

                            <Col className={dashboardStyle.userStatisticOnline} span={7}>
                                <span>۴۳۵۶</span>
                                <span>کاربران آنلاین</span>
                            </Col>
                        </Row>

                        <Row className={dashboardStyle.usersRow} justify="space-between">
                          
                            <Col span={17} className={dashboardStyle.userList} >
                                <div>
                                    <span>لیست کاربران</span>
                                    <BsPersonFill className={dashboardStyle.userListIcon}/>
                                </div>
                            </Col>

                            <Col span={6} className={dashboardStyle.todayUsers} >
                                <div>
                                    <span>کاربران پر کار</span>
                                    <BsAwardFill className={dashboardStyle.todayUsersIcon} />
                                </div>
                            </Col>
                        </Row>

                        <Row className={dashboardStyle.tasksRow} justify="space-between">
                            <Col span={17} className={dashboardStyle.tasksList} >
                                <div>
                                    <span>لیست وظایف</span>
                                    <BsListTask className={dashboardStyle.taskListIcon}/>
                                </div>
                            </Col>

                            <Col span={6} className={dashboardStyle.lastTasks} >
                                <div>
                                    <span>اخرین وظایف</span>
                                    <BsSkipEndFill className={dashboardStyle.lastTasksIcon}/>
                                </div>
                            </Col>
                        </Row>

                    </Col>
            </Row>

        </div>
    )
}



export async function getServerSideProps(context){
    JwtToken(context.req, context.res)
    
    const groups    = await api.getGroups()
    const tasks     = await api.getTasks()
    const users     = await api.getUsers()

    

    return {
        props : {
            groups : {
                list : groups,
            },

            tasks : {
                list : tasks,
            },

            "users" : {
                list : users,
            }
        }
    }
}





export default dashboard;