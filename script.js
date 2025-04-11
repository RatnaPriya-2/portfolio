import { projects, reactProjects, bigReactProjects } from "./data.js";

window.addEventListener("pageshow", function () {
  document.querySelector(".contactForm")?.reset();
});

const hamburger = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close-btn");
const leftSection = document.querySelector(".left-section");

hamburger.addEventListener("click", () => {
  leftSection.classList.toggle("active");
});
closeBtn.addEventListener("click", () => {
  leftSection.classList.toggle("active");
});

let liItems = document.querySelectorAll(".left-section ul li");

liItems.forEach((item) => {
  let path = window.location.pathname;
  let anchor = item.querySelector("a").getAttribute("href");

  if (anchor === path) {
    item.classList.add("active");
  }

  if (
    (anchor === "/" && path === "/") ||
    (anchor === "/" && path === "/index.html")
  ) {
    item.classList.add("active");
  }
});

let smallProjectsGrid = document.querySelector(".small-projects");
let bigProjectsGrid = document.querySelector(".big-projects");

let projectBtns = document.querySelector(".project-btns");

const createCard = (project) => {
  let projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  projectCard.innerHTML = `<div class="project-img"><img
                  src=${project.image}
                  alt=${project.title}
                /></div>
                <div class="card-content">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  <div class="tags">
                    ${project.techStack
                      .map((tech) => `<img src=${tech} alt="tech-icon"/>`)
                      .join("")}
                  </div>
                  <div class="project-links">
                    <button>
                      <a
                        href=${project.links.liveDemo}
                        target="_blank"
                        >Live Demo</a
                      >
                    </button>
                    <button>
                      <a
                        href=${project.links.code}
                        target="_blank"
                        >Code</a
                      >
                    </button>
                  </div>
                </div>
              `;

  smallProjectsGrid.appendChild(projectCard);
};

const createProjectCard = (project) => {
  let projectContainer = document.createElement("div");
  projectContainer.classList.add("big-project-container");
  projectContainer.innerHTML = `<img src="${project.image}" alt="${
    project.title
  }" class="big-project-image"/>
        <div class="big-project-info">
          <h3 class="big-project-title">${project.title}</h3>
          <p class="big-project-description">${project.description}</p>
          <ul class="big-project-features">${project.features
            .map((feature) => `<li>${feature}</li>`)
            .join("")}</ul>
          <div class="tech-stack">
            ${project.techStack
              .map(
                (tech) =>
                  `<img src="${tech}" alt="tech icon" class="tech-icon">`
              )
              .join("")}
          </div>
          <div class="big-project-links">
          <button> <a href="${
            project.links.liveDemo
          }" target="_blank">Live Demo</a></button>
           <button><a href="${
             project.links.code
           }" target="_blank">Code</a></button>
          </div>
        </div>
      `;
  bigProjectsGrid.appendChild(projectContainer);
};

projectBtns.addEventListener("click", (e) => {
  let tech = e.target.innerText;
  smallProjectsGrid.innerHTML = "";
  bigProjectsGrid.innerHTML = "";
  (tech.includes("JavaScript") ? projects : reactProjects).forEach(
    (project) => {
      createCard(project);
    }
  );
  if (tech.includes("React")) {
    bigReactProjects.forEach((project) => createProjectCard(project));
  }
});

const allProjects = () => {
  projects.forEach((project) => createCard(project));
  reactProjects.forEach((project) => createCard(project));
  bigReactProjects.forEach((project) => createProjectCard(project));
};

allProjects();
