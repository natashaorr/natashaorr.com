const jsonUrl = 'js/json/details.json';
let originalData = [];

async function loadData() {
  const response = await fetch(jsonUrl);
  originalData = await response.json();
  renderForm(originalData);
}

function renderForm(data) {
  const container = document.getElementById("formContainer");
  container.innerHTML = '';

  const section = document.createElement("div");

  // Example: Interests (data[0].interests)
  section.innerHTML = `<h3>Interests</h3>`;
  data[0].interests.forEach((item, index) => {
    const group = document.createElement("div");
    group.className = "form-group";
    group.innerHTML = `
      <label>Interest ${index + 1} Title</label>
      <input type="text" class="form-control" value="${item.title}" 
             onchange="originalData[0].interests[${index}].title = this.value">
    `;
    section.appendChild(group);
  });

  container.appendChild(section);
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(originalData, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "details.json";
  link.click();
});

loadData();
