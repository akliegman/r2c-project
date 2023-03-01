import "./Modal.css";
import { useState } from "react";
import close from "../assets/close.svg";
import trash from "../assets/trash.svg";
import folder from "../assets/folder.svg";

export const Modal = ({ activePhoto, setActivePhoto, photos, setPhotos }) => {
  const [albumDropdown, setAlbumDropdown] = useState(false);
  const deletePhoto = (id) => {
    let newPhotos = Object.entries(photos).reduce((acc, [key, value]) => {
      if (key === activePhoto.albumId.toString()) {
        acc[key] = value.filter((photo) => photo.id !== activePhoto.id);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    setPhotos(newPhotos);
    setActivePhoto(false);
  };

  const movePhoto = (id, targetAlbumId) => {
    let newPhotos = Object.entries(photos).reduce((acc, [key, value]) => {
      if (key === activePhoto.albumId.toString()) {
        acc[key] = value.filter((photo) => photo.id !== activePhoto.id);
      } else if (key === targetAlbumId.toString()) {
        acc[key] = [...value, activePhoto];
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    setPhotos(newPhotos);
    setActivePhoto(false);
  };

  return (
    <div className="Modal">
      <div className="Modal-overlay" />
      <button onClick={() => setActivePhoto(false)} className="Modal-close">
        <img alt="Close modal" src={close} />
      </button>
      <div className="Modal-content">
        <figure className="Modal-photo">
          <img src={activePhoto.url} alt={activePhoto.title} />
          <div className="Modal-photo-toolbar">
            <figcaption>{activePhoto.title}</figcaption>
            <button
              onClick={() => setAlbumDropdown(true)}
              className="Modal-move"
            >
              <img alt="Move photo" src={folder} />
            </button>
            {albumDropdown && (
              <div className="Modal-album-dropdown">
                <select
                  value=""
                  onChange={(event) =>
                    movePhoto(activePhoto.id, event.target.value)
                  }
                >
                  <option value="" disabled>
                    -- Select album to move to --
                  </option>
                  {Object.keys(photos)
                    .filter(
                      (albumId) => albumId !== activePhoto.albumId.toString()
                    )
                    .map((album) => (
                      <option value={album} key={album}>
                        Album {album}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <button
              onClick={() => deletePhoto(activePhoto.id)}
              className="Modal-delete"
            >
              <img alt="Delete photo" src={trash} />
            </button>
          </div>
        </figure>
      </div>
    </div>
  );
};
