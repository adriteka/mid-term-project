const getProjectData = async () => {
  const projectStatusElement = document.querySelector(".project-summary span");
  const promise = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await promise.json();
  projectStatusElement.innerHTML = data.name;
};

window.addEventListener("load", async () => {
  getProjectData();
});
