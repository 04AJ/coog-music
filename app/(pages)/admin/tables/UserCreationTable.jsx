const UserCreationTable = ({ data }) => {
    return (
        <div>
            # Users Created: {data.length}
            <table className="table-auto border w-80 text-left">
                <tbody>
                <tr className="text-white">
                    <th className="border">Username</th>
                    <th className="border">User ID</th>
                    <th className="border">Join Date</th>
                    <th className="border">Artist</th>
                </tr>
                {data.map((item) => (
                    <tr key={item.id} className="border">
                    <td className="border">{item.user_name}</td>
                    <td className="border">{item.user_id}</td>
                    <td className="border">{(item.join_date).substring(0,10)}</td>
                    <td className="border">{item.is_artist ? 'Y':'N'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
  };
  
  export default UserCreationTable;