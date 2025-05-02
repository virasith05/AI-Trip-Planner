document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.trip-form');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const data = {
        destination: form.querySelector('input[type="text"]').value,
        date: form.querySelector('input[type="date"]').value,
        budget: form.querySelector('input[type="number"]').value,
        interests: form.querySelectorAll('select')[0].value,
        duration: form.querySelectorAll('input[type="number"]')[1].value,
        travelType: form.querySelectorAll('select')[1].value
      };
  
      localStorage.setItem('tripData', JSON.stringify(data));
      window.location.href = 'itinerary.html';
    });
  });
  