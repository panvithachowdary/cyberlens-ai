import { useState } from "react";
import { analyzeThreat } from "./services/gemini";
import "./App.css";
import { extractTextFromImage } from "./services/ocr";
import jsPDF from "jspdf";


function App() {
  const samples = [
    "Urgent! Your bank account will be locked. Click here and verify your password immediately.",
    "Congratulations! You won ₹50,000. Claim your reward now.",
    "Dear Customer, your KYC has expired. Update your Aadhaar and PAN details immediately to avoid account suspension: https://secure-kyc-update.xyz",
    "Good morning. My name is Alicia Freeman from Landy Resource Group. You have been shortlisted for a job briefing. The role pays $75/hour and allows you to work from home and choose your own hours. Are you interested?",
    "Congratulations! You have been selected for a remote data entry job. Earn ₹8,000 per day working from home. Pay a refundable registration fee of ₹499 to begin.",
  ];
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);

  function downloadReport() {
    if (!result) return;
  
    const doc = new jsPDF();
  
    doc.setFontSize(20);
    doc.text("CyberLens AI Threat Report", 20, 20);
  
    doc.setFontSize(12);
    doc.text(`Threat Score: ${result.score}/100`, 20, 40);
    doc.text(`Threat Level: ${result.level}`, 20, 50);
    doc.text(`Threat Type: ${result.types.join(", ")}`, 20, 60);
  
    doc.text("AI Analysis:", 20, 80);
  
    const lines = doc.splitTextToSize(aiAnalysis || "No analysis available", 170);
    doc.text(lines, 20, 90);
  
    doc.save("CyberLens_Report.pdf");
  }
  async function scanText() {
    let finalText = text;
  
    try {
      setLoading(true);
      setAiAnalysis("");
  
      if (image) {
        const extractedText = await extractTextFromImage(image);
        finalText = extractedText;
        setText(extractedText);
      }
  
      if (!finalText.trim()) {
        alert("Please paste a message or upload a screenshot.");
        return;
      }
  
      const aiResponse = await analyzeThreat(finalText);
  
      let aiData;
  
      try {
        const cleanResponse = aiResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
  
        aiData = JSON.parse(cleanResponse);
      } catch (err) {
        console.log("JSON Parse Error:", err);
  
        aiData = {
          threatLevel: "Medium",
          threatScore: 50,
          threatType: "Unknown",
          whySuspicious: ["Unable to parse AI response."],
          redFlags: ["AI returned invalid format."],
          safeAction: ["Verify manually before trusting this message."]
        };
      }
  
      setAiAnalysis(`
  Threat Level: ${aiData.threatLevel}
  Threat Score: ${aiData.threatScore}
  Threat Type: ${aiData.threatType}
  
  Why Suspicious:
  ${aiData.whySuspicious.map((p) => "- " + p).join("\n")}
  
  Red Flags Found:
  ${aiData.redFlags.map((p) => "- " + p).join("\n")}
  
  Safe Action:
  ${aiData.safeAction.map((p) => "- " + p).join("\n")}
  `);
  
      const finalResult = {
        score: aiData.threatScore,
        level: `${aiData.threatLevel} Risk`,
        reasons: ["AI-generated report available below."],
        types: [aiData.threatType],
        time: new Date().toLocaleTimeString(),
      };
  
      setResult(finalResult);
      setHistory((prev) => [finalResult, ...prev]);
  
    } catch (error) {
      console.log(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const totalScans = history.length;
  const highRisk = history.filter((item) => item.level === "High Risk").length;
  const mediumRisk = history.filter((item) => item.level === "Medium Risk").length;
  const lowRisk = totalScans - highRisk - mediumRisk;
  return (
    <div className="app">
     <nav className="navbar">
  <div className="logo-section">
    <h2>🛡️ CyberLens AI</h2>
  </div>

  <div className="nav-links">
    <a href="#scanner">Scanner</a>
    <a href="#dashboard">Dashboard</a>
    <a href="#history">History</a>
  </div>
</nav>

<section className="hero" id="scanner">
          <div>
          <p className="tag">AI Cyber Safety Tool</p>
          <h1>Detect suspicious messages before you click.</h1>
          <p className="desc">
            Paste any suspicious email, SMS, WhatsApp message, or link. CyberLens AI checks
            scam signals and explains the risk in simple language.
          </p>
          <div className="sample-section">
  <p>Try Demo Scenarios</p>

  {samples.map((sample, index) => (
    <button
      key={index}
      className="sample-btn"
      onClick={() => setText(sample)}
    >
Demo {index + 1}
    </button>
  ))}
</div>
        </div>

        <div className="scanner-card">
        <textarea
  placeholder="Paste suspicious message or URL here..."
  value={text}
  onChange={(e) => setText(e.target.value)}
/>

<label className="upload-box">
<input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>
<span>{image ? image.name : "Upload scam screenshot"}</span>
<small>Email / WhatsApp / SMS screenshot</small> 
</label>


          <button onClick={scanText}>Scan Threat</button>
        </div>
      </section>

      {result && (
        <section className="result">
          <div className="score-card">
            <h3>{result.level}</h3>
            <div className="score">{result.score}/100</div>
            <p>Threat Score</p>
          </div>

          <div className="details-card">
            <h3>Why this was flagged</h3>
            {result.reasons.map((reason, index) => (
              <p key={index}>⚠ {reason}</p>
            ))}

            <h3>Threat Types</h3>
            <div className="chips">
              {result.types.map((type, index) => (
                <span key={index}>{type}</span>
              ))}
            </div>

            <h3>Recommended Action</h3>
            <p>Do not click unknown links or share OTP, password, CVV, or PIN.</p>
          </div>
        </section>
      )}
  
{loading && (
  <div className="ai-box">
<h3>Analyzing with CyberLens AI...</h3>
  </div>
)}

{aiAnalysis && (
  <div className="ai-box">
    <h3>AI Threat Report</h3>
    <button className="pdf-btn" onClick={downloadReport}>
  Download PDF Report
</button>
    <pre>{aiAnalysis}</pre>
  </div>
)}

<section className="dashboard" id="dashboard">        <div>
          <h3>{totalScans}</h3>
          <p>Total Scans</p>
        </div>
        <div>
          <h3>{highRisk}</h3>
          <p>High Risk</p>
        </div>
        <div>
          <h3>{mediumRisk}</h3>
          <p>Medium Risk</p>
        </div>
      </section>
      <section className="stats-section">
  <h2>Threat Statistics</h2>

  <div className="dashboard">
    <div>
      <h3>{highRisk}</h3>
      <p>High Risk Threats</p>
    </div>

    <div>
      <h3>{mediumRisk}</h3>
      <p>Medium Risk Threats</p>
    </div>

    <div>
      <h3>{lowRisk}</h3>
      <p>Low Risk Threats</p>
    </div>
  </div>
</section>

      {history.length > 0 && (
        <section className="history" id="history">
<h2>Recent Scan History</h2>

          {history.slice(0, 5).map((item, index) => (
            <div className="history-card" key={index}>
              <div>
                <strong>{item.level}</strong>
                <p>{item.types.join(", ")}</p>
              </div>
              <span>{item.score}/100</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default App;