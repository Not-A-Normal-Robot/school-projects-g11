/// <reference lib="dom" />
"use strict";

/**
 * @typedef { {
*  "name": string;
*  "status": "Up" | "Down";
*  "description": string;
*  "releaseDate": string;
* } } Service
* 
* @typedef { {
*  "name": string;
*  "serviceUsed": string;
*  "status": "Up" | "Down";
*  "description": string;
*  "releaseDate": string;
* } } Project
*/

/** @type {HTMLDivElement | null} */
const modal = document.getElementById('modal');

/** @type {HTMLDivElement | null} */
const modalBody = document.getElementById('modal-body');

/** @type {HTMLTableElement | null} */
const servicesTable = document.getElementById('services-table');

/** @type {HTMLTableElement | null} */
const projectsTable = document.getElementById('projects-table');

/** @type {HTMLSelectElement | null} */
const serviceSelect = document.getElementById('service-select');

/** @type {HTMLFormElement | null} */
const serviceForm = document.getElementById('service-form');

/** @type {HTMLHeadingElement | null} */
const serviceFormTitle = document.getElementById('service-form-title');

/** @type {HTMLInputElement | null} */
const serviceFormIndex = document.getElementById('service-form-index');

/** @type {HTMLButtonElement | null} */
const newServiceButton = document.getElementById('new-service');

/** @type {HTMLFormElement | null} */
const projectForm = document.getElementById('project-form');

/** @type {HTMLHeadingElement | null} */
const projectFormTitle = document.getElementById('project-form-title');

/** @type {HTMLInputElement | null} */
const projectFormIndex = document.getElementById('project-form-index');

/** @type {HTMLButtonElement | null} */
const newProjectButton = document.getElementById('new-project');

const SERVICES_STORAGE_KEY = 'services';
const PROJECTS_STORAGE_KEY = 'projects';

/**
 * @param {Service} service 
 */
function describeService(service) {
    const header = "Service Info\n";
    const message = 
        `Name: ${service.name}\n` +
        `Status: ${service.status}\n` +
        `Description: ${service.description}\n` +
        `Release Date: ${new Date(service.releaseDate).toLocaleDateString('en-US')}`;

    if(modalBody && modal) {
        modalBody.textContent = message;
    } else {
        alert(header + message);
    }
}

/**
 * @param {Project} project
 */
function describeProject(project) {
    const header = "Project Info\n";
    const message =
        `Name: ${project.name}\n` +
        `Service Used: ${project.serviceUsed}\n` +
        `Status: ${project.status}\n` +
        `Description: ${project.description}\n` +
        `Release Date: ${new Date(project.releaseDate).toLocaleDateString('en-US')}`;

    if(modalBody && modal) {
        modalBody.textContent = message;
    } else {
        alert(header + message);
    }
}

/**
 * @param {number} index
 */
function enableEditMode(index) {
    if(serviceForm && serviceFormTitle && serviceFormIndex) {
        serviceFormTitle.textContent = "Edit Service";
        serviceFormIndex.value = index.toString();
    
        const services = getServices();

        const nameElement = serviceForm.querySelector('input[name="name"]');
        const descriptionElement = serviceForm.querySelector('textarea[name="description"]');
        const releaseDateElement = serviceForm.querySelector('input[name="releaseDate"]');

        if(nameElement) nameElement.value = services[index].name;
        if(descriptionElement) descriptionElement.value = services[index].description;
        if(releaseDateElement) releaseDateElement.value = services[index].releaseDate;
    }

    if(projectForm && projectFormTitle && projectFormIndex) {
        projectFormTitle.textContent = "Edit Project";
        projectFormIndex.value = index.toString();
    
        const projects = getProjects();

        const nameElement = projectForm.querySelector('input[name="name"]');
        const descriptionElement = projectForm.querySelector('textarea[name="description"]');
        const releaseDateElement = projectForm.querySelector('input[name="releaseDate"]');

        if(nameElement) nameElement.value = projects[index].name;
        if(descriptionElement) descriptionElement.value = projects[index].description;
        if(releaseDateElement) releaseDateElement.value = projects[index].releaseDate;
        if(serviceSelect) serviceSelect.value = projects[index].serviceUsed;
    }
}

