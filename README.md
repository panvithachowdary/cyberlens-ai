# 🛡️ CyberLens AI

CyberLens AI is an AI-powered scam and phishing detection platform that helps users identify suspicious messages, emails, links, and screenshots before they become victims of online fraud.

Built for the Creative Showcase Hackathon, CyberLens AI combines OCR, Large Language Models, and threat analysis to provide easy-to-understand cybersecurity insights.

## 🚀 Features

### 🔍 AI Threat Detection

Analyze suspicious messages using AI and receive a detailed threat report.

### 📸 Screenshot Analysis

Upload screenshots of emails, SMS messages, or WhatsApp chats and extract text using OCR.

### ⚠️ Threat Scoring

Generate a threat score from 0–100 based on the likelihood of phishing or fraud.

### 🧠 AI-Powered Explanations

Get a detailed explanation of why a message may be dangerous.

### 📄 PDF Report Generation

Download a professional threat analysis report for future reference.

### 📊 Threat Statistics Dashboard

Track scan history and monitor detected threat levels.

### 🕒 Scan History

Review previously scanned threats and their risk classifications.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS

### AI & Security

* Groq API (Llama 3.1)
* Prompt Engineering

### OCR

* Tesseract.js

### Utilities

* Axios
* jsPDF

---

## 📂 Project Structure

src/
├── App.jsx
├── App.css
├── services/
│ ├── gemini.js
│ └── ocr.js
├── data/
│ └── scanner.js
└── main.jsx

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/panvithachowdary/cyberlens-ai.git
cd cyberlens-ai/client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_GROQ_API_KEY=your_api_key_here
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🎯 Demo Scenarios

* Fake Bank KYC Scam
* Fake Work-From-Home Job Scam
* OTP Fraud Messages
* Screenshot-Based Scam Detection

---

## 🌟 Future Improvements

* Real-time URL Reputation Scanner
* Email Header Analysis
* Malware Link Detection
* Browser Extension Integration
* Cyber Threat Intelligence Feed
* Multi-language Scam Detection

---

## 👩‍💻 Author

**Panvitha Chowdary**

* GitHub: https://github.com/panvithachowdary
* LinkedIn: https://www.linkedin.com/in/panvitha-chowdary/

---

## 📜 License

This project was developed for educational and hackathon purposes.
