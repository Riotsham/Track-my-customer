const fallbackData = {
  enquiries: 5,
  revenue: "$0",
  totalEnquiries: 5,
  followups: 0,
  converted: 2,
  revenueFull: "$0.00"
};

async function loadSummary() {
  try {
    const res = await fetch("/api/summary");
    if (!res.ok) throw new Error("Bad response");
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    updateUI(fallbackData);
  }
}

function updateUI(data) {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (data[key] !== undefined) {
      el.textContent = data[key];
    }
  });
}

loadSummary();
