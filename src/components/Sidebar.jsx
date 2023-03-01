import { Header } from "./Header";
import { User } from "./User";
import clsx from "clsx";
import "./Sidebar.css";

export const Sidebar = ({ albumNames, activeAlbum, setActiveAlbum }) => {
  return (
    <div className="Sidebar">
      <Header />
      <div className="Sidebar-albums">
        {albumNames.map((name) => (
          <button
            className={clsx(
              "Sidebar-album",
              name == activeAlbum && "Sidebar-album--active"
            )}
            key={name}
            onClick={() => setActiveAlbum(name)}
          >
            Album {name}
          </button>
        ))}
      </div>
      <User />
    </div>
  );
};
