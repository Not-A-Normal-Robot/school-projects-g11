"use strict";

const SERVICES_STORAGE_KEY = 'services';
const PROJECTS_STORAGE_KEY = 'projects';

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

/**
 * @typedef { {
 *  "name": string;
 *  "status": "Up" | "Down";
 *  "description": string;
 * } } Service
 * 
 * @typedef { {
 *  "name": string;
 *  "serviceUsed": string;
 *  "status": "Up" | "Down";
 *  "description": string;
 * } } Project
 */

/** @returns {Service[]} */
function getServices(){
    /** @type {Service[]} */
    let services = [
        {
            name: "Vue Server",
            status: "Up",
            description: "This service hosts projects made in Vue."
        },
        {
            name: "React Server",
            status: "Up",
            description: "This service hosts projects made in React."
        },
        {
            name: "Serverless API",
            status: "Down",
            description: "This service hosts serverless APIs made in Node.js."
        },
        {
            name: "PHP Server",
            status: "Up",
            description: "This service hosts projects made in PHP."
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
            description: "This project is an e-commerce site made in Vue."
        },
        {
            name: "Database Manager",
            serviceUsed: "PHP Server",
            status: "Down",
            description: "This project is a database manager made in PHP."
        },
        {
            name: "Tetris Game",
            serviceUsed: "React Server",
            status: "Up",
            description: "This project is a Tetris game made in React."
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
    window.location.reload();
}

function toggleServiceStatus(index) {
    let services = getServices();

    services[index].status = services[index].status === "Up" ? "Down" : "Up";

    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

    refreshPage();
}

function toggleProjectStatus(index) {
    let projects = getProjects();

    projects[index].status = projects[index].status === "Up" ? "Down" : "Up";

    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));

    refreshPage();
}

function deleteService(index) {
    let services = getServices();

    services.splice(index, 1);

    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

    refreshPage();
}

function deleteProject(index) {
    let projects = getProjects();

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

        for(let [index, service] of Object.entries(services)) {
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

                const button0 = document.createElement('button');
                button0.classList.add("btn", "btn-secondary");
                button0.appendChild(createInfoIcon());
                button0.title = "Info";
                button0.addEventListener('click', () => alert(`Description for '${service.name}': \n${service.description}`));

                const button1 = document.createElement('button');
                button1.classList.add("btn", "btn-primary");
                if(service.status === "Up") {
                    button1.appendChild(createStopIcon());
                    button1.title = "Stop";
                } else {
                    button1.appendChild(createStartIcon());
                    button1.title = "Start";
                }
                button1.addEventListener('click', () => toggleServiceStatus(index));
                
                const button2 = document.createElement('button');
                button2.classList.add("btn", "btn-danger");
                button2.appendChild(createTrashIcon());
                button2.title = "Delete";
                button2.addEventListener('click', () => deleteService(index));

                td2.append(button0, button1, button2);
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

        for(let [index, project] of Object.entries(projects)) {
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

                const button0 = document.createElement('button');
                button0.classList.add("btn", "btn-secondary");
                button0.appendChild(createInfoIcon());
                button0.title = "Info";
                button0.addEventListener('click', () => alert(`Description for '${project.name}': \n${project.description}`));
                
                const button1 = document.createElement('button');
                button1.classList.add("btn", "btn-primary");
                if(project.status === "Up") {
                    button1.appendChild(createStopIcon());
                    button1.title = "Stop";
                } else {
                    button1.appendChild(createStartIcon());
                    button1.title = "Start";
                }
                button1.addEventListener('click', () => toggleProjectStatus(index));
                
                const button2 = document.createElement('button');
                button2.classList.add("btn", "btn-danger");
                button2.appendChild(createTrashIcon());
                button2.title = "Delete";
                button2.addEventListener('click', () => deleteProject(index));

                td3.append(button0, button1, button2);
                tr.appendChild(td3);
            }


            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
    }
}


async function main() {
    let services = getServices();
    let projects = getProjects();

    await new Promise((res) => {
        window.addEventListener('DOMContentLoaded', res);
    });

    /** @type {HTMLTableElement | null} */
    const servicesTable = document.getElementById('services-table');

    /** @type {HTMLTableElement | null} */
    const projectsTable = document.getElementById('projects-table');

    if(servicesTable) {
        updateServicesTable(servicesTable, services);
    }

    if(projectsTable) {
        updateProjectsTable(projectsTable, projects);
    }

    /** @type {HTMLSelectElement | null} */
    const serviceSelect = document.getElementById('service-select');

    if(serviceSelect) {
        for(const [index, service] of Object.entries(services)) {
            const option = document.createElement('option');

            option.value = index;
            option.textContent = service.name;

            serviceSelect.appendChild(option);
        }
    }

    /** @type {HTMLFormElement | null} */
    const serviceForm = document.getElementById('service-form');

    /** @type {HTMLFormElement | null} */
    const projectForm = document.getElementById('project-form');

    if(serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(serviceForm);

            const name = formData.get('name');

            const description = formData.get('description');

            services.push({
                name,
                description,
                status: "Up"
            });

            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

            refreshPage();
        });
    }

    if(projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(projectForm);

            const name = formData.get('name');
            const serviceUsed = services[Number(formData.get('service'))].name;
            const description = formData.get('description');

            projects.push({
                name,
                serviceUsed,
                description,
                status: "Up"
            });

            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));

            refreshPage();
        });
    }
}

main();