function disableEditMode() {
    if(serviceForm && serviceFormTitle && serviceFormIndex) {
        serviceFormTitle.textContent = "Add Service";
        serviceFormIndex.value = "";
    
        const nameElement = serviceForm.querySelector('input[name="name"]');
        const descriptionElement = serviceForm.querySelector('textarea[name="description"]');
        const releaseDateElement = serviceForm.querySelector('input[name="releaseDate"]');

        if(nameElement) nameElement.value = "";
        if(descriptionElement) descriptionElement.value = "";
        if(releaseDateElement) releaseDateElement.value = "";
    }

    if(projectForm && projectFormTitle && projectFormIndex) {
        projectFormTitle.textContent = "Add Project";
        projectFormIndex.value = "";
    
        const nameElement = projectForm.querySelector('input[name="name"]');
        const descriptionElement = projectForm.querySelector('textarea[name="description"]');
        const releaseDateElement = projectForm.querySelector('input[name="releaseDate"]');

        if(nameElement) nameElement.value = "";
        if(descriptionElement) descriptionElement.value = "";
        if(releaseDateElement) releaseDateElement.value = "";
        if(serviceSelect) serviceSelect.value = serviceSelect.options[0].value || "";
    }
}

function createInfoIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("bi", "bi-info-circle-fill");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2");

    svg.appendChild(path);

    return svg;
}
function createStartIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("bi", "bi-play-fill");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393");

    svg.appendChild(path);

    return svg;
}
function createStopIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("bi", "bi-stop-fill");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5");

    svg.appendChild(path);

    return svg;
}
function createPencilIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("bi", "bi-pencil");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325");

    svg.appendChild(path);

    return svg;
}
function createTrashIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.classList.add("bi", "bi-trash-fill");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0");
    
    svg.appendChild(path);

    return svg;
}

/** @returns {Service[]} */
function getServices(){
    /** @type {Service[]} */
    let services = [
        {
            name: "Vue Server",
            status: "Up",
            description: "This service hosts projects made in Vue.",
            releaseDate: "2021-09-01"
        },
        {
            name: "React Server",
            status: "Up",
            description: "This service hosts projects made in React.",
            releaseDate: "2019-04-16"
        },
        {
            name: "Serverless API",
            status: "Down",
            description: "This service hosts serverless APIs made in Node.js.",
            releaseDate: "2020-12-25"
        },
        {
            name: "PHP Server",
            status: "Up",
            description: "This service hosts projects made in PHP.",
            releaseDate: "2018-07-19"
        }
    ];

    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);

    if(stored) {
        services = JSON.parse(stored);
    } else {
        localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    }

    return services;
}

/** @returns {Project[]} */
function getProjects(){
    /** @type {Project[]} */
    let projects = [
        {
            name: "E-commerce Site",
            serviceUsed: "Vue Server",
            status: "Up",
            description: "This project is an e-commerce site made in Vue.",
            releaseDate: "2021-09-01"
        },
        {
            name: "Database Manager",
            serviceUsed: "PHP Server",
            status: "Down",
            description: "This project is a database manager made in PHP.",
            releaseDate: "2018-07-19"
        },
        {
            name: "Tetris Game",
            serviceUsed: "React Server",
            status: "Up",
            description: "This project is a Tetris game made in React.",
            releaseDate: "2019-04-16"
        }
    ];

    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);

    if(stored) {
        projects = JSON.parse(stored);
    } else {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    }

    return projects;
}

function refreshPage() {
    disableEditMode();
    window.location.reload();
}

function toggleServiceStatus(index) {
    const services = getServices();

    services[index].status = services[index].status === "Up" ? "Down" : "Up";

    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

    refreshPage();
}

function toggleProjectStatus(index) {
    const projects = getProjects();

    projects[index].status = projects[index].status === "Up" ? "Down" : "Up";

    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));

    refreshPage();
}

function deleteService(index) {
    const services = getServices();

    services.splice(index, 1);

    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

    refreshPage();
}

function deleteProject(index) {
    const projects = getProjects();

    projects.splice(index, 1);

    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));

    refreshPage();
}

