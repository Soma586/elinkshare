import './styles.scss'
import logo from '../../../assets/images/logo-devlinks-large.svg'
import CTA from '../cta'
import test from '../../../assets/images/icon-links-header.svg'
import {ReactComponent as Linklogo} from '../../../assets/images/icon-links-header.svg'
import {ReactComponent as ProfileLogo} from '../../../assets/images/icon-profile-details-header.svg'
import  classNames  from 'classnames'

const TabButtons = ({handleClick,text, Logo, active}) => {

    console.log("WTF")
    console.log(Logo)

        return (
            <button onClick={handleClick} className={classNames("tabButton", active && 'tabActive' )}>
               
               {/* <p>testing</p> */}
               {Logo && <Logo/>}
                <span className="type__HeadingS"> {text} </span>
            </button>
        )

}

const Nav = ({handleShowLinks, handleShowProfile, showLinks, showProfile}) => {

console.log(ProfileLogo)

    return (
        <div className="navContainer d-flex justify-content-between">


            <img   src={logo} />

            <div>

                <TabButtons handleClick={handleShowLinks} text="Links" Logo={Linklogo} active={showLinks}/>
                <TabButtons handleClick={handleShowProfile} text="Profile Details" Logo={ProfileLogo} active={showProfile}/>
            </div>

            <div className="previewButton">
                <CTA text ="Preview"/>
            </div>
        </div>
    )

}


export default Nav