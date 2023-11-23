const ArtistSearchTable = ({ data }) => {
    return (
      <table className="table-auto border w-96 text-left">
        <tbody>
          <tr className="text-white">
            <th className="border">Name</th>
            <th className="border">Artist ID</th>
            <th className="border">Followers</th>
            <th className="border">Email</th>
          </tr>
          {data.map((item) => (
            
            <tr key={item.id} className="border">
              <td className="border">{item.artist_name}</td>
              <td className="border">{item.artist_id}</td>
              <td className="border">{item.followers}</td>
              <td className="border">{item.artist_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ArtistSearchTable;