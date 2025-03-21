import React from "react";
import { useGetSession } from "../../api/authentication.js";
import {
  deleteUserData,
  useGetUserDataAll,
} from "../../api/database_communication.js";
import TextItem from "../../components/TextItem.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { data: user } = useGetSession();
  const { data: userDataAll } = useGetUserDataAll();

  const navigate = useNavigate();
  const qc = useQueryClient();

  const deleteUserDataMutation = useMutation({
    mutationFn: deleteUserData,
    onSuccess: (data) => {
      qc.invalidateQueries("delete_user_data");
      navigate("/profile");
    },
  });

  const handleDelete = async (itemid) => {
    deleteUserDataMutation.mutate(itemid);
  };

  const handleEdit = (itemid) => {
    navigate("/edit-item/" + itemid);
  };

  return (
    <div className="flex justify-center pt-6 pb-4">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">
            {user.first_name} {user.last_name}
          </h3>
          <h6 className="text-sm text-gray-600">{user.username}</h6>
        </div>

        <div>
          <h5 className="text-lg font-medium mb-4">All data:</h5>
          {userDataAll && userDataAll.length > 0 ? (
            userDataAll.map((item) => (
              <TextItem
                key={item.id}
                analyzed_text={item.analyzed_text}
                is_public={item.is_public}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