/**
 * @param {HTMLTableElement} table 
 * @param {Service[]} services 
 */
function updateServicesTable(table, services) {
    const isDashboard = table.classList.contains("dashboard");

    table.innerHTML = "";

    // thead
    {
        const thead = document.createElement('thead');

        const tr = document.createElement('tr');

        const th1 = document.createElement('th');
        th1.textContent = "Service Name";
        th1.scope = "col";

        const th2 = document.createElement('th');
        th2.textContent = "Status";
        th2.scope = "col";

        tr.append(th1, th2);

        if(!isDashboard) {
            const th3 = document.createElement('th');
            th3.textContent = "Actions";
            th3.scope = "col";
            th3.colSpan = 2;

            tr.append(th3);
        }

        thead.appendChild(tr);
        table.appendChild(thead);
    }

    // tbody
    {
        const tbody = document.createElement('tbody');

        for(const [index, service] of Object.entries(services)) {
            const tr = document.createElement('tr');
            tr.classList.add("align-middle");

            const th = document.createElement('th');
            th.textContent = service.name;
            th.scope = "row";
            th.classList.add("bg-transparent");

            const td = document.createElement('td');
            td.textContent = service.status;
            td.classList.add("bg-transparent");

            if(service.status === "Up") {
                tr.classList.add("bg-success-subtle");
            } else {
                tr.classList.add("bg-danger-subtle");
                td.classList.add("fw-bold");
            }

            tr.append(th, td);

            if(!isDashboard) {
                const td2 = document.createElement('td');
                td2.classList.add("bg-transparent");

                const infBtn = document.createElement('button');
                infBtn.classList.add("btn", "btn-secondary");
                infBtn.appendChild(createInfoIcon());
                infBtn.title = "Info";
                infBtn.setAttribute("data-bs-toggle", "modal");
                infBtn.setAttribute("data-bs-target", "#modal");
                infBtn.addEventListener('click', () => describeService(service));

                const editBtn = document.createElement('button');
                editBtn.classList.add("btn", "btn-primary");
                editBtn.appendChild(createPencilIcon());
                editBtn.title = "Edit";
                editBtn.addEventListener('click', () => enableEditMode(index));

                const toggleBtn = document.createElement('button');
                toggleBtn.classList.add("btn", "btn-warning");
                if(service.status === "Up") {
                    toggleBtn.appendChild(createStopIcon());
                    toggleBtn.title = "Stop";
                } else {
                    toggleBtn.appendChild(createStartIcon());
                    toggleBtn.title = "Start";
                }
                toggleBtn.addEventListener('click', () => toggleServiceStatus(index));
                
                const delBtn = document.createElement('button');
                delBtn.classList.add("btn", "btn-danger");
                delBtn.appendChild(createTrashIcon());
                delBtn.title = "Delete";
                delBtn.addEventListener('click', () => deleteService(index));

                td2.append(infBtn, editBtn, toggleBtn, delBtn);
                tr.appendChild(td2);
            }

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
    }
}

/**
 * @param {HTMLTableElement} table 
 * @param {Project[]} projects 
 */
function updateProjectsTable(table, projects) {
    const isDashboard = table.classList.contains("dashboard");

    table.innerHTML = "";

    // thead
    {
        const thead = document.createElement('thead');

        const tr = document.createElement('tr');

        const th1 = document.createElement('th');
        th1.textContent = "Project Name";
        th1.scope = "col";

        const th2 = document.createElement('th');
        th2.textContent = "Service Used";
        th2.scope = "col";

        const th3 = document.createElement('th');
        th3.textContent = "Status";
        th3.scope = "col";

        tr.append(th1, th2, th3);

        if(!isDashboard) {
            const th4 = document.createElement('th');
            th4.textContent = "Actions";
            th4.scope = "col";
            th4.colSpan = 2;

            tr.append(th4);
        }


        thead.appendChild(tr);
        table.appendChild(thead);
    }

    // tbody
    {
        const tbody = document.createElement('tbody');

        for(const [index, project] of Object.entries(projects)) {
            const tr = document.createElement('tr');
            tr.classList.add("align-middle");

            const th = document.createElement('th');
            th.textContent = project.name;
            th.scope = "row";
            th.classList.add("bg-transparent");

            const td1 = document.createElement('td');
            td1.textContent = project.serviceUsed;
            td1.classList.add("bg-transparent");

            const td2 = document.createElement('td');
            td2.textContent = project.status;
            td2.classList.add("bg-transparent");

            if(project.status === "Up") {
                tr.classList.add("bg-success-subtle");
            } else {
                tr.classList.add("bg-danger-subtle");
                td2.classList.add("fw-bold");
            }

            tr.append(th, td1, td2);

            if(!isDashboard) {
                const td3 = document.createElement('td');
                td3.classList.add("bg-transparent");

                const infBtn = document.createElement('button');
                infBtn.classList.add("btn", "btn-secondary");
                infBtn.appendChild(createInfoIcon());
                infBtn.title = "Info";
                infBtn.setAttribute("data-bs-toggle", "modal");
                infBtn.setAttribute("data-bs-target", "#modal");
                infBtn.addEventListener('click', () => describeProject(project));

                const editBtn = document.createElement('button');
                editBtn.classList.add("btn", "btn-primary");
                editBtn.appendChild(createPencilIcon());
                editBtn.title = "Edit";
                editBtn.addEventListener('click', () => enableEditMode(index));
                
                const toggleBtn = document.createElement('button');
                toggleBtn.classList.add("btn", "btn-warning");
                if(project.status === "Up") {
                    toggleBtn.appendChild(createStopIcon());
                    toggleBtn.title = "Stop";
                } else {
                    toggleBtn.appendChild(createStartIcon());
                    toggleBtn.title = "Start";
                }
                toggleBtn.addEventListener('click', () => toggleProjectStatus(index));
                
                const delBtn = document.createElement('button');
                delBtn.classList.add("btn", "btn-danger");
                delBtn.appendChild(createTrashIcon());
                delBtn.title = "Delete";
                delBtn.addEventListener('click', () => deleteProject(index));

                td3.append(infBtn, editBtn, toggleBtn, delBtn);
                tr.appendChild(td3);
            }


            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
    }
}


async function main() {
    const services = getServices();
    const projects = getProjects();

    await new Promise((res) => {
        globalThis.addEventListener('DOMContentLoaded', res);
    });

    if(servicesTable) {
        updateServicesTable(servicesTable, services);
    }

    if(projectsTable) {
        updateProjectsTable(projectsTable, projects);
    }

    if(serviceSelect) {
        for(const service of services) {
            const option = document.createElement('option');

            option.value = service.name;
            option.textContent = service.name;

            serviceSelect.appendChild(option);
        }
    }

    if(serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(serviceForm);
            const name = formData.get('name');
            const description = formData.get('description');
            const releaseDate = formData.get('releaseDate');
            const index = formData.get('index');

            if(!index || index === "" || index < 0 || index >= services.length) {
                services.push({
                    name,
                    description,
                    releaseDate,
                    status: "Up"
                });
            } else {
                services[index].name = name;
                services[index].description = description;
                services[index].releaseDate = releaseDate;
            }

            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

            refreshPage();
        });
    }

    if(projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(projectForm);

            const name = formData.get('name');
            const serviceUsed = formData.get('serviceUsed');
            const description = formData.get('description');
            const releaseDate = formData.get('releaseDate');
            const index = formData.get('index');

            if(!index || index === "" || index < 0 || index >= projects.length) {
                projects.push({
                    name,
                    serviceUsed,
                    description,
                    releaseDate,
                    status: "Up"
                });
            } else {
                projects[index].name = name;
                projects[index].serviceUsed = serviceUsed;
                projects[index].description = description;
                projects[index].releaseDate = releaseDate;
            }

            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));

            refreshPage();
        });
    }

    if(newServiceButton) {
        newServiceButton.addEventListener('click', disableEditMode);
    }

    if(newProjectButton) {
        newProjectButton.addEventListener('click', disableEditMode);
    }

    document.querySelectorAll('input[type="date"]').forEach((input) => {
        const today = new Date();
        input.setAttribute("max", today.toISOString().split('T')[0]);
    });
}

main();