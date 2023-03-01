import "./PhotoAlbum.css";

export const PhotoAlbum = ({ activeAlbum, activePhotos, setActivePhoto }) => {
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
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <figcaption>{photo.title}</figcaption>
            </figure>
          </button>
        ))}
      </div>
    </div>
  );
};
