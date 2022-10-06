const getProjectData = async () => {
  const projectStatusElement = document.querySelector(".project-summary span");
  const userId = Math.floor(Math.random() * 5);
  const promise = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = await promise.json();
  projectStatusElement.innerHTML = data.name;
};

window.addEventListener("load", async () => {
  getProjectData();
});
