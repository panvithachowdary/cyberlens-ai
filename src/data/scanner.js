// src/data/scanner.js

export function scanThreat(input) {
    const text = input.toLowerCase();
  
    let score = 0;
    let reasons = [];
    let threatTypes = [];
  
    const urgencyWords = ["urgent", "immediately", "verify now", "within 24 hours", "account locked"];
    const credentialWords = ["password", "login", "otp", "cvv", "pin", "credentials"];
    const moneyWords = ["won", "prize", "reward", "cash", "payment", "bank", "refund"];
    const linkWords = ["http", "https", ".com", ".net", ".xyz", ".top", ".ru"];
  
    urgencyWords.forEach((word) => {
      if (text.includes(word)) {
        score += 20;
        reasons.push("Uses urgency or fear to pressure the user.");
        threatTypes.push("Urgency Tactic");
      }
    });
  
    credentialWords.forEach((word) => {
      if (text.includes(word)) {
        score += 25;
        reasons.push("Asks for sensitive credentials or personal information.");
        threatTypes.push("Credential Theft");
      }
    });
  
    moneyWords.forEach((word) => {
      if (text.includes(word)) {
        score += 15;
        reasons.push("Mentions money, prize, refund, or banking-related bait.");
        threatTypes.push("Financial Scam");
      }
    });
  
    linkWords.forEach((word) => {
      if (text.includes(word)) {
        score += 20;
        reasons.push("Contains a suspicious or external link.");
        threatTypes.push("Suspicious Link");
      }
    });
  
    if (text.includes("click here")) {
      score += 15;
      reasons.push("Uses a generic click-bait phrase.");
      threatTypes.push("Phishing Link");
    }
  
    score = Math.min(score, 100);
  
    let level = "Low Risk";
    if (score >= 70) level = "High Risk";
    else if (score >= 35) level = "Medium Risk";
  
    return {
      score,
      level,
      reasons: [...new Set(reasons)],
      threatTypes: [...new Set(threatTypes)],
      actions: [
        "Do not click suspicious links.",
        "Do not enter passwords, OTPs, CVV, or PINs.",
        "Verify the sender from the official website or app.",
        "Report the message to your IT/security team."
      ]
    };
  }