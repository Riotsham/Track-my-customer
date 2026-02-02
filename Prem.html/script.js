let followUps = JSON.parse(localStorage.getItem("followUps")) || [];
let pendings = JSON.parse(localStorage.getItem("pendings")) || [];
let editFU = -1;
let editP = -1;

/* Calendar */
flatpickr(".calendar", {
  dateFormat: "Y-m-d",
  defaultDate: "today",
  allowInput: true
});

/* FOLLOW UP */
function saveFollowUp() {
  let data = {
    name: fuName.value,
    date: fuDate.value,
    status: fuStatus.value,
    notes: fuNotes.value
  };

  editFU === -1 ? followUps.push(data) : followUps[editFU] = data;
  editFU = -1;

  localStorage.setItem("followUps", JSON.stringify(followUps));
  renderFollowUps();

  fuName.value = fuNotes.value = "";
}

/* PENDING PAYMENT */
function savePending() {
  let pending = totalAmt.value - paidAmt.value;

  let data = {
    name: pName.value,
    total: totalAmt.value,
    paid: paidAmt.value || 0,
    pending,
    date: payDate.value
  };

  editP === -1 ? pendings.push(data) : pendings[editP] = data;
  editP = -1;

  localStorage.setItem("pendings", JSON.stringify(pendings));
  renderPendings();

  pName.value = totalAmt.value = paidAmt.value = "";
}

function renderFollowUps() {
  followUpTable.innerHTML = "";
  followUps.forEach((f, i) => {
    followUpTable.innerHTML += `
      <tr>
        <td>${f.name}</td>
        <td>${f.date}</td>
        <td>${f.status}</td>
        <td>${f.notes}</td>
        <td class="actions">
          <button class="edit" onclick="editFollowUp(${i})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="delete" onclick="deleteFollowUp(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function renderPendings() {
  pendingTable.innerHTML = "";
  pendings.forEach((p, i) => {
    pendingTable.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>₹${p.total}</td>
        <td>₹${p.paid}</td>
        <td class="pending">₹${p.pending}</td>
        <td>${p.date}</td>
        <td class="actions">
          <button class="edit" onclick="editPending(${i})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="delete" onclick="deletePending(${i})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function editFollowUp(i) {
  let f = followUps[i];
  fuName.value = f.name;
  fuDate.value = f.date;
  fuStatus.value = f.status;
  fuNotes.value = f.notes;
  editFU = i;
}

function deleteFollowUp(i) {
  if (confirm("Delete this follow up?")) {
    followUps.splice(i, 1);
    localStorage.setItem("followUps", JSON.stringify(followUps));
    renderFollowUps();
  }
}

function editPending(i) {
  let p = pendings[i];
  pName.value = p.name;
  totalAmt.value = p.total;
  paidAmt.value = p.paid;
  payDate.value = p.date;
  editP = i;
}

function deletePending(i) {
  if (confirm("Delete this pending record?")) {
    pendings.splice(i, 1);
    localStorage.setItem("pendings", JSON.stringify(pendings));
    renderPendings();
  }
}

renderFollowUps();
renderPendings();
