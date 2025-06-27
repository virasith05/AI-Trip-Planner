document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.trip-form');
  const loader = document.getElementById("loader");
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    loader.classList.remove("hidden"); // Show loader
    const data = {
      destination: form.querySelector('input[name="destination"]').value,
      date: form.querySelector('input[name="travel-date"]').value,
      duration: form.querySelector('input[name="duration"]').value,
      budget: form.querySelector('input[name="budget"]').value,
      interests: form.querySelector('select[name="interests"]').value,
      travelType: form.querySelector('select[name="travel-type"]').value,
      accommodation: form.querySelector('select[name="accommodation"]').value
    };
    const prompt = `
I am planning a ${data.duration}-day ${data.travelType} trip to ${data.destination} starting on ${data.date}.
My budget is ₹${data.budget}. I prefer ${data.accommodation} stays.
My main interest is ${data.interests}. Suggest a detailed day-wise travel itinerary with activities, food recommendations, and travel tips.
Return ONLY a valid JSON object like this. No explanation or markdown formatting:
{
  "tripMeta": { "destination": "...", "durationDays": ..., ... },
  "budgetBreakdown": { "accommodation": ..., "food": ..., ... },
  "dailyItinerary": [ { "day": "Day 1", "title": "...", "activities": [ ... ] }, ... ],
  "foodTips": [ ... ],
  "travelTips": [ ... ],
  "budgetAdjustmentTips": [ ... ],
  "accommodationRecommendations": [ ... ],
  "notes": [ ... ]
}
`;
    const API_KEY = 'AIzaSyAbpYOzUPUcV_sjN83YUsFUoWLgTTua7tk';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    try {
      const geminiResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const result = await geminiResponse.json();
      const textReply = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
      let itineraryJSON;
      try {
        const cleanText = textReply
          .replace(/```json\s*/g, '')
          .replace(/```/g, '')
          .trim();
        itineraryJSON = JSON.parse(cleanText);
      } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", parseError);
        console.error("Raw AI response:", textReply);
        alert("The AI response could not be processed. Please try again.");
        return;
      }
      localStorage.setItem("tripData", JSON.stringify(data));
      localStorage.setItem("itinerary", JSON.stringify(itineraryJSON));
      window.location.href = "../pages/itinerary.html";
    } catch (error) {
      console.error("Error generating itinerary:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
});
