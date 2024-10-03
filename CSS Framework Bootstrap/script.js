"use strict";

const SERVICES_STORAGE_KEY = 'services';
const PROJECTS_STORAGE_KEY = 'projects';


/**
 * @typedef { {
 *  "name": string;
 *  "status": "Up" | "Down";
 * } } Service
 * 
 * @typedef { {
 *  "name": string;
 *  "serviceUsed": string;
 *  "status": "Up" | "Down";
 * }} Project
 */

/** @returns {Service[]} */
function getServices(){
    /** @type {Service[]} */
    let services = [
        {
            name: "Vue Server",
            status: "Up"
        },
        {
            name: "React Server",
            status: "Up"
        },
        {
            name: "Serverless API",
            status: "Down"
        },
        {
            name: "PHP Server",
            status: "Up"
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
        },
        {
            name: "Database Manager",
            serviceUsed: "PHP Server",
            status: "Down"
        },
        {
            name: "Tetris Game",
            serviceUsed: "React Server",
            status: "Up"
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
                td2.classList.add("bg-transparent", "d-flex", "gap-2");

                const button1 = document.createElement('button');
                button1.classList.add("btn", "btn-primary");
                button1.textContent = "Start/stop";
                button1.addEventListener('click', () => toggleServiceStatus(index));
                
                const button2 = document.createElement('button');
                button2.classList.add("btn", "btn-danger");
                button2.textContent = "Delete";
                button2.addEventListener('click', () => deleteService(index));

                td2.append(button1, button2);
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
                td3.classList.add("bg-transparent", "d-flex", "gap-2");
                
                const button1 = document.createElement('button');
                button1.classList.add("btn", "btn-primary");
                button1.textContent = "Start/stop";
                button1.addEventListener('click', () => toggleProjectStatus(index));
                
                const button2 = document.createElement('button');
                button2.classList.add("btn", "btn-danger");
                button2.textContent = "Delete";
                button2.addEventListener('click', () => deleteProject(index));

                td3.append(button1, button2);
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
    const productForm = document.getElementById('product-form');

    if(serviceForm) {
        serviceForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(serviceForm);

            const name = formData.get('name');

            services.push({
                name,
                status: "Up"
            });

            localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));

            refreshPage();
        });
    }

    if(productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(productForm);

            const name = formData.get('name');
            const serviceUsed = services[parseInt(formData.get('service'))].name;

            projects.push({
                name,
                serviceUsed,
                status: "Up"
            });

            localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));

            refreshPage();
        });
    }
}

main();