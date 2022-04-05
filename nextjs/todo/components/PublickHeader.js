import headerStyle from "../styles/header.module.scss"


const PublickHeader = ()=>{
    return(
        <header className={`${headerStyle.header} animate__animated animate__fadeInDown` } >
            <nav className={headerStyle.headerNav}>
                <ul className={headerStyle.headerUl}>
                    <li className={headerStyle.headerUlOption}>صفحه اصلی</li>
                    <li className={headerStyle.headerUlOption}>حساب کاربری</li>
                    <li className={headerStyle.headerUlOption}>ورود</li>
                    <li className={headerStyle.headerUlOption}>ثبت نام</li>
                </ul>
            </nav>
        </header>
    )
}

export default PublickHeader;