const steps = document.querySelector(".steps");
const contents = [...steps.querySelectorAll(".stepBody")];
const listItems = [...steps.querySelectorAll(".listItem")];

// add index data attribute to each step
listItems.forEach((li, index) => {
  li.dataset.index = index;
});

// open first step by default
const height = contents[0].getBoundingClientRect().height;
listItems[0].style.height = `${height}px`;

// add event delegation to buttons
steps.addEventListener("click", e => {
  e.preventDefault();

  // return if click is not on button
  if (!e.target.closest("button")) return;

  const btn = e.target;
  const currentStep = btn.closest(".listItem");

  btn.classList.contains("next")
    ? changeSteps(currentStep, currentStep.nextElementSibling)
    : btn.classList.contains("prev")
    ? changeSteps(currentStep, currentStep.previousElementSibling)
    : submit(btn);
});

function changeSteps(currentStep, newStep) {
  // 1. close current step
  currentStep.style.height = getComputedStyle(newStep).height; // get height of (yet) closed next step
  currentStep.classList.remove("show");

  // 2. open next step
  const contentHeight = contents[newStep.dataset.index].getBoundingClientRect()
    .height;
  newStep.style.height = `${contentHeight}px`;
  newStep.classList.add("show");
}

function submit(btn) {
  // on submit show success message
  btn.closest(".buttons").nextElementSibling.classList.add("success");
  // hide back button
  btn.nextElementSibling.style.display = "none";
}
