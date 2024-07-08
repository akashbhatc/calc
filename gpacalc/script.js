function navigateTo(page) {
    document.getElementById('sgpa-page').classList.add('hidden');
    document.getElementById('cgpa-page').classList.add('hidden');
    document.getElementById('percentage-page').classList.add('hidden');
    if (page === 'sgpa') {
        document.getElementById('sgpa-page').classList.remove('hidden');
    } else if (page === 'cgpa') {
        document.getElementById('cgpa-page').classList.remove('hidden');
    } else if (page === 'percentage') {
        document.getElementById('percentage-page').classList.remove('hidden');
    }
}

function calculateSGPA() {
    const credits = document.querySelectorAll('.credits');
    const grades = document.querySelectorAll('.grade');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < credits.length; i++) {
        const credit = parseFloat(credits[i].value);
        const grade = getGradePoint(grades[i].value);

        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalPoints += credit * grade;
        }
    }

    const sgpa = totalPoints / totalCredits;
    document.getElementById('sgpa-result').textContent = `SGPA: ${sgpa.toFixed(2)}`;
}

function calculateCGPA() {
    const numSemesters = parseInt(document.getElementById('num-semesters').value);
    const sgpas = document.querySelectorAll('.sgpa-input');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < numSemesters; i++) {
        const sgpa = parseFloat(sgpas[i].value);
        const credits = parseFloat(document.querySelectorAll('.sgpa-credits')[i].value);
        if (!isNaN(sgpa) && !isNaN(credits)) {
            totalCredits += credits;
            totalPoints += sgpa * credits;
        }
    }

    const cgpa = totalPoints / totalCredits;
    document.getElementById('cgpa-result').textContent = `CGPA: ${cgpa.toFixed(2)}`;
}

function generateSemesterInputs() {
    const numSemesters = parseInt(document.getElementById('num-semesters').value);
    const container = document.getElementById('semesters-inputs');
    container.innerHTML = '';

    for (let i = 0; i < numSemesters; i++) {
        const inputSGPA = document.createElement('input');
        inputSGPA.type = 'number';
        inputSGPA.className = 'sgpa-input';
        inputSGPA.placeholder = `SGPA of Semester ${i + 1}`;

        const inputCredits = document.createElement('input');
        inputCredits.type = 'number';
        inputCredits.className = 'sgpa-credits';
        inputCredits.placeholder = `Credits of Semester ${i + 1}`;

        container.appendChild(inputSGPA);
        container.appendChild(inputCredits);
        container.appendChild(document.createElement('br'));
    }
}

function calculatePercentage() {
    const cgpa = parseFloat(document.getElementById('current-cgpa').value);
    const percentage = (cgpa - 0.75) * 10;
    document.getElementById('percentage-result').textContent = `Percentage: ${percentage.toFixed(2)}%`;
}

function getGradePoint(grade) {
    switch (grade.toUpperCase()) {
        case 'S': return 10;
        case 'A': return 9;
        case 'B': return 8;
        case 'C': return 7;
        case 'D': return 5;
        case 'E': return 4;
        case 'F': return 0;
        default: return 0;
    }
}
