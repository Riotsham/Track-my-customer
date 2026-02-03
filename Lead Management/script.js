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

// ✅ Stronger Email validation
function isValidEmail(email) {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,20}$/;
  return regex.test(email);
}

// ✅ Phone validation (digits only, 10–15 length)
function isValidPhone(phone) {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
}

function toggleForm() {
  const formContainer = document.getElementById("leadFormContainer");
  formContainer.style.display = formContainer.style.display === "none" || formContainer.style.display === "" ? "block" : "none";
}

function saveLead(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const status = document.getElementById("status").value.trim();

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

  // Reset form
  document.getElementById("leadForm").reset();
  toggleForm();
}

function openWhatsApp(index) {
  alert(`Opening WhatsApp chat with ${leads[index].name} (${leads[index].phone})`);
}

function sendQuotation(index) {
  alert(`Sending quotation to ${leads[index].name} (${leads[index].email})`);
}

function callLead(index) {
  alert(`Calling ${leads[index].name} (${leads[index].phone})`);
}

function deleteLead(index) {
  leads.splice(index, 1);
  renderLeads();
}

// Initial render
renderLeads();