const tripsContainer = document.getElementById("trips-container");
const token = localStorage.getItem("token");

fetch("http://localhost:8086/api/trips/my-trips", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => {
    if (data.success && data.trips.length > 0) {
      data.trips.forEach((trip, index) => {
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
    } else {
      tripsContainer.innerHTML = "<p>No trips saved yet.</p>";
    }
  })
  .catch(err => {
    console.error("Error loading trips:", err);
    tripsContainer.innerHTML = "<p>Error loading trips.</p>";
  });
