import { useNavigate } from "react-router-dom";

const AlumniCard = ({ studentId, alumni }) => {
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate(`/chat/${studentId}/${alumni._id}`);
  };

  return (
    <div className="alumni-card">
      <h3>{alumni.name}</h3>
      <p>{alumni.jobTitle}</p>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
};
export default AlumniCard;