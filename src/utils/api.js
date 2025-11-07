// src/utils/api.js

const BIN_ID = process.env.REACT_APP_BIN_ID;
const MASTER_KEY = process.env.REACT_APP_MASTER_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;


export async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("🟢 JSONBin Response:", data);

    // ✅ Handle all possible response shapes:
    if (Array.isArray(data.record)) return data.record;
    if (data.record && Array.isArray(data.record.record)) return data.record.record;
    if (data.record && Array.isArray(data.record.users)) return data.record.users;
    if (data.record && data.record.record && Array.isArray(data.record.record.record))
      return data.record.record.record;

    // As a last resort, try flattening all values that look like arrays
    const deepArray = Object.values(data.record || {}).find((v) => Array.isArray(v));
    if (deepArray) return deepArray;

    console.warn("⚠️ No valid user array found in JSONBin data:", data);
    return [];
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    return [];
  }
}

export async function saveUsers(users) {
  try {
    const res = await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
      body: JSON.stringify(users),
    });

    const result = await res.json();
    console.log("✅ Users saved successfully:", result);
  } catch (err) {
    console.error("❌ Error saving users:", err);
  }
}