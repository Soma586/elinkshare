import { useEffect, useState } from "react"
import './styles.scss'
import dragIcon from '../../../assets/images/icon-drag-and-drop.svg'
//import dragIco from '../../../assets/images/icon-drag-and-drop/svg'
import _ from 'lodash'

import gitIcon from '../../../assets/images/icon-github.svg'
import gitLabIcon from '../../../assets/images/icon-gitlab.svg'
import facebookIcon from '../../../assets/images/icon-facebook.svg'
import devtoIcon from '../../../assets/images/icon-devto.svg'
import linkedinIcon from '../../../assets/images/icon-linkedin.svg'
import stackoverIcon from '../../../assets/images/icon-stack-overflow.svg'
import twitchIcon from '../../../assets/images/icon-twitch.svg'
import twitterIcon from '../../../assets/images/icon-twitter.svg'
import youtubeIcon from '../../../assets/images/icon-youtube.svg'
import freecodeIcon from '../../../assets/images/icon-freecodecamp.svg'
import codepenIcon from '../../../assets/images/icon-codepen.svg'
import codewarsIcon from '../../../assets/images/icon-codewars.svg'
import hashnodeIcon from '../../../assets/images/icon-hashnode.svg'
import linkHeaderIcon from '../../../assets/images/icon-links-header.svg'
import {SortableContext, Sor, verticalListSortingStrategy, useSortable, arrayMove} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import Select from "react-select"
const Link = (props) => {



    const  {
        handledelete, 
        index, 
        id, 
        title, 
        handlePlatformSelect, 
        platform, 
        url,
        handleLinkChange
    } = props

   // console.log(`this is an id ${id}`)
    //console.log(url)
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
      transform : CSS.Transform.toString(transform),
      transition 
    }
    const media = [
        {
            name: 'Github',
            icon: gitIcon,
            placeholder: "https://github.com/Soma586"
        },
        {
            name: 'Twitter',
            icon: twitterIcon,
            placeholder: "https://twitter.com/home"
        },
        {
            name: 'Linkedin',
            icon: linkedinIcon,
            placeholder: "https://www.linkedin.com/in/tarikm35/"
        },
        {
            name: 'Youtube',
            icon: youtubeIcon,
            placeholder: "https://www.youtube.com/"
        },
        {
            name: 'Facebook',
            icon: facebookIcon,
            placeholder: "https://www.facebook.com/"
        },
        {
            name: 'Twitch',
            icon: twitchIcon,
            placeholder: "https://www.twitch.com/"
        },
        {
            name: 'Dev.to',
            icon: devtoIcon,
            placeholder: "https://www.linkedin.com/in/tarikm35/"
        },
        {
            name: 'CodeWars',
            icon: codewarsIcon,
            placeholder: "https://www.codewars.com/"
        },
        {
            name: 'Codepen',
            icon: codepenIcon,
            placeholder: "https://www.codepen.com/"
        },
        {
            name: "freeCodeCamp",
            icon: freecodeIcon,
            placeholder: "https://www.linkedin.com/"
        },
        {
            name: "GitLab",
            icon: gitLabIcon,
            placeholder: "https://www.gitlab.com/"
        },
        {
            name: 'Hashnode',
            icon: hashnodeIcon,
            placeholder: "https://www.hashnode.com/"
        },
        {
            name: "Stack Overflow",
            icon: stackoverIcon,
            placeholder: "https://www.stackoverflow.com/"
        }
    ]
    //console.log(media)

    // useEffect(() => {
        
    // }, [platform.value])



    const options = _.map(media, (data) => {

        return {
            value: data.name,
            label: (<> <img src={data.icon}/> <span className="ms-2">{data.name}</span> </>)
        }
    })




    const optionIndex = _.findIndex(media, (item) => item.name === platform.value )
//console.log(` optionIndex ${optionIndex}`)
    //console.log(`this is a ${optionIndex}`)
      //you were trying to get the value to show
      //you know for when the user already has a list it should display the value
      //i should be able to use platform.valid to make the border red or not when the item is saved
      const MyComponent = () => (
        <Select options={options}
        onChange={(selectedOption) => handlePlatformSelect(index,selectedOption )}
        value={options[optionIndex]}
        />
      )
        //console.log("NARuto")
        //console.log(media[optionIndex].placeholder)
return (
    <div ref={setNodeRef}   style={style}>
    <div className='linkContainer bg-lightgrey' >

<div className="mb-2 d-flex justify-content-between">
    <div>
    <img {...attributes} {...listeners}  src={dragIcon}/>   <span className="ms-2">Link #{id}</span>
    </div>

    <div onClick={handledelete}>
        <span>Remove</span>
    </div>

</div>

        <label> Platform</label>
        <MyComponent/>

        <label>Link</label>
        <div>
            <img src={linkHeaderIcon}/>
        <input  
        style={{border : !url.valid && "1px solid red"}}  
        onChange={(e) => handleLinkChange(index, e)} 
        type="text"
        placeholder={ `eg ${media[1].placeholder}`}
        />
        {!url.validUrl && 
            <span style ={{color : 'red'}}> Please Check the Url</span>
        }
        </div>
        
    </div>
    </div>
    
)

}

export default Link