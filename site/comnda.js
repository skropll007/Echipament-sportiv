document.addEventListener('DOMContentLoaded', () => {
  const ham = document.getElementById("hamburger"), mob = document.getElementById("mobileMenu");
  if (ham && mob) ham.addEventListener("click", () => { ham.classList.toggle("open"); mob.classList.toggle("open"); });

  /* ── Cart preview ── */
  const pending = JSON.parse(localStorage.getItem("sportfit_pending_order")) || [];
  const prev = document.getElementById("cartPreview");
  if (prev) {
    if (!pending.length) {
      prev.innerHTML = `<p style="color:#6b748a;font-size:.9rem;">Nicio selecție din coș. <a href="cos.html" style="color:#2563eb;font-weight:600;">Mergi la coș →</a></p>`;
    } else {
      let sub = 0;
      prev.innerHTML =
        `<h3 style="font-family:'Barlow Condensed',sans-serif;font-weight:800;margin-bottom:14px;font-size:1rem;color:#1a1e2e;">Produse din coș</h3>` +
        pending.map(i => {
          const p = window.db?.produse.find(x => x.id === i.id) || { nume: "Produs #" + i.id, pret_lei: 0 };
          const lt = p.pret_lei * i.qty; sub += lt;
          return `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e2e6f0;font-size:.88rem;color:#374151;">
            <span>${p.nume} × ${i.qty}</span>
            <strong>${lt.toFixed(2)} LEI</strong>
          </div>`;
        }).join("") +
        `<div style="text-align:right;margin-top:12px;font-weight:700;color:#2563eb;font-family:'Barlow Condensed',sans-serif;font-size:1.05rem;">
          Subtotal: ${sub.toFixed(2)} LEI
        </div>`;
    }
  }

  /* ── Validation ── */
  const fields = ["name", "email", "phone", "address"];
  const rules = {
    name:    v => v.trim().length >= 5,
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    phone:   v => /^(0[67]\d{8}|\+40[67]\d{8})$/.test(v.replace(/\s/g, "")),
    address: v => v.trim().length >= 10 && /\d/.test(v)
  };

  fields.forEach(id => {
    const el = document.getElementById(id), row = el?.closest(".form-group");
    if (!el || !row) return;
    const set = ok => { row.classList.toggle("valid", ok); row.classList.toggle("invalid", !ok); };
    el.addEventListener("input",  () => set(rules[id]?.(el.value)));
    el.addEventListener("change", () => set(rules[id]?.(el.value)));
  });

  /* ── Submit ── */
  const btn = document.getElementById("submitBtn");
  btn?.addEventListener("click", () => {
    const ok = fields.every(id => rules[id]?.(document.getElementById(id).value));
    if (!ok) {
      fields.forEach(id => {
        const el = document.getElementById(id), row = el?.closest(".form-group");
        if (!el || !row) return;
        if (!rules[id]?.(el.value)) row.classList.add("invalid");
      });
      return;
    }

    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    const order = {
      id: orderId,
      data: new Date().toLocaleString("ro-RO"),
      client: {
        nume:    document.getElementById("name").value.trim(),
        email:   document.getElementById("email").value.trim(),
        telefon: document.getElementById("phone").value.trim(),
        adresa:  document.getElementById("address").value.trim()
      },
      produse: pending.map(i => ({ id: i.id, cantitate: i.qty })),
      status: "plasata"
    };

    const all = JSON.parse(localStorage.getItem("sportfit_orders")) || [];
    all.push(order);
    localStorage.setItem("sportfit_orders", JSON.stringify(all));
    localStorage.removeItem("sportfit_cart");
    localStorage.removeItem("sportfit_pending_order");

    document.getElementById("successMsg")?.classList.add("show");
    btn.disabled = true;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Comandă trimisă!`;
    btn.style.background = "#2e7d32";
  });

  /* ── Orders history ── */
  const list   = document.getElementById("ordersList");
  const panel  = document.getElementById("ordersPanel");
  const orders = JSON.parse(localStorage.getItem("sportfit_orders")) || [];
  if (list && panel) {
    panel.style.display = orders.length ? "block" : "none";
    if (orders.length) {
      document.getElementById("ordersCount").textContent = orders.length;
      list.innerHTML = orders.slice().reverse().map(o =>
        `<div class="order-item">
          <div class="order-item-header">
            <span class="order-item-id">${o.id}</span>
            <span class="order-item-date">${o.data}</span>
          </div>
          <div class="order-item-grid">
            <div class="order-item-field"><em>Nume</em>${o.client.nume}</div>
            <div class="order-item-field"><em>Telefon</em>${o.client.telefon}</div>
            <div class="order-item-field"><em>Adresă</em>${o.client.adresa}</div>
            <div class="order-item-field"><em>Articole</em>${o.produse.length}</div>
          </div>
        </div>`
      ).join("");
    }
  }
});