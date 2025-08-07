import React from "react";

interface PhotoGalleryProps {
  photos: { src: string; alt?: string }[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {photos.map((photo, i) => (
      <img
        key={i}
        src={photo.src}
        alt={photo.alt || `Photo ${i + 1}`}
        className="rounded shadow object-cover w-full h-32 sm:h-40"
      />
    ))}
  </div>
);

export default PhotoGallery;
