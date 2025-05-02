const itineraries = [
    {
      title: "Paris Explorer",
      details: "Visit Eiffel Tower, Louvre Museum, and enjoy local cafes."
    },
    {
      title: "Tokyo Food Tour",
      details: "Experience sushi, ramen, and the Shibuya crossing."
    },
    {
      title: "Bali Adventure",
      details: "Surfing, temples, and scenic rice terraces."
    }
  ];
  
  const hotels = [
    {
      name: "Hotel Lux Paris",
      desc: "4-star hotel near Eiffel Tower with breakfast included."
    },
    {
      name: "Tokyo Inn Central",
      desc: "Modern stay near Shinjuku, top-rated ramen nearby."
    },
    {
      name: "Bali Beach Resort",
      desc: "Beachfront with infinity pool and spa services."
    }
  ];
  
  let currentItinerary = 0;
  let currentHotel = 0;
  let selectedItinerary = null;
  let selectedHotel = null;
  
  const itineraryContainer = document.getElementById("itinerary-container");
  const hotelContainer = document.getElementById("hotel-container");
  const saveButton = document.getElementById("save-trip");
  
  function renderItinerary(index) {
    const item = itineraries[index];
    itineraryContainer.innerHTML = `
      <div class="itinerary-card">
        <h3>${item.title}</h3>
        <p>${item.details}</p>
        <button onclick="selectItinerary(${index})">Select This Itinerary</button>
      </div>
    `;
  }
  
  function renderHotel(index) {
    const item = hotels[index];
    hotelContainer.innerHTML = `
      <div class="hotel-card">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <button onclick="selectHotel(${index})">Select This Hotel</button>
      </div>
    `;
  }
  
  function selectItinerary(index) {
    selectedItinerary = itineraries[index];
    checkSelections();
  }
  
  function selectHotel(index) {
    selectedHotel = hotels[index];
    checkSelections();
  }
  
  function checkSelections() {
    if (selectedItinerary && selectedHotel) {
      saveButton.disabled = false;
    }
  }
  
  document.getElementById("prev-itinerary").onclick = () => {
    currentItinerary = (currentItinerary - 1 + itineraries.length) % itineraries.length;
    renderItinerary(currentItinerary);
  };
  
  document.getElementById("next-itinerary").onclick = () => {
    currentItinerary = (currentItinerary + 1) % itineraries.length;
    renderItinerary(currentItinerary);
  };
  
  document.getElementById("prev-hotel").onclick = () => {
    currentHotel = (currentHotel - 1 + hotels.length) % hotels.length;
    renderHotel(currentHotel);
  };
  
  document.getElementById("next-hotel").onclick = () => {
    currentHotel = (currentHotel + 1) % hotels.length;
    renderHotel(currentHotel);
  };
  
  saveButton.onclick = () => {
    const trip = {
      itinerary: selectedItinerary,
      hotel: selectedHotel
    };
    const saved = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    saved.push(trip);
    localStorage.setItem("savedTrips", JSON.stringify(saved));
    alert("Trip Saved!");
    window.location.href = "my-trips.html";
  };
  
  // Initial render
  renderItinerary(currentItinerary);
  renderHotel(currentHotel);
  