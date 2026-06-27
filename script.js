// script.js (cleaned)
// Frontend logic for GlobalPay Pi demo
let balance = 248.75;
let transactions = [
    { type: "received", amount: 15.5, from: "freelancer.pi", time: "2h ago", currency: "π" },
    { type: "sent", amount: 8.2, from: "shop.ng", time: "Yesterday", currency: "π" }
];

const vendors = [
    { name: "TechStore", price: 45, desc: "Latest gadgets" },
    { name: "FashionHub", price: 22, desc: "Clothing & accessories" },
    { name: "FoodExpress", price: 12, desc: "Fast delivery" }
];

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(section + '-section');
    if (el) el.classList.add('active');

    if (section === 'wallet') renderRecent();
    if (section === 'history') renderHistory();
    if (section === 'vendors') renderVendors();
}

function updateBalances() {
    const nav = document.getElementById('nav-balance');
    if (nav) nav.textContent = `π ${balance.toFixed(2)}`;
    const wb = document.getElementById('wallet-balance');
    if (wb) wb.textContent = balance.toFixed(2);
}

function sendMoney() {
    const amountEl = document.getElementById('send-amount');
    const amount = amountEl ? parseFloat(amountEl.value) : 0;
    if (!amount || amount <= 0) {
        showToast("Enter a valid amount", true);
        return;
    }

    if (amount > balance) {
        showToast("Insufficient balance", true);
        return;
    }

    balance -= amount;
    updateBalances();

    const recipientEl = document.getElementById('recipient');
    const recipient = recipientEl && recipientEl.value ? recipientEl.value : "Unknown";

    transactions.unshift({
        type: "sent",
        amount: amount,
        from: recipient,
        time: "Just now",
        currency: "π"
    });

    showToast(`Successfully sent ${amount.toFixed(2)} π to ${recipient}`);
    setTimeout(() => showSection('wallet'), 800);
}

function receiveMoney() {
    const received = 42.8;
    balance += received;
    updateBalances();

    transactions.unshift({
        type: "received",
        amount: received,
        from: "client.eu",
        time: "Just now",
        currency: "π"
    });

    showToast(`Received ${received.toFixed(2)} π`, false);
}

function renderRecent() {
    const container = document.getElementById('recent-list');
    if (!container) return;
    container.innerHTML = '';

    transactions.slice(0, 4).forEach(tx => {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <i class="fas fa-${tx.type === 'sent' ? 'arrow-up' : 'arrow-down'}" style="color: ${tx.type === 'sent' ? '#ff6666' : '#00ff99'}"></i>
                <div>
                    <strong>${tx.type === 'sent' ? 'To' : 'From'} ${tx.from}</strong><br>
                    <small>${tx.time}</small>
                </div>
            </div>
            <div style="text-align:right; font-weight:600; color: ${tx.type === 'sent' ? '#ff6666' : '#00ff99'}">
                ${tx.type === 'sent' ? '-' : '+'}${tx.amount.toFixed(2)} ${tx.currency}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderHistory() {
    const container = document.getElementById('history-list');
    if (!container) return;
    container.innerHTML = '';

    transactions.forEach(tx => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div>
                <strong>${tx.type.toUpperCase()} ${tx.amount.toFixed(2)} π</strong><br>
                <small>${tx.from} • ${tx.time}</small>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderVendors() {
    const container = document.getElementById('vendors-grid');
    if (!container) return;
    container.innerHTML = '';

    vendors.forEach(v => {
        const card = document.createElement('div');
        card.className = 'vendor-card';
        card.innerHTML = `
            <h3>${v.name}</h3>
            <p>${v.desc}</p>
            <div style="margin: 15px 0; font-size:1.4rem; font-weight:700;">${v.price} π</div>
            <button onclick="payVendor('${v.name}')" class="btn-primary">Pay Now</button>
        `;
        container.appendChild(card);
    });
}

function payVendor(name) {
    const amount = Math.random() * 30 + 10;
    if (balance > amount) {
        balance -= amount;
        updateBalances();
        transactions.unshift({ type: 'sent', amount: amount, from: name, time: 'Just now', currency: 'π' });
        showToast(`Paid ${amount.toFixed(2)} π to ${name}`);
        setTimeout(() => renderRecent(), 300);
    } else {
        showToast("Not enough balance", true);
    }
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.background = isError ? '#ff4444' : '#00cc88';
    toast.style.color = isError ? '#fff' : '#000';
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Initialize
window.onload = function() {
    updateBalances();
    showSection('home');
    renderRecent();
};
