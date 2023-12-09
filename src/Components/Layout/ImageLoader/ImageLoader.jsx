import React, { useState } from 'react';
import './ImageLoader.scss'; // Import the CSS file for styling

const ImageLoader = ({ imageUrls }) => {
    const [loadedImages, setLoadedImages] = useState([]);

    // Function to be called when an image is successfully loaded
    const onImageLoad = (index) => {
        // Update state to indicate that the image at the given index has been loaded
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };

    // Function to be called if there is an error loading an image
    const onImageError = (index) => {
        // You can handle the error here, for example, by logging an error message
        console.error(`Error loading image at index ${index}`);
    };

    return (
        <div className="image-loader-container">
            {imageUrls.map((imageUrl, index) => (
                <div key={index} className="image-loader-item">
                    {/* Skeleton loading effect */}
                    {!loadedImages.includes(index) && <div className="skeleton-loader"></div>}

                    {/* Loaded image for each image (visible if the image is successfully loaded) */}
                    <img
                        src={imageUrl}
                        alt={`Loaded ${index}`}
                        style={{ display: loadedImages.includes(index) ? 'inline-block' : 'none' }}
                        onLoad={() => onImageLoad(index)}
                        onError={() => onImageError(index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageLoader;
