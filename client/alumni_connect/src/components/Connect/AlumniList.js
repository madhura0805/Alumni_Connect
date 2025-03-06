import AlumniCard from "./alumniCard";

const AlumniList = ({ studentId, alumniList }) => {
  return (
    <div>
      <h2>Alumni List</h2>
      {alumniList.map((alumni) => (
        <AlumniCard key={alumni._id} studentId={studentId} alumni={alumni} />
      ))}
    </div>
  );
};

export default AlumniList;
