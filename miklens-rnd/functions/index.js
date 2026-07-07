const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");

initializeApp();
const db = getFirestore();

// Mock Cloud Function to simulate AI processing for daily logs
exports.analyzeDailyLog = onDocumentCreated("daily_logs/{logId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    return;
  }

  const logData = snapshot.data();
  console.log(`Analyzing log ${event.params.logId} for product ${logData.productId}`);

  // Simulate calling an AI API (e.g., Vertex AI / Gemini)
  // In a real implementation, we would send logData.activitiesPerformed and logData.problems

  const simulatedAiSummary = `AI Summary: Progress noted on ${logData.todaysObjective || 'tasks'}. No critical risks detected based on the text.`;
  const simulatedAiRecommendations = "Continue with planned protocol. Monitor for anomalies.";

  try {
    // Write back to the log document
    await snapshot.ref.update({
      aiNotes: simulatedAiSummary,
      aiRecommendations: simulatedAiRecommendations,
      analyzedAt: new Date()
    });

    // Optionally update the parent product's AI summary.
    // Validate that productId is a non-empty string referencing a document
    // that actually exists before writing. Without this check, a malformed
    // or spoofed daily_logs write with an arbitrary productId would either
    // throw (crashing the function before other cleanup) or, if a docId
    // happens to collide with an unrelated collection entry, silently
    // mutate a product record that has nothing to do with this log.
    if (typeof logData.productId === "string" && logData.productId.trim().length > 0) {
      const productRef = db.collection("products").doc(logData.productId);
      const productSnapshot = await productRef.get();

      if (productSnapshot.exists) {
        await productRef.update({
          aiSummary: "Recently updated based on latest experiments.",
          lastAiAnalysis: new Date()
        });
      } else {
        console.warn(
          `Skipping AI summary update: product ${logData.productId} referenced by log ${event.params.logId} does not exist.`
        );
      }
    }

    console.log("AI Analysis complete.");
  } catch (error) {
    console.error("Error updating document with AI analysis:", error);
  }
});
