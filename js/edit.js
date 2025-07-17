// edit.js

// v3.3

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

    // Render the article title first, but only for Publications
    if (currentSection === "Publications") {
      const articleGroup = document.createElement("div");
      articleGroup.classList.add("mb-2");

      const articleLabel = document.createElement("label");
      articleLabel.innerText = "Article Title";
      articleLabel.classList.add("form-label");
      articleGroup.appendChild(articleLabel);

      const articleInput = document.createElement("input");
      articleInput.type = "text";
      articleInput.classList.add("form-control");
      articleInput.value = item.article || ""; // Set the article title
      articleInput.placeholder = "Article Title";

      articleInput.oninput = () => item.article = articleInput.value; // Update article in data
      articleGroup.appendChild(articleInput);
      cardBody.appendChild(articleGroup);
    }

    // Render authors (only for Publications)
    if (currentSection === "Publications" && item.authors && Array.isArray(item.authors)) {
      const authorsGroup = document.createElement("div");
      authorsGroup.classList.add("mb-3");

      const authorsLabel = document.createElement("label");
      authorsLabel.innerText = "Authors";
      authorsLabel.classList.add("form-label");
      authorsGroup.appendChild(authorsLabel);

      item.authors.forEach((author, authorIndex) => {
        const authorGroup = document.createElement("div");
        authorGroup.classList.add("d-flex", "mb-2");

        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.classList.add("form-control");
        authorInput.value = author.name || ""; // Set the author's name
        authorInput.placeholder = "Author Name";

        authorInput.oninput = () => {
          item.authors[authorIndex].name = authorInput.value; // Update author name in data
        };

        const delBtn = document.createElement("button");
        delBtn.classList.add("btn", "btn-sm", "btn-danger", "ms-2");
        delBtn.innerText = "Delete";
        delBtn.onclick = () => {
          item.authors.splice(authorIndex, 1); // Remove the author
          renderSection(); // Re-render the section after removal
        };

        const upBtn = document.createElement("button");
        upBtn.classList.add("btn", "btn-sm", "btn-secondary", "ms-2");
        upBtn.innerText = "↑";
        upBtn.disabled = authorIndex === 0;
        upBtn.onclick = () => moveAuthor(item, authorIndex, -1);

        const downBtn = document.createElement("button");
        downBtn.classList.add("btn", "btn-sm", "btn-secondary", "ms-2");
        downBtn.innerText = "↓";
        downBtn.disabled = authorIndex === item.authors.length - 1;
        downBtn.onclick = () => moveAuthor(item, authorIndex, 1);

        authorGroup.appendChild(authorInput);
        authorGroup.appendChild(upBtn);
        authorGroup.appendChild(downBtn);
        authorGroup.appendChild(delBtn);
        authorsGroup.appendChild(authorGroup);
      });

      // Button to add new author
      const addAuthorBtn = document.createElement("button");
      addAuthorBtn.classList.add("btn", "btn-outline-success", "mt-2");
      addAuthorBtn.innerText = "Add Author";
      addAuthorBtn.onclick = () => {
        item.authors.push({ name: "", title: "" }); // Add empty author
        renderSection(); // Re-render the section after adding
      };

      authorsGroup.appendChild(addAuthorBtn);
      cardBody.appendChild(authorsGroup);
    }

    // Render other fields (like year, journal, etc.)
    Object.entries(item).forEach(([key, value]) => {
      if (key !== "authors" && key !== "article") { // Skip authors and article from here
        const group = document.createElement("div");
        group.classList.add("mb-2");

        const label = document.createElement("label");
        label.innerText = key;
        label.classList.add("form-label");

        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control");
        input.value = value || ""; // Default to empty string if no value
        input.oninput = () => item[key] = input.value;

        group.appendChild(label);
        group.appendChild(input);
        cardBody.appendChild(group);
      }
    });

    // Append up, down, delete buttons
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

  // Add new item button
  const addBtn = document.createElement("button");
  addBtn.classList.add("btn", "btn-outline-success", "mt-3");
  addBtn.innerText = "Add New";
  addBtn.onclick = () => {
  let newItem = {};
  if (currentSection === "Publications") {
    newItem = {
      article: "",
      authors: [{ name: "", title: "" }],
      journal: "",
      year: "",
      article_link: "",
      pmid: "",
      show: "main"
    };
  } else {
    const keys = Object.keys(data[currentSection][0] || {});
    keys.forEach(k => newItem[k] = "");
  }
    data[currentSection].push(newItem);
    renderSection();
  };

  sectionContent.appendChild(addBtn);
}



// Move Author in the list
function moveAuthor(item, authorIndex, delta) {
  const temp = item.authors[authorIndex];
  item.authors[authorIndex] = item.authors[authorIndex + delta];
  item.authors[authorIndex + delta] = temp;
  renderSection(); // Re-render the section after changing author order
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

