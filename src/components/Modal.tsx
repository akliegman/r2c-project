import "./Modal.css";
import { useState } from "react";
import close from "../assets/close.svg";
import trash from "../assets/trash.svg";
import folder from "../assets/folder.svg";
import { Photo } from "../types";

interface ModalProps {
  activePhoto: Photo | false;
  setActivePhoto: React.Dispatch<React.SetStateAction<Photo | false>>;
  photos: Record<string, Photo[]>;
  setPhotos: React.Dispatch<React.SetStateAction<Record<string, Photo[]>>>;
}

export const Modal: React.FC<ModalProps> = ({
  activePhoto,
  setActivePhoto,
  photos,
  setPhotos,
}) => {
  const [albumDropdown, setAlbumDropdown] = useState(false);

  const deletePhoto = (id: number): void => {
    let newPhotos: Record<string, Photo[]> = Object.entries(photos).reduce(
      (acc, [key, value]) => {
        if (key === activePhoto?.albumId.toString()) {
          acc[key] = value.filter((photo) => photo.id !== activePhoto.id);
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    setPhotos(newPhotos);
    setActivePhoto(false);
  };

  const movePhoto = (id: number, targetAlbumId: number) => {
    let newPhotos: Record<string, Photo[]> = Object.entries(photos).reduce(
      (acc, [key, value]) => {
        if (key === activePhoto?.albumId.toString()) {
          acc[key] = value.filter((photo) => photo.id !== activePhoto.id);
        } else if (key === targetAlbumId.toString()) {
          acc[key] = [...value, activePhoto];
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    setPhotos(newPhotos);
    setActivePhoto(false);
  };

  return (
    <>
      <div className="Modal-overlay" />

      <div className="Modal" role="dialog">
        <button
          aria-label="Close"
          onClick={() => setActivePhoto(false)}
          className="Modal-close"
        >
          <img alt="Close button" src={close} />
        </button>
        <div className="Modal-content">
          <figure className="Modal-photo">
            <img src={activePhoto?.url} alt={activePhoto?.title} />
            {activePhoto && (
              <div className="Modal-photo-toolbar">
                <figcaption>{activePhoto.title}</figcaption>
                <div className="Modal-photo-toolbar-actions">
                  <button
                    onClick={() => setAlbumDropdown(!albumDropdown)}
                    className="Modal-move"
                    aria-label="Move"
                  >
                    <img alt="Move photo" src={folder} />
                  </button>
                  {albumDropdown && (
                    <div className="Modal-album-dropdown">
                      <p>Select album to move to:</p>
                      <ul role="listbox">
                        {Object.keys(photos)
                          .filter(
                            (albumId) =>
                              albumId !== activePhoto.albumId.toString()
                          )
                          .map((album) => (
                            <li
                              onClick={(event) =>
                                movePhoto(
                                  activePhoto.id,
                                  parseInt(event.target.value)
                                )
                              }
                              key={album}
                              value={album}
                            >
                              Album {album}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={() => deletePhoto(activePhoto.id)}
                    className="Modal-delete"
                    aria-label="Delete"
                  >
                    <img alt="Delete photo" src={trash} />
                  </button>
                </div>
              </div>
            )}
          </figure>
        </div>
      </div>
    </>
  );
};
