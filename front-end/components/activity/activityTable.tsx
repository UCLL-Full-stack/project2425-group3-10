import React, { useState, useEffect } from "react";
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

    const handleCreateGroup = (activity: Activity) => {
        setSelectedActivity(activity);
        setError(null); // Reset error state when opening the form
    };

    const handleGroupSubmit = async (groupData: { name: string; maxPlayers: number; activityId: number }) => {
        try {
            setError(null);
            const createdGroup = await GroupService.createGroup(groupData);
            alert(`Group "${createdGroup.name}" created successfully!`);
            setSelectedActivity(null); // Close the form after submission
        } catch (error) {
            console.error("Error creating group:", error);
            setError("Failed to create group. Please try again.");
        }
    };

    const fetchGroups = async (activityId: number) => {
        try {
            setLoadingGroups(true);
            setError(null);
            const fetchedGroups = await GroupService.getGroupsFromActivity(activityId);
            setGroups(fetchedGroups);
        } catch (error) {
            console.error("Error fetching groups:", error);
            setError("Failed to load groups. Please try again.");
        } finally {
            setLoadingGroups(false);
        }
    };

    const handleActivityClick = (activity: Activity) => {
        setSelectedActivity(activity);
        fetchGroups(activity.id); // Fetch groups for the selected activity
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Name</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Description</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Type</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((activity, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                            onClick={() => handleActivityClick(activity)}
                        >
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">{activity.name}</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">{activity.description}</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">{activity.type}</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={() => handleCreateGroup(activity)}
                                >
                                    Create Group
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedActivity && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Groups for {selectedActivity.name}</h2>
                    {loadingGroups ? (
                        <p>Loading groups...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : groups.length > 0 ? (
                        <GroupTable groups={groups} /> // Render GroupTable if groups exist
                    ) : (
                        <p>No groups for this activity yet.</p> // Display message if no groups exist
                    )}
                </div>
            )}
        </>
    );
};

export default ActivityTable;
