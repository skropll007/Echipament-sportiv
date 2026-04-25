const db = {
  categorii: [
    { id: 1, nume: "Îmbrăcăminte sportivă" },
    { id: 2, nume: "Încălțăminte" },
    { id: 3, nume: "Echipamente fitness" }
  ],
  produse: [
    { id:1,  nume:"Tricou alergare Nike Dri-FIT",        categorie_id:1, brand:"Nike",         pret_lei:149.99, stoc:60, rating:4.6, reviews:124 },
    { id:2,  nume:"Pantaloni scurți Adidas Own the Run", categorie_id:1, brand:"Adidas",       pret_lei:129.99, stoc:45, rating:4.4, reviews:89  },
    { id:3,  nume:"Colanți compresie Under Armour",      categorie_id:1, brand:"Under Armour", pret_lei:189.99, stoc:38, rating:4.7, reviews:203 },
    { id:4,  nume:"Jachetă impermeabilă Puma",           categorie_id:1, brand:"Puma",         pret_lei:349.99, stoc:22, rating:4.5, reviews:67  },
    { id:5,  nume:"Top sport Decathlon",                 categorie_id:1, brand:"Decathlon",    pret_lei:59.99,  stoc:80, rating:4.2, reviews:311 },
    { id:6,  nume:"Pantofi alergare Nike Pegasus 40",    categorie_id:2, brand:"Nike",         pret_lei:499.99, stoc:35, rating:4.9, reviews:347 },
    { id:7,  nume:"Ghete fotbal Adidas Predator Edge",   categorie_id:2, brand:"Adidas",       pret_lei:699.99, stoc:20, rating:4.8, reviews:185 },
    { id:8,  nume:"Pantofi sală Puma Tazon 7",           categorie_id:2, brand:"Puma",         pret_lei:279.99, stoc:28, rating:4.3, reviews:72  },
    { id:9,  nume:"Bocanci drumeție Salomon X Ultra 4",  categorie_id:2, brand:"Salomon",      pret_lei:899.99, stoc:15, rating:4.8, reviews:226 },
    { id:10, nume:"Adidași training Under Armour HOVR",  categorie_id:2, brand:"Under Armour", pret_lei:449.99, stoc:18, rating:4.5, reviews:93  },
    { id:11, nume:"Ganteră cauciucată 10 kg",            categorie_id:3, brand:"Decathlon",    pret_lei:149.99, stoc:30, rating:4.5, reviews:62  },
    { id:12, nume:"Saltea yoga TPE 10mm",                categorie_id:3, brand:"Decathlon",    pret_lei:99.99,  stoc:55, rating:4.6, reviews:214 },
    { id:13, nume:"Coardă sărit viteză",                 categorie_id:3, brand:"Under Armour", pret_lei:59.99,  stoc:75, rating:4.2, reviews:88  },
    { id:14, nume:"Bandă de rezistență set 5 buc",       categorie_id:3, brand:"Decathlon",    pret_lei:79.99,  stoc:50, rating:4.4, reviews:155 },
    { id:15, nume:"Kettlebell fontă 16 kg",              categorie_id:3, brand:"Nike",         pret_lei:299.99, stoc:20, rating:4.7, reviews:41  }
  ]
};

