import {ReactComponent as GitIcon} from '../../../../assets/images/icon-github.svg'
import {ReactComponent as GitLabIcon} from '../../../../assets/images/icon-gitlab.svg'
import {ReactComponent as FacebookIcon} from '../../../../assets/images/icon-facebook.svg'
//import devtoIcon from '../../../assets/images/icon-devto.svg'
import  {ReactComponent as LinkedinIcon} from '../../../../assets/images/icon-linkedin.svg'
import {ReactComponent as StackoverIcon} from '../../../../assets/images/icon-stack-overflow.svg'
import {ReactComponent as TwitchIcon} from '../../../../assets/images/icon-twitch.svg'
import {ReactComponent as TwitterIcon} from '../../../../assets/images/icon-twitter.svg'
import {ReactComponent as YoutubeIcon} from '../../../../assets/images/icon-youtube.svg'
import  {ReactComponent as FreecodeIcon}  from '../../../../assets/images/icon-freecodecamp.svg'
//import {ReactComponent as CodepenIcon} from '../../../assets/images/icon-codepen.svg'
import {ReactComponent as CodewarsIcon} from '../../../../assets/images/icon-codewars.svg'
import { ReactComponent as HashnodeIcon} from '../../../../assets/images/icon-hashnode.svg'
//import linkHeaderIcon from '../../../assets/images/icon-links-header.svg'
import rightIcon from '../../../../assets/images/icon-arrow-right.svg'
import './styles.scss'


const PreviewButton = ({platform}) => {



    if(platform === "") {
        return
    }
    let  platformIcons = {
        Github : {
            styles:  {backgroundColor :  "black"},
            icon: <GitIcon/>
        },
        GitLab : {
            styles:  {backgroundColor :  "#EB4925"},
            icon: <GitLabIcon/>
        },
        Youtube : {
            styles:  {backgroundColor :  "red"},
            icon: <YoutubeIcon/>
        },
        Facebook : {
            styles:  {backgroundColor :  "#2442AC"},
            icon: <FacebookIcon/>
        },
        Linkedin : {
            styles:  {backgroundColor :  "#2D68FF"},
            icon: <LinkedinIcon/>
        },
        Twitch : {
            styles:  {backgroundColor :  "#EE3FC8"},
            icon: <TwitchIcon/>
        },
        Hashnode : {
            styles:  {backgroundColor :  "#0330D1"},
            icon: <HashnodeIcon/>
        },
        CodeWars : {
            styles:  {backgroundColor :  "#8A1A50"},
            icon: <CodewarsIcon/>
        },
        freeCodeCamp : {
            styles : {backgroundColor: "#302267"},
            icon : <FreecodeIcon/>
        },
        ["Stack Overflow"] : {
            styles : {backgroundColor :  "#EC7100"},
            icon : <StackoverIcon/>
        },
        Twitter : {
            styles : {backgroundColor :  "#43B7E9"},
            icon : <TwitterIcon/>
        }


    }


    return (
        <a className="previewButtonContainer type__BodyM" href='https://example.org/' target="_blank" style={platformIcons[platform].styles} >
            <div className="platformSpan">
            <span className="me-2 loco">{platformIcons[platform].icon}</span>
            {platform}
            </div>
            <span><img src={rightIcon}/></span>
        </a>
    )

}


export default PreviewButton