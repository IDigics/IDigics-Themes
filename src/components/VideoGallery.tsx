import React from "react";

interface VideoGalleryProps {
  videos: { src: string; title?: string }[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {videos.map((video, i) => (
      <div key={i} className="flex flex-col items-center">
        <video controls className="rounded shadow w-full h-40">
          <source src={video.src} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        {video.title && <div className="mt-2 text-sm text-gray-700">{video.title}</div>}
      </div>
    ))}
  </div>
);

export default VideoGallery;
