import "./App.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getPhotos } from "./api/photosApi";
import { Sidebar } from "./components/Sidebar";
import { PhotoAlbum } from "./components/PhotoAlbum";
import { StatusBar } from "./components/StatusBar";
import { Modal } from "./components/Modal";
import { Photo } from "./types";

interface AppProps {
  photos: { [key: string]: Photo[] };
  setPhotos: (photos: { [key: string]: Photo[] }) => void;
  activeAlbum: string;
  setActiveAlbum: (activeAlbum: string) => void;
  initialActivePhoto: Photo | null;
}

export default function App({
  photos: initialPhotos,
  setPhotos,
  activeAlbum: initialActiveAlbum,
  setActiveAlbum,
  initialActivePhoto,
}: AppProps) {
  // useLocalStorage hook to store photos in local storage
  const [photos, setLocalStoragePhotos] = useLocalStorage(
    "photos",
    initialPhotos
  );
  const [activeAlbum, setLocalStorageActiveAlbum] = useLocalStorage(
    "activeAlbum",
    initialActiveAlbum
  );
  const [activePhoto, setActivePhoto] = useState<Photo | null>(
    initialActivePhoto
  );

  useEffect(() => {
    // if photos is empty, get photos from API
    if (!photos) {
      getPhotos().then((data) => {
        setLocalStoragePhotos(data);
      });
    }

    // if activeAlbum is false, set activeAlbum to first tag in photos
    if (!activeAlbum && photos) {
      setLocalStorageActiveAlbum(Object.keys(photos)[0]);
    }
  }, [activeAlbum, photos, setLocalStorageActiveAlbum, setLocalStoragePhotos]);

  return (
    <div className="App">
      {photos ? (
        <>
          <Sidebar
            albumNames={Object.keys(photos)}
            activeAlbum={activeAlbum}
            setActiveAlbum={setLocalStorageActiveAlbum}
          />
          <div className="App-content">
            <PhotoAlbum
              activeAlbum={activeAlbum}
              activePhotos={photos[activeAlbum]}
              setActivePhoto={setActivePhoto}
            />
            <StatusBar activePhotosLength={photos[activeAlbum]?.length} />
          </div>
        </>
      ) : (
        // TODO: Add loading spinner
        "Loading..."
      )}
      {activePhoto && (
        // TODO: animate modal transitions
        <Modal
          activePhoto={activePhoto}
          setActivePhoto={setActivePhoto}
          photos={photos}
        />
      )}
    </div>
  );
}
