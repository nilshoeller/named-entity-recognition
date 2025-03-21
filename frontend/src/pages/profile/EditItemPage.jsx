import React, { useState, useEffect } from "react";
import { useGetSession } from "../../api/authentication.js";
import {
  useGetUserDataById,
  updateDataById,
} from "../../api/database_communication.js";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function EditItemPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { data: user } = useGetSession();
  const { data: userData } = useGetUserDataById(itemId);

  const [editedText, setEditedText] = useState("");

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (newText) => updateDataById(itemId, newText),
    onSuccess: () => {
      queryClient.invalidateQueries("get_user_data");

      setTimeout(() => {
        navigate("/profile");
      }, 10);
    },
  });

  useEffect(() => {
    if (userData) {
      setEditedText(userData.text);
    }
  }, [userData]);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveChanges = () => {
    updateMutation.mutate(editedText);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Edit data:</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
          rows={6}
          value={editedText}
          onChange={handleTextChange}
        />
        <br />
        <button
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={handleSaveChanges}
          disabled={updateMutation.isLoading}
        >
          Change
        </button>
      </div>
    </div>
  );
}

export default EditItemPage;
