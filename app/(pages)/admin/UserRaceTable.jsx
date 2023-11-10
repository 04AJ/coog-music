const UserRaceTable = ({ data }) => {
    return (
      <table className="table-auto border w-80 text-left">
        <tbody>
          <tr className="text-white">
            <th className="border">Race</th>
            <th className="border">Count</th>
            <th>%</th>
          </tr>
          {data.map((item) => (
            
            <tr key={item.id} className="border">
              <td className="border">{item.race_name}</td>
              <td className="border">{item.Total}</td>
              <td>{item.PERCENT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserRaceTable;