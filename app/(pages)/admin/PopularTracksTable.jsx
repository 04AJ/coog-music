const PopularTracksTable = ({ data }) => {

  const genres = {1:'Hip Hop',2:'Pop',3:'Country',4:'Rock',5:'Indie',
  6:'R&B',7:'Jazz',8:'Metal',9:'Classical',10:'Punk'};
  
    return (
      <table className="table-auto border w-80 text-left">
        <tbody>
          <tr className="text-white">
            <th className="border">Name</th>
            <th className="border">Artist</th>
            <th className="border">Genre</th>
            <th>Likes</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id} className="border">
              <td className="border">{item.track_name}</td>
              <td className="border">{item.artist_name}</td>
              <td className="border">{genres[String(item.genre_id)]}</td>
              <td>{item.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default PopularTracksTable;