let leads = [];

function renderLeads() {
  const tbody = document.querySelector("#leadsTable tbody");
  tbody.innerHTML = "";
  leads.forEach((lead, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${lead.name}</td>
      <td>${lead.phone}</td>
      <td>${lead.email}</td>
      <td>${lead.status}</td>
      <td>
        <button class="btn wp" onclick="openWhatsApp(${index})">💬 WhatsApp</button>
        <button class="btn quote" onclick="sendQuotation(${index})">📄 Quotation</button>
        <button class="btn call" onclick="callLead(${index})">📞 Call</button>
        <button class="btn delete" onclick="deleteLead(${index})">🗑 Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ✅ Email validation using regex
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ✅ Phone validation (only digits, length 10–15)
function isValidPhone(phone) {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
}

function addNewLead() {
  const name = prompt("Enter lead name:");
  const phone = prompt("Enter phone number:");
  const email = prompt("Enter email:");
  const status = prompt("Enter status:");

  if (!name || !phone || !email || !status) {
    alert("⚠️ All fields are required!");
    return;
  }

  if (!isValidPhone(phone)) {
    alert("❌ Invalid phone number! Must be 10–15 digits.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("❌ Invalid email address format!");
    return;
  }

  leads.push({ name, phone, email, status });
  renderLeads();
}

function openWhatsApp(index) {
  alert(`Opening WhatsApp chat with ${leads[index].name} (${leads[index].phone})`);
  // Example: window.open(`https://wa.me/${leads[index].phone}`, "_blank");
}

function sendQuotation(index) {
  alert(`Sending quotation to ${leads[index].name} (${leads[index].email})`);
}

function callLead(index) {
  alert(`Calling ${leads[index].name} (${leads[index].phone})`);
  // Example: window.open(`tel:${leads[index].phone}`);
}

function deleteLead(index) {
  leads.splice(index, 1);
  renderLeads();
}

// Initial render (empty list)
renderLeads();