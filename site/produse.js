document.addEventListener('DOMContentLoaded', () => {
  window.db = {
    produse: [
      {id:1,nume:"Tricou alergare Nike Dri-FIT",categorie_id:1,brand:"Nike",pret_lei:149.99,stoc:60,rating:4.6,reviews:124},
      {id:2,nume:"Pantaloni scurți Adidas Run",categorie_id:1,brand:"Adidas",pret_lei:129.99,stoc:45,rating:4.4,reviews:89},
      {id:3,nume:"Colanți Under Armour",categorie_id:1,brand:"Under Armour",pret_lei:189.99,stoc:38,rating:4.7,reviews:203},
      {id:4,nume:"Jachetă Puma",categorie_id:1,brand:"Puma",pret_lei:349.99,stoc:22,rating:4.5,reviews:67},
      {id:5,nume:"Top Decathlon",categorie_id:1,brand:"Decathlon",pret_lei:59.99,stoc:80,rating:4.2,reviews:311},
      {id:6,nume:"Nike Pegasus 40",categorie_id:2,brand:"Nike",pret_lei:499.99,stoc:35,rating:4.9,reviews:347},
      {id:7,nume:"Adidas Predator Edge",categorie_id:2,brand:"Adidas",pret_lei:699.99,stoc:20,rating:4.8,reviews:185},
      {id:8,nume:"Puma Tazon 7",categorie_id:2,brand:"Puma",pret_lei:279.99,stoc:28,rating:4.3,reviews:72},
      {id:9,nume:"Salomon X Ultra 4",categorie_id:2,brand:"Salomon",pret_lei:899.99,stoc:15,rating:4.8,reviews:226},
      {id:10,nume:"UA HOVR",categorie_id:2,brand:"Under Armour",pret_lei:449.99,stoc:18,rating:4.5,reviews:93},
      {id:11,nume:"Ganteră 10 kg",categorie_id:3,brand:"Decathlon",pret_lei:149.99,stoc:30,rating:4.5,reviews:62},
      {id:12,nume:"Saltea Yoga 10mm",categorie_id:3,brand:"Decathlon",pret_lei:99.99,stoc:55,rating:4.6,reviews:214},
      {id:13,nume:"Coardă viteză",categorie_id:3,brand:"Under Armour",pret_lei:59.99,stoc:75,rating:4.2,reviews:88},
      {id:14,nume:"Benzi rezistență",categorie_id:3,brand:"Decathlon",pret_lei:79.99,stoc:50,rating:4.4,reviews:155},
      {id:15,nume:"Kettlebell 16 kg",categorie_id:3,brand:"Nike",pret_lei:299.99,stoc:20,rating:4.7,reviews:41}
    ]
  };

  window.images = {
    1:"https://cdn.dsmcdn.com/mnresize/420/620/ty1597/prod/QC/20241102/19/67626156-f1f0-3aac-843b-937eea20c5e8/1_org_zoom.jpg",
    2:"https://s13emagst.akamaized.net/products/50976/50975014/images/res_6e7fbb596e15a4aac416a29c137fcaf2.jpg",
    3:"https://www.underarmour.ro/files/thumbs/files/images/slike_proizvoda/thumbs_800/1361588-100_800_1000px.jpg",
    4:"https://img01.ztat.net/article/spp-media-p1/f359d4a918db44f28f6dbea2aa4c1cbc/ad6dfd2cf664409ea3bdd541b37d4776.jpg?imwidth=1560&filter=packshot",
    5:"https://contents.mediadecathlon.com/p2849676/k$fb4fe377230bc66e62bcf96401b9ca89/women-s-medium-support-crop-top-sports-bra-black.jpg",
    6:"https://img01.ztat.net/article/spp-media-p1/7a36a287311b44d19fdd83dddc092217/047c8b3fdd0d48e0895104502c6ea601.jpg?imwidth=1800&filter=packshot",
    7:"https://sportlandia.md/image/catalog/products/32/H02932/1.jpg",
    8:"https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/310378/08/sv01/fnd/PNA/fmt/png/Tazon-7-Evo-Men's-Running-Shoes",
    9:"https://s13emagst.akamaized.net/products/68168/68167094/images/res_e84f19d4bbe0875453c941aaac7720b3.jpg",
    10:"https://sportlandia.md/image/catalog/products/01/3026266-001/1.jpg",
    11:"https://smadshop.md/image/cache/product/sport-otdyh-i-turizm/shtangi-ganteli-giri/hms/ganteli-shtanga-2v1-hms-sgp30-30kg-black-red-250x250.jpg",
    12:"https://media.ecom.md/swift/v1/AUTH_e78b75cf5be94082a583fedd6afb6222/ecom_prod/media/media/19/46290/43e3ad2baebfc3beb1ad167834ef9a12.webp",
    13:"https://justfit.ro/image/cache/accesorii/image/catalog/0-poze/0-TC97179/rfgfg-1500x1500.jpg",
    14:"https://4fizjo.ro/hpeciai/bf52890ddc2c1aae8a28a9d550f50b52/rum_pm_Set-de-5-elastice-de-rezistenta-POWER-BAND-25_11.webp",
    15:"https://4fizjo.ro/hpeciai/8a95ff9c04019488c17f5a44541a73dd/rum_pl_Kettlebell-greutate-din-fonta-16-kg-1212_9.webp"
  };

  const catLabels = {1:"Îmbrăcăminte",2:"Încălțăminte",3:"Echipament"};
  const catBadge = {1:"badge-1",2:"badge-2",3:"badge-3"};
  const CART_KEY = "sportfit_cart";
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.updateCartUI = () => {
    const el = document.getElementById("cartCount");
    if(el) { 
      el.textContent = cart.reduce((s,i)=>s+i.qty,0); 
      el.style.display = cart.length ? "flex" : "none"; 
    }
  };

  window.addToCartById = id => {
    const p = window.db.produse.find(x=>x.id===id); 
    if(!p)return;
    const ex = cart.find(i=>i.id===id);
    if(ex) ex.qty++; 
    else cart.push({id,qty:1});
    saveCart(); 
    window.updateCartUI(); 
    window.showToast(`${p.nume} adăugat ✓`);
  };

  window.changeQty = (id, d) => {
    const i = cart.find(x=>x.id===id); 
    if(!i)return;
    i.qty += d; 
    if(i.qty<=0) cart = cart.filter(x=>x.id!==id);
    saveCart(); 
    window.updateCartUI();
    const dr = document.getElementById("cartDrawer");
    if(dr && dr.classList.contains("open")) window.renderCartDrawer();
  };

  window.renderCartDrawer = () => {
    const box = document.getElementById("cartItems"), foot = document.getElementById("cartFooter"), tot = document.getElementById("cartTotal");
    if(!box) return;
    if(!cart.length) { 
      box.innerHTML='<div class="cart-empty"><span>Coșul este gol</span></div>'; 
      if(foot)foot.style.display="none"; 
      return; 
    }
    let g=0;
    box.innerHTML = cart.map(i=>{
      const p=window.db.produse.find(x=>x.id===i.id); 
      if(!p)return"";
      const lt=p.pret_lei*i.qty; 
      g+=lt;
      return `<div class="cart-item"><img class="cart-item-img" src="${window.images[p.id]}" alt="${p.nume}" onerror="this.style.display='none'"><div class="cart-item-info"><div class="cart-item-brand">${p.brand}</div><div class="cart-item-name">${p.nume}</div><div class="cart-item-price">${lt.toFixed(2)} LEI</div></div><div class="cart-item-qty"><button class="qty-btn" onclick="window.changeQty(${p.id},-1)">−</button><span class="qty-val">${i.qty}</span><button class="qty-btn" onclick="window.changeQty(${p.id},1)">+</button></div></div>`;
    }).join("");
    if(foot)foot.style.display="block";
    if(tot)tot.textContent=g.toFixed(2)+" LEI";
  };

  window.openCart = () => { 
    window.renderCartDrawer(); 
    document.getElementById("cartDrawer")?.classList.add("open"); 
    document.getElementById("cartOverlay")?.classList.add("open"); 
    document.body.style.overflow="hidden"; 
  };

  window.closeCart = () => { 
    document.getElementById("cartDrawer")?.classList.remove("open"); 
    document.getElementById("cartOverlay")?.classList.remove("open"); 
    document.body.style.overflow=""; 
  };

  document.getElementById("cartBtn")?.addEventListener("click", window.openCart);
  document.getElementById("cartClose")?.addEventListener("click", window.closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", window.closeCart);
  document.getElementById("cartCheckout")?.addEventListener("click", () => window.location.href="cos.html");

  const ham=document.getElementById("hamburger"), mob=document.getElementById("mobileMenu");
  if(ham&&mob) ham.addEventListener("click",()=>{ham.classList.toggle("open");mob.classList.toggle("open");});

  window.renderGrid = f => {
    const g=document.getElementById("grid"); 
    if(!g)return;
    const d=f===0?window.db.produse:window.db.produse.filter(p=>p.categorie_id===f);
    g.innerHTML = d.length ? d.map((p,i)=>`<div class="card" style="animation-delay:${i*0.05}s"><div class="card-img"><img src="${window.images[p.id]}" alt="${p.nume}" loading="lazy" onerror="this.style.display='none'"><span class="cat-badge ${catBadge[p.categorie_id]}">${catLabels[p.categorie_id]}</span></div><div class="card-body"><div class="card-brand">${p.brand}</div><div class="card-name">${p.nume}</div><div class="card-footer"><div class="price">${p.pret_lei.toFixed(2)}<span> LEI</span></div><button class="btn-add" onclick="window.addToCartById(${p.id})"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button></div></div></div>`).join("") : '<div class="empty">Niciun produs.</div>';
  };

  document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));t.classList.add("active");window.renderGrid(+t.dataset.cat);}));
  
  let tT; 
  window.showToast = m => { 
    const t=document.getElementById("toast"); 
    if(!t)return; 
    t.textContent=m; 
    t.classList.add("show"); 
    clearTimeout(tT); 
    tT=setTimeout(()=>t.classList.remove("show"),2000); 
  };

  window.updateCartUI(); 
  window.renderGrid(0);
});