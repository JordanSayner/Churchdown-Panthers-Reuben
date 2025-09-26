let playersData = {}; // Store players data
let seasonData = {}; // Store season data

// Fetch the JSON files
async function fetchData() {
  try {
    // Load season data
    const seasonResponse = await fetch('./json/season.json');
    seasonData = await seasonResponse.json();

    displayMatchDetails();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Display match details for the season (sorted backwards)
function displayMatchDetails() {
  const matchTableBody = document.getElementById('matchDetails').querySelector('tbody');
  matchTableBody.innerHTML = ''; // Clear previous match details

  const gameWeeks = Object.keys(seasonData.game_weeks);
  for (let i = gameWeeks.length - 1; i >= 0; i--) { // Iterate backwards
    const week = gameWeeks[i];
    const match = seasonData.game_weeks[week];
    
    // Create a table row for each match
    const row = document.createElement('tr');
    
    const mergedCell = document.createElement('td');
    mergedCell.setAttribute('data-label', 'Match Info');
    
    // Use innerHTML so you can embed <strong> and format as you like
    mergedCell.innerHTML = `
      <span><small>${match.date}</small> &dash; <small>${match.time}</small><br /></span><strong>${match.opponent}</strong><br /><span><small>${match.venue}</small> &dash; <small>${match.location}</small></span>
    `;
    
    row.appendChild(mergedCell);

    const scoreCell = document.createElement('td');
    scoreCell.setAttribute('data-label', 'Score');
    scoreCell.textContent = match.score  || 'N/A';
    row.appendChild(scoreCell);
  
    
    // Resolving player names dynamically for "Player of the Match"
    const notesCell = document.createElement('td');
    notesCell.setAttribute('data-label', 'Notes');
    notesCell.textContent = match.notes;
    row.appendChild(notesCell);

    matchTableBody.appendChild(row);
  }
}

// Initialize app
fetchData();












function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}





















/////
/////////
// ANIMATIONS
/////////
////

document.addEventListener('DOMContentLoaded', (event) => {
  const observerOptions = {
      root: null, // Use the viewport as the container
      threshold: 0.25 // Trigger when 25% of the element is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('start-animation');
          } else {
              entry.target.classList.remove('start-animation');
          }
      });
  }, observerOptions);

  // Select all elements with the class 'animated-element' and observe each one
  const targetElements = document.querySelectorAll('.animated-element');
  targetElements.forEach(element => {
      observer.observe(element);
      //console.log(element);
  });
});