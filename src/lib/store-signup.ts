import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function storeEmailSignup(email: string, source: string = "popup") {
  if (!db) {
    // Fallback: store locally if Firebase not configured
    const signups = JSON.parse(localStorage.getItem("hookviral_signups") || "[]");
    signups.push({ email, source, timestamp: new Date().toISOString() });
    localStorage.setItem("hookviral_signups", JSON.stringify(signups));
    console.log("Stored locally (Firebase not configured):", email);
    return { success: true, local: true };
  }

  try {
    await addDoc(collection(db, "email_signups"), {
      email,
      source, // "popup", "footer", "signup_page"
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error storing signup:", error);
    return { success: false, error };
  }
}

export async function storeUserSignup(userId: string, email: string, name?: string, plan?: string) {
  if (!db) {
    console.log("Firebase not configured - user:", email);
    return { success: true, local: true };
  }

  try {
    await addDoc(collection(db, "users"), {
      id: userId,
      email,
      name: name || null,
      plan: plan || "free",
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error storing user:", error);
    return { success: false, error };
  }
}
