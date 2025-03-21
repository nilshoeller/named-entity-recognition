import React from "react";
import parse from "html-react-parser";

const FeedTextItem = ({ user, analyzed_text }) => {
  return (
    <div className="mb-4 shadow-lg rounded-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-left">
            <h2 className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            <h5 className="text-sm text-gray-500">{user.username}</h5>
          </div>
        </div>
        <hr className="my-4 border-t-2 border-gray-200" />
        <div className="text-base text-gray-700">{parse(analyzed_text)}</div>
      </div>
    </div>
  );
};

export default FeedTextItem;
