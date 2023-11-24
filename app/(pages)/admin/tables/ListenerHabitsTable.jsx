const ListenerHabitsGenreTable = ({ data }) => {

    const genres = {1:'Hip Hop',2:'Pop',3:'Country',4:'Rock',5:'Indie',
    6:'R&B',7:'Jazz',8:'Metal',9:'Classical',10:'Punk'};
    
      return (
        <div>
            <h2>top genres</h2>
            <table className="table-auto w-full text-left">
              <tbody>
                <tr className="text-white">
                  <th className="">Genre</th>
                  <th>Likes</th>
                </tr>
                {data.map((item) => (
                  <tr key={item.id} className="border">
                    <td className="border border-slate-500">{item.genre_name}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      );
    };

    
const ListenerHabitsArtistTable = ({ data, gender, eth }) => {
  
  const gends = {"0":"all", "1":"male", "2":"female"};
    
        return (
        <div>
            <h2>top artists</h2>
            <table className="table-auto w-full text-left">
                <tbody>
                <tr className="text-white">
                    <th className="">Artist</th>
                    <th className="">Age</th>
                    <th className="">Ethnicity</th>
                    <th className="">Gender</th>
                    <th className="">Genre</th>
                    <th className="">Likes from Specified Users</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id} className="border">
                    <td className="border border-slate-500">{item.artist}</td>
                    <td className="border border-slate-500">{item.age}</td>
                    <td className="border border-slate-500">{item.ethn}</td>
                    <td className="border border-slate-500">{item.gender}</td>
                    <td className="border border-slate-500">{item.genre}</td>
                    <td className="border border-slate-500">{item.likes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        );
    };

export {ListenerHabitsGenreTable, ListenerHabitsArtistTable};
        