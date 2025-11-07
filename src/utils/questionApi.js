const QUESTION_BIN_ID = process.env.REACT_APP_QUESTION_BIN_ID;
const MASTER_KEY = process.env.REACT_APP_QUESTION_MASTER_KEY;
const QUESTION_URL = `https://api.jsonbin.io/v3/b/${QUESTION_BIN_ID}`;


export async function getQuestions() {
  try {
    const res = await fetch(`${QUESTION_URL}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("🧩 Fetched Questions:", data);

    if (data.record && Array.isArray(data.record.questions)) {
      return data.record.questions;
    }

    console.warn("⚠️ No questions found in JSONBin");
    return [];
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    return [];
  }
}
