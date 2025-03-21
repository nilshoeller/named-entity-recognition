import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../api/database_communication.js";

function TextAnalysePage() {
  const [text, setText] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [model_id, setModel] = useState("0");

  const navigate = useNavigate();
  const qc = useQueryClient();

  const addUserDataMutation = useMutation({
    mutationFn: addUserData,
    onSuccess: (data) => {
      console.log("Data added successfully", data);
      qc.invalidateQueries("get_user_data");
      navigate("/profile");
    },
  });

  // Handle model selection
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  // Handle text area input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    if ((text && fileContent) || (!text && !fileContent)) {
      setErrorMessage(
        text && fileContent
          ? "Entweder Text eingeben oder Datei hochladen, nicht beides"
          : "Geben Sie das Text ein oder laden Sie eine Datei hoch"
      );
      return;
    }

    setErrorMessage(""); // Clear any previous error message
    const content = text || fileContent;

    addUserDataMutation.mutate({
      text: content,
      is_public: isPublic,
      model_id,
    });
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-6">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Text Analyse</h1>
        <p className="text-lg mb-6">
          Geben Sie hier Ihren Text ein oder laden Sie eine Datei hoch.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium">
              Geben Sie hier Ihren Text ein
            </label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="10"
              value={text}
              onChange={handleTextChange}
              placeholder="An einem warmen Sommertag..."
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Datei hochladen</label>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic((prev) => !prev)}
                className="mr-2"
              />
              <label>Öffentlich machen</label>
            </div>
            <div>
              <select
                onChange={handleModelChange}
                value={model_id}
                className="p-3 border rounded-lg"
              >
                <option value="0">Deutsch</option>
                <option value="1">Englisch</option>
              </select>
            </div>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            onClick={handleSubmit}
            disabled={addUserDataMutation.isPending}
            className="w-full py-3 bg-blue-500 text-white rounded-lg mt-4"
          >
            Analysieren
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextAnalysePage;
