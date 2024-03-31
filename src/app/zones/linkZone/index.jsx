"use client"
import {  useState } from "react";
//import { useClient } from 'next/data-client';
import _ from 'lodash'
import phoneFrame from '../../../assets/images/illustration-phone-mockup.svg'
import CTA from "../../components/cta";
import illustration from '../../../assets/images/illustration-empty.svg'
import Link from "../../components/Link";
///import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {DndContext, closestCorners} from '@dnd-kit/core';
import {SortableContext, Sor, verticalListSortingStrategy, useSortable, arrayMove} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import './styles.scss'
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
    restrictToFirstScrollableAncestor
  } from '@dnd-kit/modifiers';
import PreviewButton from "../../components/Link/previewButton";
import Nav from "../../components/Nav";
import {ReactComponent as UploadIcon} from '../../../assets/images/icon-upload-image.svg'
import  classNames  from "classnames";



const Column = ({tasks, handleDelete, handlePlatformSelect, handleLinkChange}) => {


    //const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})
   // console.log(tasks)
  
    const display = tasks.map((item, index) => {
  
      //return <Task key={item.id} id={item.id} title={item.title}/>
        return (<Link 
            key={item.id} 
            id={item.id} 
            index={index} 
            title={item.title} 
            handledelete={() => handleDelete(index)}
            handlePlatformSelect={handlePlatformSelect}
            handleLinkChange={handleLinkChange}
            platform={item.platform}
            url={item.link}
            
            />)
     
    })
  
    return (<div  className="">
  
      <SortableContext  items={tasks} strategy={verticalListSortingStrategy}>
          <div className="sit">
      {display}
      </div>
        </SortableContext>
       
      
      </div>)
  }


  
