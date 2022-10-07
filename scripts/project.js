const getProjectData = async () => {
  const projectStatusElement = document.querySelector(".project-summary span");
  
  // fetch usuario al azar de la API
  const userId = 1 + Math.floor(Math.random() * 5);
  const promise = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = await promise.json();
  projectStatusElement.innerHTML = data.name;
};

window.addEventListener("load", async () => {
  getProjectData();
});
