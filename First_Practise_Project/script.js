const checkboxlist = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const error = document.querySelector(".error-lable");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLebel = document.querySelector(".progress-lable");
const btn = document.querySelector(".btn");
const appConatiner = document.querySelector(".app-container");



const allQoutes = [
  'Raise the bar by completing your goals!',
  'well begun is half done',
  'just a step ahead! keep going',
  'Whoa! You just compelete all the goals  time for chill :)'
]

const Allgoals = JSON.parse(localStorage.getItem("Allgoals")) || {
};

let compeletedGoals = Object.values(Allgoals).filter(
  (goal) => goal.compeleted
).length;
 

progressValue.style.width = `${(compeletedGoals / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${compeletedGoals}/ ${inputFields.length} compeleted`;
progressLebel.innerText = allQoutes[compeletedGoals];


checkboxlist.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allFieldsFilled = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allFieldsFilled) {
      checkBox.parentElement.classList.toggle("compeleted");
      const inputId = checkBox.nextElementSibling.id;
      Allgoals[inputId].compeleted = !Allgoals[inputId].compeleted;
      compeletedGoals = Object.values(Allgoals).filter(
        (goal) => goal.compeleted
      ).length;
      progressValue.style.width = `${(compeletedGoals / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${compeletedGoals}/${inputFields.length} compeleted`;
      progressLebel.innerText = allQoutes[compeletedGoals];
      localStorage.setItem("Allgoals", JSON.stringify(Allgoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input)=>{
    if(Allgoals[input.id]){
      input.value = Allgoals[input.id].name
      if(Allgoals[input.id].compeleted){
        input.parentElement.classList.add("compeleted")
       }
    }
   
   input.addEventListener("focus", () =>{
      progressBar.classList.remove("show-error")
   })
   input.addEventListener("input", (e)=>{
    if(Allgoals[input.id] && Allgoals[input.id].compeleted){
      input.value = Allgoals[input.id].name
      return
     }
     if(Allgoals[input.id]) {
      Allgoals[input.id].name = input.value
     } else {
      Allgoals[input.id] = {
        name: input.value,
        compeleted: false
      }
     }
      localStorage.setItem("Allgoals", JSON.stringify(Allgoals))
   })
})



btn.addEventListener('click', () => {
      const div = document.createElement('div')
      div.classList.add('app-container')

      const myCard = document.createElement('div')
      myCard.classList.add('goal')

      const myInput = document.createElement('input')
      myInput.classList.add('goal-input')
      myInput.type = "text"
      
      myCard.append(myInput)
      
      appConatiner.append(myCard)
});