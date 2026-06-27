import { useState } from "react";
import { uploadReport } from "../api/reportApi";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert("Select a file");

        try {
            setLoading(true);
            const data = await uploadReport(file);
            setResult(data.analysis || "No response");
        } catch(err) {
            console.error(err);
            alert("Upload Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Upload Medical Report</h2>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button onClick={handleUpload}>
                {loading ? "Analyzing..." : "Upload" }
            </button>

            {result && (
                <div style={{ marginTop: "20px"}}>
                    <h3>AI Result</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
};

export default Upload;