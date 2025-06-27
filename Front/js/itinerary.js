document.addEventListener("DOMContentLoaded", function () {
  const itineraryData = JSON.parse(localStorage.getItem("itinerary"));
  if (!itineraryData) {
    document.getElementById("itinerary-container").innerHTML =
      "<p>No itinerary found. Please generate a trip first.</p>";
    return;
  }
  const {
    tripMeta,
    dailyItinerary,
    accommodationRecommendations,
    budgetBreakdown,
    foodTips,
    travelTips,
    notes
  } = itineraryData;
  // Render Itinerary
  const itineraryContainer = document.getElementById("itinerary-container");
  itineraryContainer.innerHTML = "";
  dailyItinerary.forEach((day) => {
    const card = document.createElement("div");
    card.className = "itinerary-card";
    const title = document.createElement("h3");
    title.textContent = `🗓️ ${day.day}: ${day.title}`;
    const list = document.createElement("ul");
    day.activities.forEach((act) => {
      const li = document.createElement("li");
      if (typeof act === "string") {
        li.textContent = act;
      } else if (typeof act === "object" && act !== null) {
        // Safely join values from object like "10AM - Visit Nandi Hills"
        const values = Object.values(act).join(" - ");
        li.textContent = values;
      } else {
        li.textContent = String(act);
      }
      list.appendChild(li);
    });
    card.appendChild(title);
    card.appendChild(list);
    itineraryContainer.appendChild(card);
  });
  // Render Hotels
  const hotelContainer = document.getElementById("hotel-container");
  hotelContainer.innerHTML = "";
  accommodationRecommendations.forEach((hotel) => {
    const div = document.createElement("div");
    div.className = "hotel-card";
    div.innerHTML = `<h3>🏨 ${hotel}</h3><p>Hotel/Resorts based on your preferences.</p>`;
    hotelContainer.appendChild(div);
  });
  // Budget Breakdown
  const budgetList = document.getElementById("budget-breakdown");
  for (let [key, value] of Object.entries(budgetBreakdown)) {
    const li = document.createElement("li");
    let displayValue = value;
    if (typeof value === 'string' && value.trim().startsWith('₹')) {
      displayValue = value;
    } else {
      displayValue = `₹${Number(value).toLocaleString()}`;
    }
    li.textContent = `${capitalize(key)}: ${displayValue}`;
    budgetList.appendChild(li);
  }
  // Tips
  renderList("travel-tips", travelTips);
  renderList("food-tips", foodTips);
  renderList("notes", notes);
  function renderList(id, items) {
    const ul = document.getElementById(id);
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
  }
  // Save Button (placeholder)
  document.getElementById("save-trip").addEventListener("click", async () => {
    const itinerary = JSON.parse(localStorage.getItem("itinerary"));
    const token = localStorage.getItem("token");
    const tripToSave = {
      itinerary: {
        title: itinerary.tripMeta.destination + " - " + itinerary.tripMeta.durationDays + " Days",
        details: itinerary.dailyItinerary.map(day => `${day.day}: ${day.title}`).join("; ")
      },
      hotel: {
        name: itinerary.accommodationRecommendations?.[0] || "No recommendation",
        desc: "Top AI-recommended stay"
      },
      raw: itinerary
    };
    try {
      const response = await fetch("http://localhost:8086/api/users/save-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tripToSave)
      });
      const result = await response.json();
      if (result.success) {
        // Show custom modal for 3 seconds
        const modal = document.getElementById("trip-saved-modal");
        modal.style.display = "flex";
        setTimeout(() => {
          modal.style.display = "none";
        }, 1000);
      } else {
        alert("Failed to save trip.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Something went wrong.");
    }
  });
  // Share button
  document.getElementById("share-trip").addEventListener("click", async () => {
    try {
      const shareText = `Check out my Paris trip plan:\n${tripMeta.destination}, ${tripMeta.durationDays} days\nStarting from ${tripMeta.startDate}`;
      await navigator.share({
        title: "My Trip Itinerary",
        text: shareText,
        url: window.location.href
      });
    } catch (err) {
      alert("Sharing not supported or cancelled.");
    }
  });
  const downloadBtn = document.getElementById('download-pdf');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      const itineraryContent = document.querySelector('.main-content');
      if (!itineraryContent) return;
      html2pdf()
        .set({
          margin: 0.5,
          filename: 'trip-plan.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(itineraryContent)
        .save();
    });
  }
});
