const tripsContainer = document.getElementById("trips-container");
const trips = JSON.parse(localStorage.getItem("savedTrips") || "[]");

if (trips.length === 0) {
  tripsContainer.innerHTML = "<p>No trips saved yet.</p>";
} else {
  trips.forEach((trip, index) => {
    const div = document.createElement("div");
    div.classList.add("itinerary-card");
    div.innerHTML = `
      <h3>Trip ${index + 1}</h3>
      <p><strong>Itinerary:</strong> ${trip.itinerary.title}</p>
      <p>${trip.itinerary.details}</p>
      <p><strong>Hotel:</strong> ${trip.hotel.name}</p>
      <p>${trip.hotel.desc}</p>
    `;
    tripsContainer.appendChild(div);
  });
}
