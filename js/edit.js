// edit.js

// v2.6

const sections = [
  "Interests", "Values", "Schools", "Employers",
  "Publications", "Presentations", "Experiences", "Recognitions", "Citations"
];

let currentSection = "Interests";
let data = {};

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/js/json/details.json");
  data = await response.json();
  initSectionTabs();
  renderSection();
  document.getElementById("downloadBtn").addEventListener("click", downloadJSON);
});

function initSectionTabs() {
  const tabContainer = document.getElementById("sectionTabs");
  tabContainer.innerHTML = "";
  sections.forEach((section) => {
    const btn = document.createElement("button");
    btn.innerText = section;
    btn.classList.add("btn", "btn-outline-primary", "m-1");
    if (section === currentSection) btn.classList.add("active");
    btn.onclick = () => {
      currentSection = section;
      renderSection();
    };
    tabContainer.appendChild(btn);
  });
}

function renderSection() {
  const sectionTitle = document.getElementById("sectionTitle");
  sectionTitle.textContent = currentSection;
  const sectionContent = document.getElementById("sectionContent");

  sectionContent.innerHTML = "";

  const sectionData = data[currentSection];
  if (!Array.isArray(sectionData)) {
    sectionContent.innerHTML = "<p>This section has no entries.</p>";
    return;
  }

  sectionData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Handle different fields in the section data
    Object.entries(item).forEach(([key, value]) => {
      const group = document.createElement("div");
      group.classList.add("mb-2");

      const label = document.createElement("label");
      label.innerText = key;
      label.classList.add("form-label");

      // Check if the key is 'authors' and handle separately
      if (key === "authors" && Array.isArray(value)) {
        const authorContainer = document.createElement("div");
        authorContainer.classList.add("author-container");

        // Render authors as individual input fields
        value.forEach((author, authorIndex) => {
          const authorGroup = document.createElement("div");
          authorGroup.classList.add("d-flex", "mb-2");

          const authorInput = document.createElement("input");
          authorInput.type = "text";
          authorInput.classList.add("form-control");
          authorInput.value = author.name;
          authorInput.placeholder = "Author Name";

          // Update the authors array when the input changes
          authorInput.oninput = () => {
            data[currentSection][index].authors[authorIndex].name = authorInput.value;
          };

          const delBtn = document.createElement("button");
          delBtn.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
          delBtn.innerText = "Delete";
          delBtn.onclick = () => {
            // Remove the author from the list
            data[currentSection][index].authors.splice(authorIndex, 1);
            renderSection(); // Re-render the section
          };

          authorGroup.appendChild(authorInput);
          authorGroup.appendChild(delBtn);
          authorContainer.appendChild(authorGroup);
        });

        // Add button to add new author
        const addAuthorBtn = document.createElement("button");
        addAuthorBtn.classList.add("btn", "btn-outline-success", "mt-2");
        addAuthorBtn.innerText = "Add Author";
        addAuthorBtn.onclick = () => {
          // Add a new empty author
          data[currentSection][index].authors.push({ name: "", title: "" });
          renderSection(); // Re-render to show changes
        };

        authorContainer.appendChild(addAuthorBtn);
        group.appendChild(label);
        group.appendChild(authorContainer);
      } else {
        // Regular fields are handled as text inputs
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control");
        input.value = value;
        input.oninput = () => data[currentSection][index][key] = input.value;

        group.appendChild(label);
        group.appendChild(input);
        cardBody.appendChild(group);
      }
    });

    const btnRow = document.createElement("div");
    btnRow.classList.add("d-flex", "justify-content-between", "pt-2");

    const upBtn = document.createElement("button");
    upBtn.classList.add("btn", "btn-sm", "btn-secondary");
    upBtn.innerText = "↑";
    upBtn.disabled = index === 0;
    upBtn.onclick = () => moveItem(index, -1);

    const downBtn = document.createElement("button");
    downBtn.classList.add("btn", "btn-sm", "btn-secondary");
    downBtn.innerText = "↓";
    downBtn.disabled = index === sectionData.length - 1;
    downBtn.onclick = () => moveItem(index, 1);

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
    delBtn.innerText = "Delete";
    delBtn.onclick = () => {
      data[currentSection].splice(index, 1);
      renderSection();
    };

    btnRow.append(upBtn, downBtn, delBtn);
    cardBody.appendChild(btnRow);
    card.appendChild(cardBody);
    sectionContent.appendChild(card);
  });

  const addBtn = document.createElement("button");
  addBtn.classList.add("btn", "btn-outline-success", "mt-3");
  addBtn.innerText = "Add New";
  addBtn.onclick = () => {
    const newItem = {};
    const keys = Object.keys(data[currentSection][0] || { key: "" });
    keys.forEach(k => newItem[k] = "");
    data[currentSection].push(newItem);
    renderSection();
  };

  sectionContent.appendChild(addBtn);
}


function moveItem(index, delta) {
  const sectionData = data[currentSection];
  const temp = sectionData[index];
  sectionData[index] = sectionData[index + delta];
  sectionData[index + delta] = temp;
  renderSection();
}

function downloadJSON() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "details.json";
  a.click();
  URL.revokeObjectURL(url);
}

