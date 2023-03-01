import "./PhotoAlbum.css";

export const PhotoAlbum = ({ activeAlbum, activePhotos }) => {
  return (
    <div className="PhotoAlbum">
      <h1 className="PhotoAlbum-title">Album {activeAlbum}</h1>
      <div className="PhotoAlbum-photos">
        {activePhotos.map((photo) => (
          <button className="PhotoAlbum-photo">
            <figure>
              <img src={photo.thumbnailUrl} alt={photo.title} key={photo.id} />
              <figcaption>{photo.title}</figcaption>
            </figure>
          </button>
        ))}
      </div>
    </div>
  );
};
