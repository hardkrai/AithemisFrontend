import React, { useState } from "react";
import axios from "axios";

const QueryPDF = ({ filePath }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = async () => {
    // Validate input
    if (!filePath) {
      alert("Error: File path is missing. Please upload a file first.");
      return;
    }

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      alert("Error: Question is empty. Please enter a valid question.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://aithemisbackend.onrender.com/query", {
        filePath,
        question: trimmedQuestion,
      });

      if (response.data && response.data.answer) {
        // Format the answer
        const boldAnswer = response.data.answer.replace(/\*(.*?)\*/g, "<b>$1</b>");
        const formattedAnswer = boldAnswer.replace(/\n/g, "<br />");
        setAnswer(formattedAnswer);
      } else {
        throw new Error("Invalid response structure: Missing 'answer' field.");
      }
    } catch (error) {
      console.error("Query failed:", error);
      alert(
        "There was an error querying the document. Please check your inputs and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="query-container"
      style={{
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        maxHeight: "600px",
        overflow: "hidden",
        marginLeft: "-1rem",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ fontWeight: "500", marginTop: "-2px" }}>Query the Document</h2>
      <input
        type="text"
        placeholder="Ask something like 'What is the summary of this document?'"
        value={question}
        className="querybox"
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          borderRadius: "10px",
          borderWidth: "2px",
          padding: "1rem",
          fontSize: "0.8rem",
          fontWeight: "400",
        }}
      />
      <button
        onClick={handleQuerySubmit}
        disabled={loading}
        style={{
          width: "100%",
          fontSize: "1rem",
          fontWeight: "500",
          padding: "1rem",
          marginTop: "-3px",
        }}
        className="button"
      >
        {loading ? "Fetching answer..." : "Submit"}
      </button>
      {answer && (
        <div
          className="answer"
          style={{ maxHeight: "400px", overflow: "scroll", marginTop: "-0.5rem" }}
        >
          <h3>Answer:</h3>
          <p dangerouslySetInnerHTML={{ __html: answer }} style={{ textAlign: "justify" }}></p>
        </div>
      )}
    </div>
  );
};

export default QueryPDF;
