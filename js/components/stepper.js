// Initialize stepper form
function defaultConfig() {
  const { stepsWrapper: steps, listItems, inputs } = this;

  // open first step by default
  const height = steps.querySelector(".stepBody").getBoundingClientRect()
    .height;
  listItems[0].style.height = `${height}px`;

  // configure event listeners foreach input
  inputs.forEach(input => {
    input.addEventListener("keyup", e => {
      // add focus to each input with value
      const inputWrapper = e.target.closest(".inputGroup");
      const nextButton = inputWrapper
        .closest(".stepBody")
        .querySelector(".next");
      // if no value, remove focus, disable next button and return
      if (!e.target.value) {
        inputWrapper.closest(".listItem").classList.remove("done");
        inputWrapper.classList.remove("js-focus");
        return (nextButton.disabled = true);
      }
      inputWrapper.classList.add("js-focus");

      // keep the next button disabled if there're still inputs left empty
      if (
        inputWrapper.nextElementSibling.classList.contains("inputGroup") &&
        !inputWrapper.nextElementSibling.querySelector("input").value
      )
        return;
      // else enable next button
      nextButton.disabled = false;
    });
  });
}

class Stepper {
  constructor(form) {
    // set element properties
    this.stepsWrapper = form.querySelector(".steps");
    this.listItems = [...this.stepsWrapper.querySelectorAll(".listItem")];
    this.inputs = [...this.stepsWrapper.querySelectorAll("input")];
    defaultConfig.bind(this)();
  }

  changeSteps(currentStep, newStep) {
    // 1. close current step
    currentStep.style.height = getComputedStyle(newStep).height; // get height of (yet) closed next step
    currentStep.classList.remove("show");
    // add checkmark if continue button is pressed
    if (newStep === currentStep.nextElementSibling)
      currentStep.classList.add("done");

    // 2. open next step
    const contentHeight = newStep
      .querySelector(".stepBody")
      .getBoundingClientRect().height;
    newStep.style.height = `${contentHeight}px`;
    newStep.classList.add("show");
  }

  submitForm(btn) {
    // on submit show success message
    btn.closest(".buttons").nextElementSibling.classList.add("success");
    // hide back button
    btn.nextElementSibling.style.display = "none";
  }
}

export default Stepper;
