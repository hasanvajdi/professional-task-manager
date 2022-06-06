import { useState, useEffect } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router'
import axios from 'axios'; 
import PrivateHeader from '../../components/headers/PrivateHeader';
import dashboardStyle from '../../styles/dashboard.module.scss'

//ant design
import { Row, Col, Menu, Dropdown } from 'antd';
import { 
            LogoutOutlined, UserSwitchOutlined, EditOutlined, 
            CaretDownOutlined, UserOutlined, SettingFilled, 
            FrownOutlined
        } from '@ant-design/icons';

import { BsPeopleFill, BsPersonFill, BsListTask, BsAwardFill, BsSkipEndFill } from "react-icons/bs";

// components
import Group from '../../components/Group'
import User from '../../components/User'
import Task from '../../components/Task'


// api routes
import getGroups from '../api/account/dashboard/groups'
import getTasks from '../api/account/dashboard/tasks'
import getUsers from '../api/account/dashboard/users'


const logout = async ()=>{
    const { data } = await axios.post("/api/account/logout/")
    return data
}




const dashboard = (props)=>{
    const router = useRouter()
     
    
    const [groups, setGroups] = useState(props.groups)
    const [tasks, setTasks] = useState(props.tasks)
    const [users, setUsers] = useState(props.users)


    const logoutClickHandler = async ()=>{
        const logoutResult = await logout()
        if (logoutResult.success){
            router.push("/home")
        }
    }

    const userMenu = (
        <Menu>
          <Menu.Item key="0" icon={<EditOutlined className={dashboardStyle.userMenuIcon}/>} className={dashboardStyle.userMenuItem}>
            <span>ویرایش پروفایل</span>
          </Menu.Item>
    
          <Menu.Item key="1" icon={<UserSwitchOutlined className={dashboardStyle.userMenuIcon}/>} className={dashboardStyle.userMenuItem}>
            <span>وظایف شخصی</span>
          </Menu.Item>
    
          <Menu.Divider />
    
          <Menu.Item onClick={logoutClickHandler} key="3" icon={<LogoutOutlined className={[dashboardStyle.userMenuIcon]} style={{color:"red"}}/>} className={[dashboardStyle.userMenuItem, dashboardStyle.userMenuLogout]}>
            <sapn>خروج از حساب</sapn>
          </Menu.Item>
        </Menu>
    );

    

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
                                <span>{groups && groups?.length}</span>
                                <span>کل گروه ها</span>
                            </Col>

                            <Col className={dashboardStyle.allStatisticsUsers} span={7}>
                                <span>{ users?.length }</span>
                                <span>کل کاربر ها</span>
                            </Col>

                            <Col className={dashboardStyle.allStatisticsTasks} span={7}>
                                <span>{ tasks?.length }</span>
                                <span>کل وظیفه ها</span>
                            </Col>
                        </Row>

                        <Row className={dashboardStyle.groupRow} justify="space-between">
                            <Col span={17} className={dashboardStyle.groupList} >
                               <div className={dashboardStyle.groupRowDiv}>
                                    <span>لیست گروه ها</span>
                                    <BsPeopleFill className={dashboardStyle.groupListIcon}/>
                               </div>
                               <div className={dashboardStyle.groupRowList} >
                                    {   
                                        groups ?
                                            groups.length > 0 ?
                                                groups.map((group, key)=>{
                                                    return <Group 
                                                                key={key} 
                                                                data={group}
                                                                setGroups={setGroups} 
                                                                groupsState={groups}
                                                            />
                                                })
                                            : <div className={dashboardStyle.noDataContainer}>
                                                <FrownOutlined className={dashboardStyle.noDataIcon}/>
                                                <span className={dashboardStyle.noDataText}>there isn't any group</span>
                                              </div>

                                        : <span>there is not groups</span>
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
                                <div className={dashboardStyle.usersRowDiv}>
                                    <span>لیست کاربران</span>
                                    <BsPersonFill className={dashboardStyle.userListIcon}/>
                                </div>

                                <div className={dashboardStyle.usersRowList}>
                                    {   
                                        users ?
                                            users.length > 0 ?
                                                users.map((user, key)=>{
                                                    return <User key={key} data={user} />

                                                })
                                            : <div className={dashboardStyle.noDataContainer}>
                                                <FrownOutlined className={dashboardStyle.noDataIcon}/>
                                                <span className={dashboardStyle.noDataText}>there isn't any user</span>
                                              </div>
                                        : <span>no users</span>
                                    }
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

                                <div className={dashboardStyle.tasksRowDiv}>
                                    <span>لیست وظایف</span>
                                    <BsListTask className={dashboardStyle.taskListIcon}/>
                                </div>

                                <div className={dashboardStyle.userRowList}>
                                    {
                                        tasks ? 
                                            tasks.length > 0 ?
                                                tasks.map((task, key)=>{
                                                    return <Task key={key} data={task} />
                                                })
                                            : <div className={dashboardStyle.noDataContainer}>
                                                <FrownOutlined className={dashboardStyle.noDataIcon}/>
                                                <span className={dashboardStyle.noDataText}>there isn't any task</span>
                                              </div>
                                        : <span>no tasks</span>
                                    }   
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
    


export async function getServerSideProps(){ 
    try{
        const groups = await getGroups()
        const tasks  = await getTasks()
        const users  = await getUsers()

        return {
            props : {
                groups: groups,
                tasks: tasks,
                users: users
            }
        }
    }
    catch(ssrError){
        return {
            redirect: {
                destination : "/account/auth/login/"
            }
        }
    }
}


export default dashboard;


