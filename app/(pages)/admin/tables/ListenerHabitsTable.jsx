const ListenerHabitsGenreTable = ({ data }) => {

    const genres = {1:'Hip Hop',2:'Pop',3:'Country',4:'Rock',5:'Indie',
    6:'R&B',7:'Jazz',8:'Metal',9:'Classical',10:'Punk'};
    
      return (
        <div>
            <h2>top genres</h2>
            <table className="table-auto border w-auto text-left">
              <tbody>
                <tr className="text-white">
                  <th className="border">Genre</th>
                  <th>Likes</th>
                </tr>
                {data.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border">{item.genre_name}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      );
    };

    
const ListenerHabitsArtistTable = ({ data }) => {
    
        return (
        <div>
            <h2>top artists</h2>
            <table className="table-auto border w-auto text-left">
                <tbody>
                <tr className="text-white">
                    <th className="border">Artist</th>
                    <th className="border">Age</th>
                    <th className="border">Ethnicity</th>
                    <th className="border">Gender</th>
                    <th className="border">Genre</th>
                    <th className="border">Likes from Specified Users</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id} className="border">
                    <td className="border">{item.artist}</td>
                    <td className="border">{item.age}</td>
                    <td className="border">{item.ethn}</td>
                    <td className="border">{item.gender}</td>
                    <td className="border">{item.genre}</td>
                    <td className="border">{item.likes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        );
    };

export {ListenerHabitsGenreTable, ListenerHabitsArtistTable};
        