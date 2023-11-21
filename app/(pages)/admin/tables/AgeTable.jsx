const AgeTable = ({ data }) => {
    return (
      <table className="table-auto w-auto text-left">
        <tbody>
          <tr className="text-white">
            <th className="pr-5">0-15</th>
            <th className="pr-5">16-25</th>
            <th className="pr-5">26-35</th>
            <th className="pr-5">36-45</th>
            <th className="pr-5">46+</th>
            <th className="pr-5">age N/A</th>
          </tr>
          {data.map((item) => (
            
            <tr key={item.id} className="border">
              <td className="border border-slate-500">{item.one}</td>
              <td className="border border-slate-500">{item.two}</td>
              <td className="border border-slate-500">{item.three}</td>
              <td className="border border-slate-500">{item.four}</td>
              <td className="border border-slate-500">{item.five}</td>
              <td className="border border-slate-500">{item.six}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default AgeTable;