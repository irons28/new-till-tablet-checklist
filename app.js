const state = {
  device: "till",
  currentSectionId: null
};

const sectionNav = document.getElementById("section-nav");
const pitfallsList = document.getElementById("pitfalls-list");
const checklist = document.getElementById("checklist");
const stepTemplate = document.getElementById("step-template");
const progressCount = document.getElementById("progress-count");
const progressTotal = document.getElementById("progress-total");
const progressFill = document.getElementById("progress-fill");
const progressMessage = document.getElementById("progress-message");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const sectionTitle = document.getElementById("section-title");
const sectionDescription = document.getElementById("section-description");
const sectionCount = document.getElementById("section-count");
const summaryDevice = document.getElementById("summary-device");
const summaryCompleted = document.getElementById("summary-completed");
const summaryRemaining = document.getElementById("summary-remaining");
const completionState = document.getElementById("completion-state");
const setupNotes = document.getElementById("setup-notes");
const printButton = document.getElementById("print-button");
const resetButton = document.getElementById("reset-button");
const deviceButtons = document.querySelectorAll(".device-button");

function progressKey() {
  return `setup-guide:progress:${state.device}`;
}

function notesKey() {
  return `setup-guide:notes:${state.device}`;
}

function getSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressKey()) || "{}");
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(progressKey(), JSON.stringify(progress));
}

function getSectionsForDevice() {
  return window.checklistData.sections
    .filter((section) => section.device.includes(state.device))
    .map((section) => ({
      ...section,
      steps: section.steps.filter((step) => step.device.includes(state.device))
    }))
    .filter((section) => section.steps.length > 0);
}

function getAllSteps() {
  return getSectionsForDevice().flatMap((section) => section.steps);
}

function getCurrentSection() {
  const sections = getSectionsForDevice();
  return sections.find((section) => section.id === state.currentSectionId) || sections[0];
}

function updateHero() {
  const label = state.device === "till" ? "Till" : "Tablet";
  heroTitle.textContent = `${label} Setup Workflow`;
  heroDescription.textContent =
    state.device === "till"
      ? "Prepare store tills with the shared setup path, printer and stability settings, and final handover checks."
      : "Prepare tablets with the shared setup path, handheld configuration, and final handover checks.";
  summaryDevice.textContent = label;
}

function renderPitfalls() {
  pitfallsList.innerHTML = "";
  window.checklistData.pitfalls.forEach((pitfall) => {
    const li = document.createElement("li");
    li.textContent = pitfall;
    pitfallsList.appendChild(li);
  });
}

function renderSectionNav() {
  const sections = getSectionsForDevice();
  if (!sections.some((section) => section.id === state.currentSectionId)) {
    state.currentSectionId = sections[0]?.id || null;
  }

  sectionNav.innerHTML = "";
  sections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `section-nav__item${section.id === state.currentSectionId ? " is-active" : ""}`;
    button.textContent = section.section;
    button.addEventListener("click", () => {
      state.currentSectionId = section.id;
      render();
    });
    sectionNav.appendChild(button);
  });
}

function updateProgressSummary() {
  const progress = getSavedProgress();
  const steps = getAllSteps();
  const completed = steps.filter((step) => Boolean(progress[step.id])).length;
  const total = steps.length;
  const remaining = Math.max(total - completed, 0);
  const percent = total ? Math.round((completed / total) * 100) : 0;

  progressCount.textContent = completed;
  progressTotal.textContent = total;
  progressFill.style.width = `${percent}%`;
  progressMessage.textContent =
    completed === total && total > 0
      ? "Everything is complete. Add final notes or print the summary."
      : `${percent}% complete for the ${state.device} workflow.`;

  summaryCompleted.textContent = String(completed);
  summaryRemaining.textContent = String(remaining);
  completionState.textContent =
    completed === total && total > 0
      ? "Ready for handover. Review notes and print if needed."
      : "Complete all visible steps to unlock the summary.";
  completionState.classList.toggle("is-complete", completed === total && total > 0);
  completionState.classList.toggle("is-pending", !(completed === total && total > 0));
}

function toggleStep(stepId, checked) {
  const progress = getSavedProgress();
  progress[stepId] = checked;
  saveProgress(progress);
  updateProgressSummary();
}

function renderChecklist() {
  const progress = getSavedProgress();
  const section = getCurrentSection();

  checklist.innerHTML = "";
  if (!section) {
    sectionTitle.textContent = "No section available";
    sectionDescription.textContent = "";
    sectionCount.textContent = "";
    return;
  }

  sectionTitle.textContent = section.section;
  sectionDescription.textContent = section.description;
  sectionCount.textContent = `${section.steps.length} step${section.steps.length === 1 ? "" : "s"}`;

  section.steps.forEach((step) => {
    const node = stepTemplate.content.firstElementChild.cloneNode(true);
    const checkbox = node.querySelector(".step-checkbox");
    const expandButton = node.querySelector(".expand-button");
    const details = node.querySelector(".step-details");
    const instructionList = node.querySelector(".step-instructions");

    checkbox.checked = Boolean(progress[step.id]);
    checkbox.addEventListener("change", () => toggleStep(step.id, checkbox.checked));

    node.querySelector(".step-title").textContent = step.title;
    node.querySelector(".step-summary").textContent = step.summary;
    node.querySelector(".step-badge").textContent =
      step.device.length === 2 ? "All devices" : step.device[0] === "till" ? "Till" : "Tablet";

    step.instructions.forEach((instruction) => {
      const li = document.createElement("li");
      li.textContent = instruction;
      instructionList.appendChild(li);
    });

    expandButton.addEventListener("click", () => {
      const expanded = expandButton.getAttribute("aria-expanded") === "true";
      expandButton.setAttribute("aria-expanded", String(!expanded));
      expandButton.textContent = expanded ? "Show steps" : "Hide steps";
      details.hidden = expanded;
    });

    checklist.appendChild(node);
  });
}

function loadNotes() {
  setupNotes.value = localStorage.getItem(notesKey()) || "";
}

function render() {
  deviceButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.device === state.device);
  });
  updateHero();
  renderPitfalls();
  renderSectionNav();
  renderChecklist();
  loadNotes();
  updateProgressSummary();
}

deviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.device = button.dataset.device;
    state.currentSectionId = null;
    render();
  });
});

setupNotes.addEventListener("input", () => {
  localStorage.setItem(notesKey(), setupNotes.value);
});

printButton.addEventListener("click", () => {
  window.print();
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(progressKey());
  localStorage.removeItem(notesKey());
  render();
});

render();
