import { Group } from "@/types";
import GroupService from "@/services/GroupService"; // Import the GroupService

type Props = {
    groups: Array<Group>;
};

const GroupTable: React.FC<Props> = ({ groups }) => {
    const handleAddUserToGroup = async (groupId: number) => {
        try {
            const user = sessionStorage.getItem("user");
            if (!user) throw new Error("User not logged in.");
            const userId = JSON.parse(user).id;
            await GroupService.addUserToGroup(groupId, userId);
            alert("User added to group.");
        } catch (error) {
            alert("Failed to add user.");
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
                <thead className="bg-indigo-600">
                <tr>
                    <th className="px-4 py-3 text-left text-white font-bold">Group Name</th>
                    <th className="px-4 py-3 text-left text-white font-bold">Players</th>
                    <th className="px-4 py-3 text-left text-white font-bold">Actions</th>
                </tr>
                </thead>
                <tbody>
                {groups.map((group, index) => (
                    <tr
                        key={index}
                        className={`${
                            index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                        } hover:bg-indigo-500`}
                    >
                        <td className="px-4 py-3 text-white">{group.name}</td>
                        <td className="px-4 py-3 text-white">{`${group.currentPlayers}/${group.maxPlayers}`}</td>
                        <td className="px-4 py-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={() => handleAddUserToGroup(group.id)}
                            >
                                Join Group
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default GroupTable;
