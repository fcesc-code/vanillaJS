const theatreRows = 15;
const seatsPerRow = 12;

/* CREATE DOM ELEMENTS */
function createSelectorFromList(where, elementId, labelText, data){
  let container = document.querySelector(where);

  let selector = document.createElement('select');
  selector.id = elementId;
  for (let [index, movie] of data.entries()) {
    let option = document.createElement('option');
    option.value = movie.price;
    option.id = index;
    option.innerHTML = `${movie.title} - ${movie.rating}/10 - ${((movie.price) / 100).toFixed(2)} €`;
    selector.appendChild(option);
  }
  selector.addEventListener('change', (event) => {
    event.preventDefault();
    setMovieData();
    updateSelectedCount();
  });

  let label = document.createElement('label');
  label.for = elementId;
  label.innerHTML = labelText;

  container.appendChild(label);
  container.appendChild(selector);
}

function drawCinemaPlan(where, rows, seats){
  let container = document.querySelector(where);

  let screen = document.createElement('div');
  screen.className = 'plan__screen';
  container.appendChild(screen);

  let theater = document.createElement('div');
  theater.className = 'plan__theater';
  for (let i = 0; i < rows; i++){
    let row = document.createElement('div');
    row.className = 'plan__row';

    for (let j = 0; j < seats; j++){
      let seat = document.createElement('div');
      
      const probability = Math.floor(Math.random()*10);
      let type = '';
      if (probability % 5 === 0) { type = 'occupied' }

      seat.className = `plan__seat ${type}`;
      seat.id = `${i}-${j}`;

      row.appendChild(seat);
    }

    theater.appendChild(row);
  }
  container.appendChild(theater);
}

/* STORAGE */
function setMovieData() {
  const selector = document.querySelector('#movie__selector');
  const selected = selector.options[selector.selectedIndex].id;
  const movie = MOVIES_LIST[selected];
  localStorage.setItem('selectedMovie', JSON.stringify(movie));
}

function setSeatsData(data) {
  localStorage.setItem('selectedSeats', data);
}

/* UI */
function addListeners(where, trigger, callback){
  let container = document.querySelector(where);
  container.addEventListener(trigger, callback);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.selected');
  const counter = document.querySelector('#seatCounter');
  const total = document.querySelector('#totalPrice');
  const selectedMovie = document.querySelector('#movie__selector');
  const price = +selectedMovie.value;

  const selected = [...selectedSeats].map(seat => seat.id);
  setSeatsData(selected);

  localStorage.setItem('selectedSeats', JSON.stringify(selected));

  counter.innerText = selected.length;
  total.innerText = ((selected.length * price) / 100).toFixed(2);
}

function toggleClass(className){
  return (event) => { 
    if (!event.target.classList.contains('occupied') && event.target.classList.contains('plan__seat')){
      event.target.classList.toggle(className);
      updateSelectedCount();
    }
  }
}

function populateUI(){
  const selectedSeats = [ ...JSON.parse(localStorage.getItem('selectedSeats')) ];
  const selectedMovie = { ...JSON.parse(localStorage.getItem('selectedMovie')) } ;

  if (selectedSeats !== null && selectedSeats.length > 0) {
    for (let seat of selectedSeats){
      const thisSeat = document.getElementById(seat);
      let newClass = thisSeat.className.replace(' occupied', ''); // remove mock occupied seats if they were already selected
      thisSeat.className = `${newClass} selected`;
    }
  } else {
    updateSelectedCount();
  } 
  if (selectedMovie !==  null && Object.keys(selectedMovie).length > 0) {
    const index = MOVIES_LIST.findIndex(movie => movie.title === selectedMovie.title);
    const selector = document.querySelector('#movie__selector');
    selector.selectedIndex = index;
  }

  generateRandomOccupiedSeats();
};

function generateRandomOccupiedSeats(){
  
}

/* INIT */
function init(){
  createSelectorFromList('.movies__container', 'movie__selector', 'Select a movie:', MOVIES_LIST );
  drawCinemaPlan('.cinemaPlan__container', theatreRows, seatsPerRow);
  addListeners('.cinemaPlan__container', 'click', toggleClass('selected'));
  populateUI();
}

init();