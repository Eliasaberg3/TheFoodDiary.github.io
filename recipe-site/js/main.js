// Sample recipe data and UI interactions
const recipes = [
  {
    id: 'ravioli-al-fungi-e-ricotta',
    title: 'Ravioli al fungi e ricotta',
    subtitle: 'Ravioli with mushrooms and ricotta',
    img: 'assets/raviolichampinjoner.jpg',
    time: '1h 10m',
    servings: '4',
    ingredients: [
      'Pastadeg', '200g färsk ricotta', '200g champinjoner', '2 vitlöksklyftor', ' en näve grönkål', 'parmesanost att riva', 'olivolja'
    ],
    steps: [
      'Bryn svamp, vitlök i olivolja och smör',
      'Tillsätt grönkål och fräs tills den mjuknar men har kvar lite spänst.',
      'Fyllning: Stek vitlök och finriven champinjon i smör. Tillsätt i en skål den stekta blandningen till ricotta, citronskal, citronjuice samt riven parmesanost. Salta och peppra.',
      'Koka raviolin i riktligt saltat vatten i ca 4 minuter, de ska ha lite motstånd kvar.',
      'Spara lite av pastavattnet. Stek raviolin snabbt i smör och häll över pastavattnet för att få en smörsky.',
      'servera pastan i botten och häll över smörskyn. Toppa med den stekta svampen, grönkålen och riven parmesan. Dressa med olivolja'
    ]
  },
  {
    id: 'pasta-arrabbiata',
    title: 'Pasta Arrabbiata',
    subtitle: '',
  img: 'assets/arrabiata.jpg',
    time: '30 min',
    servings: '2',
    ingredients: ['400 g pasta', 'Tomatpuré', 'chili torkad eller färsk', 'vitlök', 'Parmesanost', 'Vispgrädde', 'Olivolja'],
    steps: ['Fräs vitlök och chili i olivolja.', 'Tillsätt tomatpuré och låt fräsa. Under tiden, koka upp pastavatten och lägg i pastan', 'Tillsätt vitt vin till de stekta ingredienserna och låt reducera. Tillsätt därefter en skvätt grädde.', ' Blanda i den kokta pastan när den har 2 minuter kvar enligt förpackningen och låt koka klart i såsen.', 'Servera toppat med parmesanost och en bra olivolja']
  },
  {
    id: 'bouillabaisse',
    title: 'Bouillabaisse (simplified)',
    subtitle: 'Fish stew from Marseille',
  img: 'assets/bouillabaisse.svg',
    time: '50m',
    servings: '4',
    ingredients: ['500g mixed fish pieces', '1 fennel bulb', '2 tomatoes', '1 leek', 'fish stock', 'saffron', 'olive oil', 'salt & pepper'],
    steps: ['Sauté vegetables until soft.', 'Add tomatoes and stock, simmer 20 minutes.', 'Add fish and cook gently 6-8 minutes.', 'Serve with crusty bread and rouille if desired.']
  }
];

const recipesEl = document.getElementById('recipes');
const searchEl = document.getElementById('search');
const yearEl = document.getElementById('year');

// UI elements affected by translation
const langSelect = document.getElementById('langSelect');
const heroTitle = document.getElementById('hero-title');
const heroSub = document.getElementById('hero-sub');
const modalIngredientsLabel = document.getElementById('modal-ingredients-label');
const modalStepsLabel = document.getElementById('modal-steps-label');

// Modal elements
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalIngredients = document.getElementById('modal-ingredients');
const modalSteps = document.getElementById('modal-steps');
const metaEl = document.querySelector('.modal .meta');

