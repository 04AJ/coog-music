const AgeTable = ({ data }) => {
    return (
      <table className="table-auto border w-auto text-left">
        <tbody>
          <tr className="text-white">
            <th className="border pr-5">0-15</th>
            <th className="border pr-5">16-25</th>
            <th className="border pr-5">26-35</th>
            <th className="border pr-5">36-45</th>
            <th className="border pr-5">46+</th>
            <th className="border pr-5">age N/A</th>
          </tr>
          {data.map((item) => (
            
            <tr key={item.id} className="border">
              <td className="border">{item.one}</td>
              <td className="border">{item.two}</td>
              <td className="border">{item.three}</td>
              <td className="border">{item.four}</td>
              <td className="border">{item.five}</td>
              <td className="border">{item.six}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default AgeTable;