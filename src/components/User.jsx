import "./User.css";
import avatar from "../assets/avatar.png";
import chevronRight from "../assets/chevron-right.svg";

export const User = () => {
  return (
    <div className="User">
      {/* TODO: turn div into button */}
      <div className="User-button">
        <img
          className="User-avatar"
          src={avatar}
          alt="Rosemary Harper"
          height="38"
          width="38"
        />
        <div className="User-info">
          <p className="User-name">Rosemary Harper</p>
          <p className="User-email">rosemary@wayfarer.com</p>
        </div>
        <img
          className="User-chevron"
          src={chevronRight}
          width="18"
          height="18"
          alt=""
        />
      </div>
    </div>
  );
};
