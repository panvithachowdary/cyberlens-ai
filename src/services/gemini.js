import axios from "axios";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
export async function analyzeThreat(message) {
  const prompt = `
Analyze this message for scam/phishing risk.

Message:
"${message}"

Return ONLY valid JSON. No markdown.

{
  "threatLevel": "Low or Medium or High",
  "threatScore": 0,
  "threatType": "safe / phishing / job scam / financial scam / OTP scam / fake offer / other",
  "whySuspicious": ["point 1", "point 2"],
  "redFlags": ["point 1", "point 2"],
  "safeAction": ["point 1", "point 2"]
}

Rules:
- Normal harmless messages: 0-25
- Suspicious but no link/payment/OTP: 35-60
- Job scam with high pay/flexible hours/unknown recruiter: 50-75
- OTP/password/bank/payment/link scam: 75-100
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}