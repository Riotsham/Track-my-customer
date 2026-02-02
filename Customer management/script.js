const customers = {
  rajesh: {
    name: "Rajesh ",
    description: "Payment recieved",
    payment:"Payment Received",
    followUp: "28 May 2024",
    color:"#22c55e",
    txt:"white",
    history: [
      "Follow-up scheduled",
      "Call discussed budget",
    ],
  },
  sam: {
    name: "Sam",
    description: "Requested quotation",
    payment:"Payment Received",
    color:"#22c55e",
    followUp: "30 May 2024",
    history: [
      "Quotation sent",
      "Waiting for confirmation",
    ],
  },
  alen: {
    name: "Alen",
    description: "Payment pending",
    payment:"Payment Pending",
    color:"red",
    followUp: "25 May 2024",
    history: [
      "Invoice shared",
      "Payment reminder sent",
    ],
  },
  edi: {
    name: "Edi",
    description: "Met yesterday",
    payment:"Send Menu",
    color:"#2563eb",
    followUp: "27 May 2024",
    history: [
      "Client meeting done",
    ],
  },
 dhanush: {
    name: "Dhanush",
    description: "Interested ",
    payment:"Send Menu",
    color:"#2563eb",
    followUp: "29 May 2024",
    history: [
      "Menu shared",
    ],
  },

selva: {
    name: "Selva",
    description: "Interested ",
    payment:"Send Menu",
    color:"#2563eb",
    followUp: "29 May 2024",
    history: [
      "Menu shared",
    ],
  },

  yogesh: {
    name: "Yogesh",
    description: "Interested ",
    payment:"Send Menu",
    color:"#2563eb",
    followUp: "29 May 2024",
    history: [
      "Menu shared",
    ],
  },

  sridhar: {
    name: "Sridhar",
    description: "Interested ",
    payment:"Send Menu",
    color:"#2563eb",
    followUp: "29 May 2024",
    history: [
      "Menu shared",
    ],
  },

 mercy: {
    name: "Mercy",
    description: "Interested ",
    payment:"Send Menu",
    color:"#2563eb",
    followUp: "29 May 2024",
    history: [
      "Menu shared",
    ],
  },

};

function selectCustomer(key, element) {
  
  document.querySelectorAll(".customer").forEach(c =>
    c.classList.remove("active")
  );
  element.classList.add("active");

 
  document.getElementById("customerName").innerText =
    customers[key].name;

  document.getElementById("customerDesc").innerText =
    customers[key].description;

  document.getElementById("followUpDate").innerText =
    customers[key].followUp;

document.getElementById("Pay").innerText =
    customers[key].payment;

document.getElementById("Pay").style.backgroundColor = customers[key].color;

    

  
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  customers[key].history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}
