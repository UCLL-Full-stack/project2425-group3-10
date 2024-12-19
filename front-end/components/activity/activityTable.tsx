import React, { useState } from "react";
import { Activity } from "@/types";
import { Group } from "@/types";
import CreateGroupForm from "@/components/group/createGroupForm";
import GroupTable from "@/components/group/groupTable";
import GroupService from "@/services/GroupService";

type Props = {
    activities: Array<Activity>;
};

const ActivityTable: React.FC<Props> = ({ activities }) => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [groups, setGroups] = useState<Array<Group>>([]);
    const [loadingGroups, setLoadingGroups] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showCreateGroupForm, setShowCreateGroupForm] = useState<boolean>(false);

    const handleActivityClick = async (activity: Activity) => {
        if (selectedActivity?.id === activity.id) {
            setSelectedActivity(null); // Collapse the groups table
            return;
        }

        setSelectedActivity(activity);
        setShowCreateGroupForm(false);

        try {
            setLoadingGroups(true);
            const fetchedGroups = await GroupService.getGroupsFromActivity(activity.id);
            setGroups(fetchedGroups);
        } catch (error) {
            setError("Failed to load groups. Please try again.");
        } finally {
            setLoadingGroups(false);
        }
    };

    const handleCreateGroup = (activity: Activity) => {
        setSelectedActivity(activity);
        setShowCreateGroupForm(true);
    };

    const closeCreateGroupModal = () => {
        setShowCreateGroupForm(false); // Close the modal
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <div className="max-w-4xl mx-auto overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-indigo-600">
                    <tr>
                        <th className="px-4 py-3 text-left text-white font-bold">Name</th>
                        <th className="px-4 py-3 text-left text-white font-bold">Description</th>
                        <th className="px-4 py-3 text-left text-white font-bold">Type</th>
                        <th className="px-4 py-3 text-left text-white font-bold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            {/* Activity Row */}
                            <tr
                                className={`${
                                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                                } hover:bg-indigo-500`}
                                onClick={() => handleActivityClick(activity)}
                            >
                                <td className="px-4 py-3 text-white cursor-pointer">{activity.name}</td>
                                <td className="px-4 py-3 text-white">{activity.description}</td>
                                <td className="px-4 py-3 text-white">{activity.type}</td>
                                <td className="px-4 py-3">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click from collapsing the table
                                            handleCreateGroup(activity);
                                        }}
                                    >
                                        Create Group
                                    </button>
                                </td>
                            </tr>

                            {/* Groups Table Row */}
                            {selectedActivity?.id === activity.id && (
                                <tr>
                                    <td colSpan={4} className="p-4 bg-gray-800">
                                        {loadingGroups ? (
                                            <p className="text-gray-400">Loading groups...</p>
                                        ) : error ? (
                                            <p className="text-red-500">{error}</p>
                                        ) : groups.length > 0 ? (
                                            <GroupTable groups={groups} />
                                        ) : (
                                            <p className="text-gray-400 text-center">
                                                No groups found for this activity.
                                            </p>
                                        )}

                                        {showCreateGroupForm && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                                    <button
                                                        onClick={closeCreateGroupModal}
                                                        className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
                                                    >
                                                        ×
                                                    </button>
                                                    <CreateGroupForm
                                                        onSubmit={(groupData) => {
                                                            console.log("Group Created:", groupData);
                                                            closeCreateGroupModal(); // Close modal after submission
                                                        }}
                                                        activityId={activity.id}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityTable;
