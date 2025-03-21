import React from "react";
import { useGetPublicDataAll } from "../api/database_communication.js";
import FeedTextItem from "../components/FeedTextItem.jsx";

function UserFeedPage() {
  const { data: allPublicData } = useGetPublicDataAll();

  return (
    <div className="min-h-screen flex justify-center pt-6 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold mt-4 mb-6">User Feed Page</h1>
        <div className="space-y-6">
          {allPublicData && allPublicData.length > 0 ? (
            allPublicData.map((item, index) => (
              <FeedTextItem
                key={index}
                user={item.user}
                analyzed_text={item.analyzed_text}
              />
            ))
          ) : (
            <p>No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFeedPage;
