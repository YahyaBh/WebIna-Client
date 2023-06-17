import React, { useEffect, useState } from 'react'
import './ImageComponent.scss'

const ImageComponent = ({ src, alt }) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();

        img.onLoad = () => {
            setImageLoaded(true);
        }
        img.src = src;
    }, [src])

    return (
        <>
            {!imageLoaded &&
                (<img className='loading-image' src='local' alt=''/>)
            }
            {imageLoaded && (<img src={src} alt={alt} />)}
        </>
    )
}

export default ImageComponent