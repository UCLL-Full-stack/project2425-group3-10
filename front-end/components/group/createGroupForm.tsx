import React, { useState } from "react";

interface CreateGroupFormProps {
    onSubmit: (groupData: { name: string; maxPlayers: number; activityId: number }) => void;
    activityId: number; // The ID of the activity for which the group is being created
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSubmit, activityId }) => {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState<number>(0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || maxPlayers <= 0) {
            alert("Please provide valid group details.");
            return;
        }
        onSubmit({ name, maxPlayers, activityId });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create New Group</h2>

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Group Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter group name"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="maxPlayers" className="block text-gray-700 font-medium mb-2">
                    Max Players
                </label>
                <input
                    type="number"
                    id="maxPlayers"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter max players"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Create Group
            </button>
        </form>
    );
};

export default CreateGroupForm;
