import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await fetch(
        "https://medical-ai-assistant-cvj3.onrender.com/api/reports/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Medical AI Assistant 🏥</h1>

      <input type="file" onChange={handleUpload} />
      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Upload Report"}
      </button>

      {result && (
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h2>Analysis Result 📊</h2>

          <p><b>Status:</b> {result.message}</p>
          <p><b>File:</b> {result.data?.fileName}</p>

          <p><b>Extracted Text:</b></p>
          <pre>{result.data?.extractedText}</pre>

          <p><b>AI Analysis:</b></p>
          <pre>{JSON.stringify(result.data?.analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;