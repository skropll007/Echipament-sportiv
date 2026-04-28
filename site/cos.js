document.addEventListener('DOMContentLoaded', () => {
  const KEY_CART    = "sportfit_cart";
  const KEY_PENDING = "sportfit_pending_order";
  const LIVRARE     = 15.00;

  /* ── helpers ── */
  const getCart  = () => JSON.parse(localStorage.getItem(KEY_CART)) || [];
  const saveCart = c  => localStorage.setItem(KEY_CART, JSON.stringify(c));
  let cart = getCart();

  /* ── badge navbar ── */
  const refreshBadge = () => {
    const el = document.getElementById("cartCount");
    if (!el) return;
    const qty = cart.reduce((s, i) => s + i.qty, 0);
    el.textContent   = qty;
    el.style.display = qty ? "flex" : "none";
  };

  /* ── toast ── */
  function showToast(msg, color) {
    let container = document.getElementById("toastContainer");
    if (!container) { container = document.createElement("div"); container.id = "toastContainer"; document.body.appendChild(container); }
    const toast = document.createElement("div");
    toast.className = "sf-toast";
    if (color) toast.style.borderLeftColor = color;
    toast.textContent = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => { toast.classList.remove("show"); toast.addEventListener("transitionend", () => toast.remove()); }, 2800);
  }

  /* ── render ── */
  const render = () => {
    const box = document.getElementById("cartContent");
    const sum = document.getElementById("cartSummary");
    if (!box) return;
    refreshBadge();

    if (!cart.length) {
      box.innerHTML = `
        <div class="cart-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="60" height="60"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h2>Coșul tău este gol</h2>
          <p>Adaugă produse din catalog pentru a continua.</p>
          <a href="produse.html" class="btn-primary-cart" style="text-decoration:none;display:inline-block;text-align:center;">Mergi la produse →</a>
        </div>`;
      if (sum) sum.style.display = "none";
      return;
    }

    let sub = 0;
    const rows = cart.map(i => {
      const p   = window.db?.produse.find(x => x.id === i.id) || { nume: "Produs #" + i.id, brand: "", pret_lei: 0 };
      const lt  = p.pret_lei * i.qty;
      sub += lt;
      return `
        <tr data-id="${p.id}">
          <td class="td-img">
            <img src="${window.images?.[p.id] || ''}" alt="${p.nume}" onerror="this.style.display='none'">
          </td>
          <td class="td-info">
            <span class="cart-brand">${p.brand}</span>
            <span class="cart-name">${p.nume}</span>
            <span class="cart-unit">${p.pret_lei.toFixed(2)} LEI / buc.</span>
          </td>
          <td class="td-qty">
            <div class="qty-ctrl">
              <button class="qty-btn cart-qty-btn" data-id="${p.id}" data-d="-1">−</button>
              <span class="qty-val">${i.qty}</span>
              <button class="qty-btn cart-qty-btn" data-id="${p.id}" data-d="1">+</button>
            </div>
          </td>
          <td class="td-total">${lt.toFixed(2)} LEI</td>
          <td class="td-remove">
            <button class="btn-remove-row" data-id="${p.id}" title="Șterge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </td>
        </tr>`;
    }).join("");

    box.innerHTML = `
      <div class="cart-table-wrap">
        <table class="cart-table">
          <thead>
            <tr>
              <th colspan="2">PRODUS</th>
              <th>CANTITATE</th>
              <th>TOTAL LINIE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    document.getElementById("subtotalVal").textContent = sub.toFixed(2) + " LEI";
    document.getElementById("livrareVal").textContent  = LIVRARE.toFixed(2) + " LEI";
    document.getElementById("totalVal").textContent    = (sub + LIVRARE).toFixed(2) + " LEI";
    if (sum) sum.style.display = "block";

    /* qty + remove events */
    box.querySelectorAll(".cart-qty-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = +btn.dataset.id, d = +btn.dataset.d;
        const it = cart.find(x => x.id === id);
        if (!it) return;
        it.qty += d;
        if (it.qty <= 0) cart = cart.filter(x => x.id !== id);
        saveCart(cart);
        render();
      });
    });

    box.querySelectorAll(".btn-remove-row").forEach(btn => {
      btn.addEventListener("click", () => {
        const id   = +btn.dataset.id;
        const p    = window.db?.produse.find(x => x.id === id);
        cart = cart.filter(x => x.id !== id);
        saveCart(cart);
        showToast(`${p?.nume || "Produs"} eliminat din coș.`, "#e74c3c");
        render();
      });
    });
  };

  /* ── clear cart ── */
  document.getElementById("clearCart")?.addEventListener("click", () => {
    if (!confirm("Ești sigur că vrei să golești coșul?")) return;
    cart = []; saveCart(cart);
    showToast("Coșul a fost golit.", "#e74c3c");
    render();
  });

  /* ── checkout → deschide modal ── */
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (!cart.length) { showToast("Coșul este gol!", "#e74c3c"); return; }
    const sub = cart.reduce((s, i) => {
      const p = window.db?.produse.find(x => x.id === i.id);
      return s + (p?.pret_lei || 0) * i.qty;
    }, 0);
    document.getElementById("modalTotal").textContent = (sub + LIVRARE).toFixed(2) + " LEI";
    document.getElementById("modalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  });

  /* ── modal close ── */
  const closeModal = () => {
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  };
  document.getElementById("btnCloseModal")?.addEventListener("click", closeModal);
  document.getElementById("modalOverlay")?.addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });

  /* ── confirm order ── */
  document.getElementById("btnConfirmOrder")?.addEventListener("click", () => {
    const nume = document.getElementById("fieldNume")?.value.trim();
    const tel  = document.getElementById("fieldTel")?.value.trim();
    const adr  = document.getElementById("fieldAdresa")?.value.trim();

    if (!nume || !tel || !adr) { showToast("Completează toate câmpurile!", "#e74c3c"); return; }

    /* validări simple */
    if (nume.length < 5) { showToast("Introduceți numele complet (min. 5 caractere).", "#e74c3c"); return; }
    if (!/^(0[67]\d{8}|\+40[67]\d{8})$/.test(tel.replace(/\s/g, ""))) {
      showToast("Format telefon invalid. Ex: 07XX XXX XXX", "#e74c3c"); return;
    }
    if (adr.length < 10) { showToast("Adresa este prea scurtă.", "#e74c3c"); return; }

    /* salvează comanda */
    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    const order = {
      id: orderId,
      data: new Date().toLocaleString("ro-RO"),
      client: { nume, telefon: tel, adresa: adr },
      produse: cart.map(i => ({ id: i.id, cantitate: i.qty })),
      status: "plasata"
    };
    const all = JSON.parse(localStorage.getItem("sportfit_orders")) || [];
    all.push(order);
    localStorage.setItem("sportfit_orders", JSON.stringify(all));
    localStorage.setItem(KEY_PENDING, JSON.stringify(cart));

    cart = []; saveCart(cart);

    /* success state */
    const box = document.getElementById("modalBox");
    box.classList.add("success");
    document.getElementById("modalContent").innerHTML = `
      <div class="modal-success">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="40" height="40"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3>Comandă Plasată!</h3>
        <p>Mulțumim, <strong>${nume}</strong>!<br>Te vom contacta la <strong>${tel}</strong> pentru confirmare.</p>
        <p class="success-addr">📍 ${adr}</p>
        <button id="btnCloseSuccess" class="btn-confirm" style="background:#2e7d32;">OK, mulțumesc!</button>
      </div>`;

    document.getElementById("btnCloseSuccess")?.addEventListener("click", () => {
      closeModal();
      box.classList.remove("success");
      render();
    });
  });

  /* ── hamburger ── */
  const ham = document.getElementById("hamburger"), mob = document.getElementById("mobileMenu");
  if (ham && mob) ham.addEventListener("click", () => { ham.classList.toggle("open"); mob.classList.toggle("open"); });

  render();
});