const ArtistSearchTable = ({ data }) => {
    return (
      <table className="table-auto border w-80 text-left">
        <tbody>
          <tr className="text-white">
            <th className="border">Name</th>
            <th>Artist ID</th>
          </tr>
          {data.map((item) => (
            
            <tr key={item.id} className="border">
              <td className="border">{item.artist_name}</td>
              <td>{item.artist_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ArtistSearchTable;