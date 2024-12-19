import React, { useState } from "react";
import groupService from "@/services/GroupService";


interface CreateGroupFormProps {
    onSubmit: (groupData: { name: string; maxPlayers: number; activityId: number }) => void;
    activityId: number; // The ID of the activity for which the group is being created
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSubmit, activityId }) => {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || maxPlayers <= 0) {
            console.error("Please provide valid group details.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Call the createGroup service
            const newGroup = await groupService.createGroup({
                name,
                maxPlayers,
                activityId,
            });

            // Pass the full group object to the parent component
            onSubmit(newGroup);

            // Reset the form fields
            setName("");
            setMaxPlayers(0);
        } catch (error: any) {
            console.error("Error creating group:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full"
        >
            <h2 className="text-xl font-bold mb-4 text-center text-indigo-400">Create a New Group</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Group Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Max Players</label>
                <input
                    type="number"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded ${isSubmitting ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
            >
                {isSubmitting ? "Creating..." : "Create Group"}
            </button>
        </form>
    );
};

export default CreateGroupForm;
