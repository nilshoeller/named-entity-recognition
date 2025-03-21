import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";

const TextItem = ({ key_prop, analyzed_text, is_public, onDelete, onEdit }) => {
  return (
    <div className="mb-3 p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 text-xs font-mono rounded-md ${
            is_public ? "bg-green-700 text-white" : "bg-red-600 text-white"
          }`}
        >
          {is_public ? "Public" : "Private"}
        </span>
      </div>
      <div className="mt-2 text-left">{parse(analyzed_text)}</div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="edit-button px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
          onClick={onEdit}
        >
          Bearbeiten <FontAwesomeIcon className="ms-1" icon={faEdit} />
        </button>
        <button
          className="delete-button px-4 py-2 bg-red-500 text-white rounded-md flex items-center"
          onClick={onDelete}
        >
          Löschen <FontAwesomeIcon className="ms-1" icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default TextItem;
