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
    ? changeSteps(currentStep, currentStep.previousElementSibling, "prev")
    : submit(btn);
});

function changeSteps(currentStep, newStep, direction = "next") {
  // if forward button is pressed, check if all fields are filled in
  if (direction === "next") {
    const inputs = currentStep.querySelectorAll("input");
    for (let input of inputs) {
      if (!input.value) return;
    }
  }

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

// when input is filled, add focus class
// 1. select input fields
const inputs = {
  name: steps.querySelector("#name"),
  email: steps.querySelector("#email"),
  password: steps.querySelector("#password")
};
// 2. loop over each input and add an event listener
Object.values(inputs).forEach(input => {
  input.addEventListener("change", e => {
    const inputParent = e.target.closest(".inputGroup");
    if (!e.target.value) return inputParent.classList.remove("js-focus");
    inputParent.classList.add("js-focus");
  });
});

/* Converting to FP
Enduser should have following endpoints:
- next
- previous
- submit
*/

/*
TODOS:
- convert to FP design pattern
- better error handling
- emailadress + password validation
*/
