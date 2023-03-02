import { Header } from "./Header";
import { User } from "./User";
import { useState } from "react";
import clsx from "clsx";
import menu from "../assets/menu.svg";
import "./Sidebar.css";
import PropTypes from "prop-types";

export const Sidebar = ({ albumNames, activeAlbum, setActiveAlbum }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="Sidebar">
      <Header />

      {/* TODO: Refactor and clean up the mobile menu code. */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="Sidebar-menu">
        <img src={menu} alt="menu" />
      </button>
      <div
        className={clsx("Sidebar-albums", menuOpen && "Sidebar-albums--open")}
      >
        {albumNames.map((name) => (
          <button
            className={clsx(
              "Sidebar-album",
              name === activeAlbum && "Sidebar-album--active"
            )}
            key={name}
            onClick={() => {
              setActiveAlbum(name);
              setMenuOpen(false);
            }}
          >
            Album {name}
          </button>
        ))}
      </div>
      <User />
    </div>
  );
};

Sidebar.propTypes = {
  albumNames: PropTypes.array,
  activeAlbum: PropTypes.string,
  setActiveAlbum: PropTypes.func,
};