const images = {
  1:  "https://cdn.ozone.ro/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/10b6934b7e0af66da530639cdce8794c/tricou-pentru-barbati-nike---dri-fit-miler--negru-30.jpg",
  2:  "https://s13emagst.akamaized.net/products/50976/50975014/images/res_6e7fbb596e15a4aac416a29c137fcaf2.jpg",
  3:  "https://www.underarmour.ro/files/thumbs/files/images/slike_proizvoda/thumbs_800/1361588-100_800_1000px.jpg",
  4:  "https://img01.ztat.net/article/spp-media-p1/f359d4a918db44f28f6dbea2aa4c1cbc/ad6dfd2cf664409ea3bdd541b37d4776.jpg?imwidth=156&filter=packshot",
  5:  "https://contents.mediadecathlon.com/p2849676/k$fb4fe377230bc66e62bcf96401b9ca89/women-s-medium-support-crop-top-sports-bra-black.jpg",
  6:  "https://img01.ztat.net/article/spp-media-p1/7a36a287311b44d19fdd83dddc092217/047c8b3fdd0d48e0895104502c6ea601.jpg?imwidth=1800&filter=packshot",
  7:  "https://sportlandia.md/image/catalog/products/32/H02932/1.jpg",
  8:  "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/310378/08/sv01/fnd/PNA/fmt/png/Tazon-7-Evo-Men's-Running-Shoes",
  9:  "https://s13emagst.akamaized.net/products/68168/68167094/images/res_e84f19d4bbe0875453c941aaac7720b3.jpg",
  10: "https://sportlandia.md/image/catalog/products/01/3026266-001/1.jpg",
  11: "https://smadshop.md/image/cache/product/sport-otdyh-i-turizm/shtangi-ganteli-giri/hms/ganteli-shtanga-2v1-hms-sgp30-30kg-black-red-250x250.jpg",
  12: "https://media.ecom.md/swift/v1/AUTH_e78b75cf5be94082a583fedd6afb6222/ecom_prod/media/media/19/46290/43e3ad2baebfc3beb1ad167834ef9a12.webp",
  13: "https://justfit.ro/image/cache/accesorii/image/catalog/0-poze/0-TC97179/rfgfg-1500x1500.jpg",
  14: "https://4fizjo.ro/hpeciai/bf52890ddc2c1aae8a28a9d550f50b52/rum_pm_Set-de-5-elastice-de-rezistenta-POWER-BAND-25_11.webp",
  15: "https://4fizjo.ro/hpeciai/8a95ff9c04019488c17f5a44541a73dd/rum_pl_Kettlebell-greutate-din-fonta-16-kg-1212_9.webp"
};

const catLabels = { 1: "Îmbrăcăminte", 2: "Încălțăminte", 3: "Echipament" };
const catBadge  = { 1: "badge-1", 2: "badge-2", 3: "badge-3" };

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = '';
  for (let i = 0; i < 5; i++) {
    const color = i < full ? '#f59e0b' : (i === full && half ? '#f59e0b' : '#d1d5db');
    s += `<svg viewBox="0 0 20 20" fill="${color}"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  }
  return s;
}

function renderGrid(catFilter) {
  const grid = document.getElementById('grid');
  const filtered = catFilter === 0
    ? db.produse
    : db.produse.filter(p => p.categorie_id === catFilter);

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty">Niciun produs găsit.</div>';
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="card" style="animation-delay:${i * 0.05}s">
      <div class="card-img">
        <img src="${images[p.id]}" alt="${p.nume}" loading="lazy" onerror="this.style.display='none'">
        <span class="cat-badge ${catBadge[p.categorie_id]}">${catLabels[p.categorie_id]}</span>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.nume}</div>
        <div class="stars">
          ${stars(p.rating)}
          <span class="count">${p.rating.toFixed(1)} (${p.reviews})</span>
        </div>
        <div class="card-footer">
          <div class="price">${p.pret_lei.toFixed(2)} <span>LEI</span></div>
          <button class="btn-add" onclick="addToCart('${p.nume}')" title="Adaugă în coș">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderGrid(parseInt(tab.dataset.cat));
  });
});

let toastTimer;
function addToCart(name) {
  const toast = document.getElementById('toast');
  toast.textContent = `"${name}" adăugat în coș ✓`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function activateTabFromURL() {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('categorie');

  if (!catParam) return;

  const catId = parseInt(catParam);
  const targetTab = document.querySelector(`.tab[data-cat="${catId}"]`);

  if (targetTab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    targetTab.classList.add('active');
    renderGrid(catId);
  }
}

renderGrid(0);
activateTabFromURL();