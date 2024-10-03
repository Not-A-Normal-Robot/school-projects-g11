"use strict";

/** @type {HTMLOutputElement} */
const output = document.getElementById('output');

/** @param {string} message */
function log(message) {
    console.log(message);
    
    const p = document.createElement('p');
    p.textContent = message;
    output.appendChild(p);
}

/**
 * @typedef {{
 *  student: string,
 *  subject: string,
 *  kind: "task" | "project" | "test" | "final",
 *  grade: number
 * }} Score
 */

/** @type Score[] */
let scores = [
    {
        student: "Kate",
        subject: "Software Engineering",
        kind: "task",
        grade: 92.6
    },
    {
        student: "Konqi",
        subject: "User Interface Design",
        kind: "project",
        grade: 89.2
    },
    {
        student: "Xenia",
        subject: "Offensive Cybersecurity",
        kind: "test",
        grade: 100.0
    }
];

function displayScores() {
    scores.forEach(function(score) {
        log(`${score.student} got a ${score.grade} in a ${score.subject} ${score.kind}!`);
    })
}

log("----------[ Part 1: Displaying ]----------");
displayScores();

scores.push({
    student: "Kiki",
    subject: "Digital Arts",
    kind: "final",
    grade: 87.5
}, {
    student: "Tux",
    subject: "Operating Systems",
    kind: "task",
    grade: 85.3
}, {
    student: "Ferris",
    subject: "Embedded Systems",
    kind: "project",
    grade: 91.7
});

log("----------[ Part 2: Pushing ]----------");
displayScores();

const taughtSubjects = new Set([
    "Software Engineering",
    "User Interface Design",
    "Digital Arts",
    "Operating Systems",
    "Embedded Systems"
]);

scores = scores.filter(function(score) {
    return taughtSubjects.has(score.subject);
});

log("----------[ Part 3: Filtering/Deleting ]----------");
displayScores();