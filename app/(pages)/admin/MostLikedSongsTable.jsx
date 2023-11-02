const MostLikedSongsTable = ({ data }) => {
    return (
      <table className="table-auto border w-80 text-left">
        <tbody>
          <tr className="text-white">
            <th className="border">Name</th>
            <th className="border">Track ID</th>
            <th className="border">Artist</th>
            <th>Likes</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id} className="border">
              <td className="border">{item.track_name}</td>
              <td className="border">{item.track_id}</td>
              <td className="border">{item.artist_name}</td>
              <td>{item.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default MostLikedSongsTable;