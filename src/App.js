import React, { useState } from 'react'

import img1 from './images/image-1.webp';
import img2 from './images/image-2.webp';
import img3 from './images/image-3.webp';
import img4 from './images/image-4.webp';
import img5 from './images/image-5.webp';
import img6 from './images/image-6.webp';
import img7 from './images/image-7.webp';
import img8 from './images/image-8.webp';
import img9 from './images/image-9.webp';
import img10 from './images/image-10.jpeg';
import img11 from './images/image-11.jpeg';

import CloseIcon from '@mui/icons-material/Close';
import { AiOutlineCamera } from "react-icons/ai";



export default function App() {

    const [images, setImages] = useState([
        { id: 'image1', src: img1 },
        { id: 'image2', src: img2},
        { id: 'image3', src: img3 },
        { id: 'image4', src: img4 },
        { id: 'image5', src: img5 },
        { id: 'image6', src: img6 },
        { id: 'image7', src: img7 },
        { id: 'image8', src: img8 },
        { id: 'image9', src: img9 },
        { id: 'image10', src: img10},
        { id: 'image11', src: img11},
      ]);




    // To view the images 
    const [model,setModel] =useState(false);
    const [tempimgSrc, setTempSrc] =useState('');
    const getImg =(src)=>{
        setTempSrc(src);
        setModel(true);
        
        // setCount (count+1);

    }

    // Hover to show checkbox
    const [isHovered, setIsHovered] = useState(false);
      
        const handleMouseEnter = (imagSrc) => {
          setIsHovered(imagSrc);
        };
      
        const handleMouseLeave = () => {
          setIsHovered(false);
        };



// count the checked images
    const [count,setCount] =useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

        const handle = ()=>{

                if (!isChecked) {
                    setCount(count + 1);
                    setIsChecked(false);

                }    
            
        }


        // delete images

        const deleteSelectedImages = () => {
            const updatedImages = images.filter((item) => !selectedImages.includes(item.src));
            setImages(updatedImages);
            setCount(0); // Reset the count
            setSelectedImages([]); // Clear selected images
          };


       
// For drag and drop images
        const handleDragStart = (e, index) => {
            e.dataTransfer.setData('index', index);
          };
        
          const handleDrop = (e, dropIndex) => {
            e.preventDefault();
            const dragIndex = e.dataTransfer.getData('index');
            const newImages = [...images];
            const [draggedImage] = newImages.splice(dragIndex, 1);
            newImages.splice(dropIndex, 0, draggedImage);
            setImages(newImages);
          };
        
          const allowDrop = (e) => {
            e.preventDefault();
          };


// For add new images
        //   const onSelectFile =(e)=>{
        //     const selectedFiles = e.target.files;
        //     const selectedFilesArray =Array.form(selectedFiles);

        //     const imageArray =selectedFilesArray.map(file) =>{
        //         return URL.createObjectURL(file);
        //     }

        //     setModel(imageArray);

        // }


  return (
    <>

    


        
       {/* image div */}
        <div className='main-container'>

            <div className='top-con'>
                <h1><b>Gallery</b></h1>

                <div className='hidden'>
                <h3><i>{count} Files Selected</i></h3>
                <button onClick={deleteSelectedImages}>Delete Images</button>
                </div>
                
            </div>
            

            <div className={model? "model open":"model"}>
                <img src={tempimgSrc} alt="" />
                <CloseIcon onClick={()=>setModel(false)}/>
            </div>

           

            <div className='body-container'>

                {images.map((item,index)=>{
                    return(
                        
                        

                        <div key={index} className={`image ${index=== 0? 'item1': ''}`}  
                        onMouseEnter={()=> handleMouseEnter(item.src)}
                        onMouseLeave={handleMouseLeave}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => allowDrop(e)}
                        onDrop={(e) => handleDrop(e, index)}
                        >
            
                            <img src={item.src} alt="" className={isHovered === item.src ? "image-hoverd" :""}/>
                            

                            {isHovered === item.src && (
                                
                                <div className="overlay" >
                                <input type="checkbox" className='check' 
                                onClick={()=> handle(item.src)} 
                                />

                                <button onClick={()=>getImg(item.src)}>View Images</button>
                                
                                </div>
                            )}

        
                        </div>

                        
                    )
                })}

                {/* add new images */}
                   <div className='imageAdd'>
                        <AiOutlineCamera></AiOutlineCamera>
                            
                            <input type="file"  name='addImg'  multiple accept='image/png ,image/jpg ,image/webp' />

                     </div>

            </div>


        </div>
        {/* image div ends */}
      


{/* // main div ends */}

    </>
 
  )
}

