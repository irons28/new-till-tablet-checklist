const state = {
  device: "till",
  currentSectionId: null
};

const sectionIllustrations = {
  core: "assets/illustrations/core-system.svg",
  software: "assets/illustrations/software-setup.svg",
  printer: "assets/illustrations/printer-setup.svg",
  tablet: "assets/illustrations/tablet-config.svg",
  "final-checks": "assets/illustrations/final-checks.svg"
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
const summaryStore = document.getElementById("summary-store");
const summaryDeviceName = document.getElementById("summary-device-name");
const summaryEngineer = document.getElementById("summary-engineer");
const summaryDate = document.getElementById("summary-date");
const summaryCompleted = document.getElementById("summary-completed");
const summaryRemaining = document.getElementById("summary-remaining");
const summaryStatus = document.getElementById("summary-status");
const completionState = document.getElementById("completion-state");
const completionChecks = document.getElementById("completion-checks");
const setupNotes = document.getElementById("setup-notes");
const printButton = document.getElementById("print-button");
const copyButton = document.getElementById("copy-button");
const resetButton = document.getElementById("reset-button");
const deviceButtons = document.querySelectorAll(".device-button");
const metaStore = document.getElementById("meta-store");
const metaDeviceName = document.getElementById("meta-device-name");
const metaEngineer = document.getElementById("meta-engineer");
const metaDate = document.getElementById("meta-date");
const metaInputs = [metaStore, metaDeviceName, metaEngineer, metaDate];

function progressKey() {
  return `setup-guide:progress:${state.device}`;
}

function notesKey() {
  return `setup-guide:notes:${state.device}`;
}

function metaKey() {
  return `setup-guide:meta:${state.device}`;
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

function getSavedMeta() {
  try {
    return JSON.parse(localStorage.getItem(metaKey()) || "{}");
  } catch {
    return {};
  }
}

function saveMeta(meta) {
  localStorage.setItem(metaKey(), JSON.stringify(meta));
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

function getCompletionChecks() {
  return state.device === "till"
    ? [
        "Printer working and mapped to the correct USB port",
        "Auto login verified after restart",
        "NIC and USB power saving disabled",
        "Remote support tools working"
      ]
    : [
        "Rotation lock confirmed",
        "Tablet mode disabled where required",
        "Brightness adjusted for site use",
        "Bluetooth disabled if not needed"
      ];
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

function loadMeta() {
  const meta = getSavedMeta();
  metaStore.value = meta.store || "";
  metaDeviceName.value = meta.deviceName || "";
  metaEngineer.value = meta.engineer || "";
  metaDate.value = meta.date || "";
}

function currentMeta() {
  return {
    store: metaStore.value.trim(),
    deviceName: metaDeviceName.value.trim(),
    engineer: metaEngineer.value.trim(),
    date: metaDate.value
  };
}

function updateMetaSummary() {
  const meta = currentMeta();
  summaryStore.textContent = meta.store || "Not set";
  summaryDeviceName.textContent = meta.deviceName || "Not set";
  summaryEngineer.textContent = meta.engineer || "Not set";
  summaryDate.textContent = meta.date || "Not set";
}

function renderCompletionChecks() {
  completionChecks.innerHTML = "";
  getCompletionChecks().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    completionChecks.appendChild(li);
  });
}

function updateProgressSummary() {
  const progress = getSavedProgress();
  const steps = getAllSteps();
  const completed = steps.filter((step) => Boolean(progress[step.id])).length;
  const total = steps.length;
  const remaining = Math.max(total - completed, 0);
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total && total > 0;

  progressCount.textContent = completed;
  progressTotal.textContent = total;
  progressFill.style.width = `${percent}%`;
  progressMessage.textContent = isComplete
    ? "Everything is complete. Review the handover summary and print or copy it if needed."
    : `${percent}% complete for the ${state.device} workflow.`;

  summaryCompleted.textContent = String(completed);
  summaryRemaining.textContent = String(remaining);
  summaryStatus.textContent = isComplete ? "Ready for handover" : "In progress";
  completionState.textContent = isComplete
    ? "Ready for handover. Review notes, copy the summary, or print it for sign-off."
    : "Complete all visible steps to unlock the summary.";
  completionState.classList.toggle("is-complete", isComplete);
  completionState.classList.toggle("is-pending", !isComplete);
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
    const illustration = node.querySelector(".step-illustration");

    checkbox.checked = Boolean(progress[step.id]);
    checkbox.addEventListener("change", () => toggleStep(step.id, checkbox.checked));

    node.querySelector(".step-title").textContent = step.title;
    node.querySelector(".step-summary").textContent = step.summary;
    node.querySelector(".step-badge").textContent = step.device.length === 2
      ? "All devices"
      : step.device[0] === "till"
        ? "Till"
        : "Tablet";

    illustration.src = sectionIllustrations[section.id] || sectionIllustrations.core;
    illustration.alt = `${section.section} illustration`;

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

function buildSummaryText() {
  const meta = currentMeta();
  return [
    `${state.device === "till" ? "Till" : "Tablet"} setup summary`,
    `Store: ${meta.store || "Not set"}`,
    `Device name: ${meta.deviceName || "Not set"}`,
    `Engineer: ${meta.engineer || "Not set"}`,
    `Setup date: ${meta.date || "Not set"}`,
    `Completed steps: ${summaryCompleted.textContent}`,
    `Remaining: ${summaryRemaining.textContent}`,
    `Status: ${summaryStatus.textContent}`,
    `Notes: ${setupNotes.value.trim() || "None"}`
  ].join("\n");
}

function render() {
  deviceButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.device === state.device);
  });
  updateHero();
  renderPitfalls();
  renderSectionNav();
  loadMeta();
  updateMetaSummary();
  renderCompletionChecks();
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

metaInputs.forEach((input) => {
  input.addEventListener("input", () => {
    saveMeta(currentMeta());
    updateMetaSummary();
  });
});

setupNotes.addEventListener("input", () => {
  localStorage.setItem(notesKey(), setupNotes.value);
});

printButton.addEventListener("click", () => {
  window.print();
});

copyButton.addEventListener("click", async () => {
  const summaryText = buildSummaryText();
  try {
    await navigator.clipboard.writeText(summaryText);
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy summary";
    }, 1600);
  } catch {
    copyButton.textContent = "Copy failed";
    setTimeout(() => {
      copyButton.textContent = "Copy summary";
    }, 1600);
  }
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(progressKey());
  localStorage.removeItem(notesKey());
  localStorage.removeItem(metaKey());
  render();
});

render();