function renderRecipes(list){
  recipesEl.innerHTML = '';
  if(list.length === 0){
    recipesEl.innerHTML = `<p class="muted">${translations[currentLang].noRecipesFound}</p>`;
    return;
  }
  list.forEach(r => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${r.img}" alt="${r.title}">
      <h3>${r.title}</h3>
      <p class="subtitle">${r.subtitle}</p>
      <p class="meta">⏱ ${r.time} • ${translations[currentLang].serves} ${r.servings}</p>
      <div class="actions">
        <button class="btn" data-id="${r.id}">${translations[currentLang].view}</button>
        <button class="btn ghost" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(r.title+' recipe')}','_blank')">${translations[currentLang].learn}</button>
      </div>
    `;
    recipesEl.appendChild(card);
  });
}

function openModal(id){
  const r = recipes.find(x => x.id === id);
  if(!r) return;
  modalTitle.textContent = r.title;
  metaEl.textContent = `⏱ ${r.time} • ${translations[currentLang].serves} ${r.servings}`;
  modalImg.src = r.img;
  modalImg.alt = r.title;
  modalIngredients.innerHTML = r.ingredients.map(i => `<li>${i}</li>`).join('');
  modalSteps.innerHTML = r.steps.map(s => `<li>${s}</li>`).join('');
  modal.setAttribute('aria-hidden','false');
}

function close(){
  modal.setAttribute('aria-hidden','true');
}

// events
document.addEventListener('click', (e) => {
  if(e.target.matches('.btn[data-id]')){
    openModal(e.target.getAttribute('data-id'));
  }
});

closeModal.addEventListener('click', close);
modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });

searchEl.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q){ renderRecipes(recipes); return; }
  const filtered = recipes.filter(r => {
    return r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q) || r.ingredients.join(' ').toLowerCase().includes(q);
  });
  renderRecipes(filtered);
});

// Translations
const translations = {
  en: {
    searchPlaceholder: "Search recipes, e.g. 'ratatouille'",
    searchAria: 'Search recipes',
    heroTitle: 'Recipes to savor',
    heroSub: 'Classic and seasonal dishes crafted simply. Browse, search and click a recipe for details.',
    view: 'View',
    learn: 'Learn',
    serves: 'Serves',
    noRecipesFound: 'No recipes found.' ,
    modalIngredients: 'Ingredients',
    modalSteps: 'Steps'
  },
  sv: {
    searchPlaceholder: "Sök recept, t.ex. 'ravioli'",
    searchAria: 'Sök recept',
    heroTitle: 'Recept att njuta av',
    heroSub: 'Klassiska och säsongsbetonade rätter skapade enkelt. Bläddra, sök och klicka på ett recept för detaljer.',
    view: 'Visa',
    learn: 'Läs mer',
    serves: 'Portioner',
    noRecipesFound: 'Inga recept hittades.',
    modalIngredients: 'Ingredienser',
    modalSteps: 'Steg'
  }
};

let currentLang = document.documentElement.lang || 'en';

function applyTranslations(){
  // set lang attribute
  document.documentElement.lang = currentLang;
  // search
  searchEl.placeholder = translations[currentLang].searchPlaceholder;
  searchEl.setAttribute('aria-label', translations[currentLang].searchAria);
  // hero
  if(heroTitle) heroTitle.textContent = translations[currentLang].heroTitle;
  if(heroSub) heroSub.textContent = translations[currentLang].heroSub;
  // modal labels
  if(modalIngredientsLabel) modalIngredientsLabel.textContent = translations[currentLang].modalIngredients;
  if(modalStepsLabel) modalStepsLabel.textContent = translations[currentLang].modalSteps;
  // re-render cards so buttons/meta update
  renderRecipes(typeof lastRenderedList !== 'undefined' ? lastRenderedList : recipes);
}

// remember the currently rendered list (for re-render after language change)
let lastRenderedList = recipes;

// language selector
if(langSelect){
  // initialize value
  langSelect.value = currentLang;
  langSelect.addEventListener('change', (e)=>{
    currentLang = e.target.value;
    applyTranslations();
  });
}

// keep search filter state for re-render
searchEl.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q){ lastRenderedList = recipes; renderRecipes(recipes); return; }
  const filtered = recipes.filter(r => {
    return r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q) || r.ingredients.join(' ').toLowerCase().includes(q);
  });
  lastRenderedList = filtered;
  renderRecipes(filtered);
});

// init
applyTranslations();
yearEl.textContent = new Date().getFullYear();

// export for debugging if needed
window.__recipes = recipes;
