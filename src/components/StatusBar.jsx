import "./StatusBar.css";
import PropTypes from "prop-types";

export const StatusBar = ({ activePhotosLength }) => {
  return (
    <div className="StatusBar">
      <p className="StatusBar-text">{activePhotosLength} photos</p>
      {/* TODO: Make last updated time dynamic */}
      <p className="StatusBar-text">Last updated 3 days ago</p>
    </div>
  );
};

StatusBar.propTypes = {
  activePhotosLength: PropTypes.number,
};