const LinkZone = () => {


    
    const [links, setLinks] = useState([])
    const [count, setCount] = useState(1)
    const [showLinks, setShowLinks] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const [userData, setUserData] = useState({firstName : "", lastName : "", email: ""})
    const [uploadedImage, setUploadedImage] = useState(null);
    //i'm thinking of using links as the source of truth
    //and using a a copy as so when i do a comparsion to find a difference
    //then the save button is allowed
    //i don't want the user to being able to spam the save button making a lot of calls to
    //database

    console.log(links)


    // useEffect(() => {


    // }, [links])

    const handleFirstName = (e) => {

        const copy = {...userData}

        copy.firstName = e.target.value

        setUserData(copy)

    }

    const handleLastName = (e) => {
      const copy = {...userData}

      copy.lastName = e.target.value

      setUserData(copy)
      
    }


    const handleEmail = (e) => {

      const copy = {...userData}

      copy.email = e.target.value

      setUserData(copy)
    }

    const handleShowLinks = () => {

      setShowLinks(true)
      setShowProfile(false)
      console.log("show Links")

    }


    const handleShowProfile = () => {

      setShowLinks(false)
      setShowProfile(true)
      console.log("show profile")

    }

    const handleUpload = (e) => {

      const file = e.target.files[0]; // Get the uploaded file

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                setUploadedImage(event.target.result); // Set the uploaded image to state
            };

            reader.readAsDataURL(file); // Read the image file as a data URL
        }

    }

    const handleAdd = () => {

        let newLink = {
            id: count, 
            
            platform : {value : "", valid : true}, 
            link : {value: "", valid : true, validUrl : true } , 
    }

        setLinks([...links, newLink])
        setCount(prev => prev +1)
    }

    const handlePlatformSelect = (index, selectedOption) => {
        const copy = [...links]

        console.log("mar")
        console.log(selectedOption)
        copy[index].platform.value = selectedOption.value

        console.log(copy)

        setLinks(links)
    }


    const handleDelete = (index) => {

        const filter = _.filter(links, (x, i) => {

            return index !== i
        })


        setLinks(filter)

    }

    const handleLinkChange = (index, e) => {

        let copy = [...links]

        copy[index].link.value = e.target.value

        setLinks(copy)
    }


  const getTaskPos = id => links.findIndex(item => item.id  === id)


  const handleDragEnd = (e) => {

  
   
    const {active, over} = e

    if(active.id === over.id) return


    setLinks(tasks => {
      const orginalPos = getTaskPos(active.id)

      const newPos = getTaskPos(over.id)


      return arrayMove(tasks, orginalPos, newPos)
    })
  }



  const displayPreviewList = _.map(links.slice(0, 6), (item) => {

    return <PreviewButton platform={item.platform.value}/>
  })
  

  const handleSave = (index) => {

    let copy = [...links]


    copy.forEach((item)  => {
        if(item.link.value === "" ){
            item.link.valid = false
        }else{
            item.link.valid = true
        }

        //you have to be careful of it beening case sensitive
        //and it fails if they put something after the .com
    //const regex = new RegExp(`^https://www.${item.platform.value}\.com$`);
    const regex = new RegExp(`^https?:\/\/(?:www\.)?${item.platform.value.replace(/\./g, '\\.')}\/?`, 'i')
  //return regex.test(url);
  
        if(!regex.test(item.link.value)){
            item.link.validUrl = false
            console.log("i should change to false")

        }else{
            item.link.validUrl = true
            console.log("I should change to true")
        }

    })





    setLinks(copy)

  }


    const LinkSection  = () => {
      //const client = useClient();

      return (
        <>
         <h1>Customize your Links</h1>
                    <p>Add/edit/remove links below and then share all your profiles with the world!</p>


                        <div className="mb-3">
                        <CTA text="+ Add new link" handleclick={handleAdd}/>
                        </div>
                     


                    {_.isEmpty(links) ?
                    (
                     <div className="getStartedDetail bg-grey">

                        <img src={illustration}/>
                        <div>
                            <h2>Let's get you started</h2>
                            <p>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                        </div>
                       
                     </div> )
                        :
                        (
                            <div>

                            <DndContext 
                            onDragEnd={handleDragEnd} 
                            collisionDetection={closestCorners}
                             modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}>

                          
                        <Column 
                        tasks={links} 
                        handleDelete={handleDelete} 
                        handleLinkChange={handleLinkChange}
                        handlePlatformSelect={handlePlatformSelect}/>
                        </DndContext>
                        <div>

                       <CTA handleclick={handleSave} text="SAVE"/>
                            </div>
                        
                      </div>
                        )
                    }

        </>
      )
    }


    const ProfileSection = () => {



      return (
        <>
          <h1>Profile Details</h1>
          <p>Add your details to create a personal touch to your profile</p>

          <div className="profileContainer">
          <div className="d-flex">
            <p>Profile picture</p>

            {/* take a note of this for future reference */}
          
            <label for="upload-input" class="upload">
               {uploadedImage && 
               <div>
               <img className="" src={uploadedImage} alt="Uploaded" /> 
               <div className="uploadOverlay"></div>
               </div>
              }

               <div className={classNames('profilePic', uploadedImage && 'imgActive')}>
               <UploadIcon/>
               <p className={classNames(!uploadedImage &&'text-darkpurple')} >+Upload Image</p>
               </div>
               </label>

            <input 
            id="upload-input" 
            className="upload d-none" 
            type="file" 
            name="+Upload Image" 
            accept="image/jpeg, image/png"
            multiple={false}
            onChange={handleUpload}
            />

            <div>
            <p>Image must be below 1024x1024ox</p>
            <p>Use PNG orJPG format.</p>

            </div>
            </div>
            


          </div>

          <div className="profileContainer">
              <div className="d-flex justify-content-between">
                <p>First name*</p>
                <input onChange={handleFirstName} className="profileInput" type="text"/>
              </div>

              <div className="d-flex justify-content-between">
                <p>Last name*</p>
                <input onChange={handleLastName} className="profileInput" type="text"/>
              </div>

              <div className="d-flex justify-content-between">
                <p>Email</p>
                <input onChange={handleEmail} className="profileInput" type="text"/>
              </div>
              

          </div>
        </>
      )
    }
  

    return (
        <div className="container">

          <div>
            <Nav  
            handleShowLinks={handleShowLinks} 
             handleShowProfile={handleShowProfile} 
             showLinks={showLinks} 
             showProfile={showProfile}/>
          </div>
            <div className="row">
                <div className="col-lg-6 test">

                    <img src={phoneFrame}/>

                    {/* <image src={phoneFrame}> */}

                    <div className="previewList">
                    {displayPreviewList}
                    </div>
                    
                    {/* </image> */}

                    {/* <p>lol</p> */}
                   

                </div>

                <div className="col-lg-6 ">


                  {showLinks ? 
                  <LinkSection/>

                  :

                  <ProfileSection/>
                
                }
                  
               
                   
                </div>
                
                


            </div>

        </div>
    )
}


export default LinkZone