import "./StatusBar.css";

interface Props {
  activePhotosLength?: number;
}

export const StatusBar: React.FC<Props> = ({ activePhotosLength }) => {
  return (
    <div className="StatusBar">
      <p className="StatusBar-text">{activePhotosLength} photos</p>
      {/* TODO: Make last updated time dynamic */}
      <p className="StatusBar-text">Last updated 3 days ago</p>
    </div>
  );
};