const UserRaceTable = ({ data }) => {
    return (
      <table className="table-auto w-80 text-left">
        <tbody>
          <tr className="text-white">
            <th className="">Ethnicity</th>
            <th className="">Count</th>
            <th>%</th>
          </tr>
          {data.map((item) => (
            
            <tr key={item.id} className="border">
              <td className="border border-slate-500">{item.ethnicity_name}</td>
              <td className="border border-slate-500">{item.Total}</td>
              <td className="border border-slate-500">{item.PERCENT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserRaceTable;