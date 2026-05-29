const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-bs-theme", storedTheme);

  $("themeToggle")?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);
  });

  document.querySelector(".sidebar-toggle")?.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("open");
  });

  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });

  const progress = document.querySelector(".budget-progress");
  if (progress) {
    const used = Number(progress.dataset.used || 0);
    progress.classList.add(used >= 90 ? "bg-danger" : used >= 70 ? "bg-warning" : "bg-success");
  }

  const alertBox = document.querySelector("[data-popup]");
  if (alertBox) {
    setTimeout(() => alert(alertBox.dataset.popup), 400);
  }

  loadDashboardCharts();
  loadReportCharts();
});

function chartColors() {
  return ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#14B8A6", "#8B5CF6", "#F97316", "#64748B"];
}

async function loadDashboardCharts() {
  if (!$("categoryChart") && !$("monthlyChart")) return;
  const res = await fetch("/api/dashboard");
  const data = await res.json();
  if ($("categoryChart")) {
    new Chart($("categoryChart"), {
      type: "pie",
      data: { labels: data.categoryLabels, datasets: [{ data: data.categoryValues, backgroundColor: chartColors() }] },
    });
  }
  if ($("monthlyChart")) {
    new Chart($("monthlyChart"), {
      type: "bar",
      data: { labels: data.monthLabels, datasets: [{ label: "Expenses", data: data.monthValues, backgroundColor: "#2563EB", borderRadius: 8 }] },
      options: { scales: { y: { beginAtZero: true } } },
    });
  }
}

async function loadReportCharts() {
  const trend = $("trendChart");
  if (!trend) return;
  const period = trend.dataset.period || "monthly";
  const res = await fetch(`/api/reports?period=${period}`);
  const data = await res.json();
  const labels = [...new Set(data.trends.map((r) => r.label))];
  const byType = (type) => labels.map((label) => {
    const row = data.trends.find((r) => r.label === label && r.type === type);
    return row ? Number(row.total) : 0;
  });
  new Chart(trend, {
    type: "line",
    data: { labels, datasets: [{ label: "Expense", data: byType("Expense"), borderColor: "#EF4444", tension: .35 }, { label: "Income", data: byType("Income"), borderColor: "#22C55E", tension: .35 }] },
  });
  new Chart($("reportCategoryChart"), {
    type: "doughnut",
    data: { labels: data.categories.map((r) => r.category), datasets: [{ data: data.categories.map((r) => Number(r.total)), backgroundColor: chartColors() }] },
  });
  new Chart($("incomeExpenseChart"), {
    type: "bar",
    data: { labels, datasets: [{ label: "Income", data: byType("Income"), backgroundColor: "#22C55E" }, { label: "Expense", data: byType("Expense"), backgroundColor: "#EF4444" }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  });
}
