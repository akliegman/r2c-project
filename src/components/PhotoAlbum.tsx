import React from "react";
import "./PhotoAlbum.css";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoAlbumProps {
  activeAlbum: string;
  activePhotos: Photo[] | undefined;
  setActivePhoto: React.Dispatch<React.SetStateAction<Photo | false>>;
}

export const PhotoAlbum: React.FC<PhotoAlbumProps> = ({
  activeAlbum,
  activePhotos,
  setActivePhoto,
}) => {
  return (
    <div className="PhotoAlbum">
      <h1 className="PhotoAlbum-title">Album {activeAlbum}</h1>
      <div className="PhotoAlbum-photos">
        {activePhotos?.map((photo) => (
          <button
            onClick={() => setActivePhoto(photo)}
            className="PhotoAlbum-photo"
            key={photo.id}
          >
            <figure>
              <img role="img" src={photo.thumbnailUrl} alt={photo.title} />
              <figcaption>{photo.title}</figcaption>
            </figure>
          </button>
        ))}
      </div>
    </div>
  );
};