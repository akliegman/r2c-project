import "./App.css";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getPhotos } from "./api/photosApi";
import { Sidebar } from "./components/Sidebar";
import { PhotoAlbum } from "./components/PhotoAlbum";
import { StatusBar } from "./components/StatusBar";
import { Modal } from "./components/Modal";

export default function App() {
  // useLocalStorage hook to store photos in local storage
  const [photos, setPhotos] = useLocalStorage("photos", false);
  const [activeAlbum, setActiveAlbum] = useLocalStorage("activeAlbum", false);
  const [activePhoto, setActivePhoto] = useState(false);

  useEffect(() => {
    // if photos is empty, get photos from API
    if (!photos) {
      getPhotos().then((data) => {
        setPhotos(data);
      });
    }

    // if activeAlbum is false, set activeAlbum to first tag in photos
    if (!activeAlbum) {
      setActiveAlbum(Object.keys(photos)[0]);
    }
  }, [photos]);

  return (
    <div className="App">
      {photos ? (
        <>
          <Sidebar
            albumNames={Object.keys(photos)}
            activeAlbum={activeAlbum}
            setActiveAlbum={setActiveAlbum}
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
        <Modal
          activePhoto={activePhoto}
          setActivePhoto={setActivePhoto}
          photos={photos}
          setPhotos={setPhotos}
        />
      )}
    </div>
  );
}
