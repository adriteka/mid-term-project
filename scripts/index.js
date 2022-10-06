const companies = [
  { name: "airbnb", url: "images/logos/airbnb-logo.svg" },
  { name: "Google", url: "images/logos/google-logo.svg" },
  { name: "Microsoft", url: "images/logos/microsoft-logo.svg" },
  { name: "FedEx", url: "images/logos/fedex-logo.svg" },
  { name: "Amazon", url: "images/logos/amazon-logo.svg" },
];

const getProjects = async (howMany = 3) => {
  const projectTemplate = `
    <div class="card-item">
      <h3>#TITLE#</h3>
      <p>#DESCRIPTION#</p>
      <a href="project.html">Learn more</a>
      <img class="card-item-img" src="images/projects-section/#NUM#.jpg" alt=""/>
    </div>`;
  const projectListElement = document.querySelector("#projects .card-list");
  const promise = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const data = await promise.json();

  // reordena resultados al azar
  data.sort(() => {
    return Math.random() - 0.5;
  });

  projectListElement.innerHTML = data
    .slice(0, howMany)
    .reduce((accum, elem) => {
      let project = projectTemplate.replace("#TITLE#", elem.title);
      project = project.replace("#DESCRIPTION#", elem.body);
      project = project.replace("#NUM#", Math.floor(Math.random() * 6 + 1));
      return accum + project;
    }, "");
};

const getServices = async (howMany = 3) => {
  const serviceTemplate = `
    <div class="card-item">
      <h3>#TITLE#</h3>
      <p>#DESCRIPTION#</p>
      <a href="#">Learn more</a>
      <img class="card-item-icon" src="images/services-section/icons/#NUM#.svg" alt="" />
    </div>`;
  const serviceListElement = document.querySelector("#services .card-list");
  const promise = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const data = await promise.json();

  // reordena resultados al azar
  data.sort(() => {
    return Math.random() - 0.5;
  });

  serviceListElement.innerHTML = data
    .slice(0, howMany)
    .reduce((accum, elem) => {
      let service = serviceTemplate.replace("#TITLE#", elem.title);
      service = service.replace("#DESCRIPTION#", elem.body);
      service = service.replace("#NUM#", Math.floor(Math.random() * 3 + 1));
      return accum + service;
    }, "");
};

const getCompanies = (howMany = NaN) => {
  const companyTemplate = `<img class="company-item" src="#IMGURL#" alt="#NAME# logo" title="#NAME#" />`;
  const companyListElement = document.querySelector(".company-list");
  let companiesHTML = "";
  let total = companies.length;
  if (isNaN(howMany)) howMany = companies.length;
  for (let i = 0; i < howMany; i++) {
    companiesHTML += companyTemplate
      .replaceAll("#NAME#", companies[i % total].name)
      .replace("#IMGURL#", companies[i % total].url);
  }
  companyListElement.innerHTML = companiesHTML;
};

window.addEventListener("load", async () => {
  getCompanies(5);
  getProjects(5);
  getServices(4);
});
