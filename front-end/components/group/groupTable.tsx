import { Group } from "@/types";
import GroupService from "@/services/GroupService"; // Import the GroupService

type Props = {
    groups: Array<Group>;
};

const GroupTable: React.FC<Props> = ({ groups }) => {
    const handleAddUserToGroup = async (groupId: number) => {
        try {
            const user = sessionStorage.getItem("user");
            if (!user) {
                throw new Error("User is not logged in or session storage is empty.");
            }

            const parsedUser = JSON.parse(user);
            const userId = parsedUser.id;

            await GroupService.addUserToGroup(groupId, userId);

            alert(`User added to group ${groupId}`);
        } catch (error) {
            console.error("Error adding user to group:", error);
            alert("Failed to add user to group. Please try again.");
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Name</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Players</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups.map((group, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } hover:bg-gray-100`}
                        >
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">
                                {group.name}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">
                                {`${group.currentPlayers}/${group.maxPlayers}`}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleAddUserToGroup(group.id)}
                                >
                                    Add User
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GroupTable;
