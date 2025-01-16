import React, { useState } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const UploadFile = ({ setFilePath }) => {
  const [file, setFile] = useState(null);
  const [textPreview, setTextPreview] = useState(""); // Rename to textPreview
  const [uploading, setUploading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Slide transition function
  const SlideTransition = (props) => <Slide {...props} direction="up" />;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://aithemisbackend.onrender.com/upload", formData);
      // const response = await axios.post("http://localhost:5001/upload", formData);
      setTextPreview(response.data.textPreview); // Use textPreview from the response
      setFilePath(response.data.filePath); // Dynamically set the file path
      setSnackbarMessage("File uploaded successfully!");
      setSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error uploading file. Please try again.");
      setSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="upload-container" style={{ width: "100%", maxHeight: "600px", backgroundColor: "#fff", overflow: "hidden" }}>
      <div className="inputbox" style={{ border: "2px", borderRadius: "10px", borderStyle: "dashed", borderColor: "#1a0061", opacity: "70%", backgroundColor: "#fff" }}>
        <input
          className="inputbox"
          type="file"
          accept=".pdf,.docx" // Allow both .pdf and .docx
          onChange={handleFileChange}
          style={{ justifyContent: "center", padding: "7rem", opacity: "0%", paddingBottom: "5rem", fontSize: "2rem", backgroundColor: "#000" }}
        />
      </div>
      <h1 className="inputtext" style={{ fontWeight: "500", marginTop: "-10rem", marginBottom: "3rem", fontSize: "1.4rem" }}>
        {file ? file.name : "Click Here to Upload a PDF or DOCX Document"}
      </h1>

      <button
        className="button"
        style={{ width: "100%", padding: "1rem", marginTop: "6rem", fontWeight: "500", fontSize: "1rem" }}
        onClick={handleFileUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {textPreview && (
        <div className="preview" style={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "300px" }}>
          <h3>Extracted Text (Preview):</h3>
          <p>{textPreview}</p> {/* Replace previewText with textPreview */}
        </div>
      )}

      {/* Snackbar with Slide Transition */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{
          vertical: 'bottom', // Position at the bottom
          horizontal: 'center', // Center it horizontally
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadFile;
