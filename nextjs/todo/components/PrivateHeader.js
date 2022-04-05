import privateHeaderStyle from "../styles/privateHeader.module.scss"


const PrivateHeader = ()=>{
    return(
        <header className={privateHeaderStyle.header} >
            <nav className={privateHeaderStyle.headerNav}>
                <ul className={privateHeaderStyle.headerUl}>
                    <li className={privateHeaderStyle.headerUlOption} style={{color:"black"}}>گروه های من</li>
                    <li className={privateHeaderStyle.headerUlOption} style={{color:"black"}}>گروه های من</li>
                    <li className={privateHeaderStyle.headerUlOption} style={{color:"black"}}>گروه های من</li>    
                    <li className={privateHeaderStyle.headerUlOption} style={{color:"black"}}>گروه های من</li>
                    <li className={privateHeaderStyle.headerUlOption} style={{color:"black"}}>گروه های من</li>
                    <li className={privateHeaderStyle.headerUlOption} style={{color:"black"}}>گروه های من</li>
                </ul>
            </nav>
        </header>
    )
}

export default PrivateHeader;