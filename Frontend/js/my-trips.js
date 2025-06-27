const tripsContainer = document.getElementById("trips-container");
const token = localStorage.getItem("token");

if (!token) {
  tripsContainer.innerHTML = "<p>Please login to view your trips.</p>";
} else {
  fetch("http://localhost:8086/api/trips/my-trips", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        tripsContainer.innerHTML = `<p>Failed to load trips: ${data.message || "Unknown error"}</p>`;
        return;
      }

      const trips = data.trips;

      if (!trips || trips.length === 0) {
        tripsContainer.innerHTML = "<p>No trips saved yet.</p>";
        return;
      }

      trips.forEach((trip, index) => {
        const div = document.createElement("div");
        div.classList.add("itinerary-card");

        const itineraryTitle = trip.itinerary?.title || "Untitled Trip";
        const itineraryDetails = trip.itinerary?.details || "No details available.";
        const hotelName = trip.hotel?.name || "N/A";
        const hotelDesc = trip.hotel?.desc || "";

        div.innerHTML = `
          <h3>Trip ${index + 1}</h3>
          <p><strong>Itinerary:</strong> ${itineraryTitle}</p>
          <p>${itineraryDetails}</p>
          <p><strong>Hotel:</strong> ${hotelName}</p>
          <p>${hotelDesc}</p>
          <button class="delete-trip" data-id="${trip._id}">🗑 Delete</button>
        `;

        tripsContainer.appendChild(div);
      });

      // Attach delete handlers
      document.querySelectorAll(".delete-trip").forEach(button => {
        button.addEventListener("click", async () => {
          const tripId = button.getAttribute("data-id");
          const confirmDelete = confirm("Are you sure you want to delete this trip?");
          if (!confirmDelete) return;

          try {
            const res = await fetch(`http://localhost:8086/api/trips/${tripId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            const result = await res.json();
            if (result.success) {
              alert("Trip deleted successfully.");
              location.reload(); // reload to refresh trip list
            } else {
              alert("Delete failed: " + result.message);
            }
          } catch (err) {
            console.error("Delete error:", err);
            alert("Something went wrong while deleting.");
          }
        });
      });
    })
    .catch(err => {
      console.error("Error loading trips:", err);
      tripsContainer.innerHTML = "<p>Error loading trips. Try again later.</p>";
    });
}
