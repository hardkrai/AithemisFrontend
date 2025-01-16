import React, { useState } from "react";
import "./App.css";
import UploadPDF from "./pdfUpload";
import QueryPDF from "./QueryPDF";

const App = () => {
  const [filePath, setFilePath] = useState("");

  return (
    <div className="app">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"5px"}}>
        <h3 style={{fontWeight: "400", color:"white", textAlign:"left", paddingRight: "2rem", marginTop:"-11px"}}>Chat and Learn <br/>from your Documents</h3>
        <h1 style={{fontWeight: "400", color:"white", textAlign:"right", paddingLeft: "2rem", marginTop:"-5px"}}>DoQuery</h1>
      </div>
      
      <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginTop:"auto", marginBottom:"auto", maxHeight: "100%" }}>
        <UploadPDF setFilePath={setFilePath} />
        {filePath && <QueryPDF filePath={filePath} />}
      </div>

      {/* Conditionally render the text only when the QueryPDF component is inactive */}
      {!filePath && (
        <div style={{
          textAlign: "center", 
          color: "white", 
          marginTop: "2rem", 
          marginBottom:"-5rem",
          fontSize: "0.9rem", 
          paddingBottom: "1rem"
        }}>
          <p >
            You can upload PDF and DOCX files, and ask questions about the content directly. 
            <br/>This app is powered by Gemini 1.5 for processing and providing answers from your documents.
            <br/>
          </p>
          <p style={{marginBottom:"-10rem", alignItems:"end"}}>Project Made in completion of Technical Round of Recruitment by Aithemis, Made by Hardik Rai<br/>MAIT batch 2024, Roll Number 00714807722</p>
        </div>
      )}
    </div>
  );
};

export default App;
