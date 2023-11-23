const PopularTracksTable = ({ data }) => {

  const genres = {1:'Hip Hop',2:'Pop',3:'Country',4:'Rock',5:'Indie',
  6:'R&B',7:'Jazz',8:'Metal',9:'Classical',10:'Punk'};
  
    return (
      <table className="table-auto w-5/6 text-left">
        <tbody>
          <tr className="text-white">
            <th className="border-slate-400">Name</th>
            <th className="border-slate-400">Artist</th>
            <th className="border-slate-400">Email</th>
            <th className="border-slate-400">Genre</th>
            <th className="border-slate-400">Streams</th>
            <th className="border-slate-400">Release Date</th>
            <th>Likes</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id} className="border">
              <td className="border border-slate-500">{item.track_name}</td>
              <td className="border border-slate-500">{item.artist_name}</td>
              <td className="border border-slate-500">{item.artist_email}</td>
              <td className="border border-slate-500">{genres[String(item.genre_id)]}</td>
              <td className="border border-slate-500">{item.streams}</td>
              <td className="border border-slate-500">{item.created_at.substring(0,10)}</td>
              <td className="border border-slate-500">{item.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default PopularTracksTable;