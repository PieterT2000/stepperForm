import Stepper from "./components/stepper.js";

// create new stepper form instance
const form = new Stepper(document.querySelector(".form"));

// Configure buttons
form.stepsWrapper.addEventListener("click", e => {
  // return if click is not on button
  if (!e.target.closest("button")) return;

  const btn = e.target;
  const currentStep = btn.closest(".listItem");

  btn.classList.contains("next")
    ? form.changeSteps(currentStep, currentStep.nextElementSibling)
    : btn.classList.contains("prev")
    ? form.changeSteps(currentStep, currentStep.previousElementSibling)
    : form.submitForm(btn);
});
