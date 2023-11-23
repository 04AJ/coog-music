const UserCreationTable = ({ data }) => {
    return (
        <div>
            # Users Created: {data.length}
            <table className="table-auto w-full text-left">
                <tbody>
                <tr className="text-white">
                    <th className="">Username</th>
                    <th className="">User ID</th>
                    <th className="">Join Date</th>
                    <th className="">Artist</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id} className="border">
                    <td className="border border-slate-500">{item.user_name}</td>
                    <td className="border border-slate-500">{item.user_id}</td>
                    <td className="border border-slate-500">{(item.join_date).substring(0,10)}</td>
                    <td className="border border-slate-500">{item.is_artist ? 'Y':'N'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
  };
  
  export default UserCreationTable;