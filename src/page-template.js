const getJobInfo = (employee) => {
    if (employee.getRole() === "Manager") {
        return `<p>Office number: ${employee.getOfficeNumber()}</p>`;
    } else if (employee.getRole() === "Intern") {
        return `<p>School: ${employee.getSchool()}</p>`;
    } else if (employee.getRole() === "Engineer") {
        return `<p>GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a></p>`;
    }  
}

const getIcon = (employee) => {
    if (employee.getRole() === "Manager") {
        return `<i class="fa fa-solid fa-user-tie"></i>`;
    } else if (employee.getRole() === "Intern") {
        return `<i class="fa fa-solid fa-user-graduate"></i>`;
    } else if (employee.getRole() === "Engineer") {
        return `<i class="fa fa-solid fa-laptop-code"></i>`;
    } 
}

const generateCards = (employeesArr) => {
    return `
    <section class="section">
        <div class="container">
            <div class='columns mt-5 is-8 is-variable is-centered is-multiline'>
        ${employeesArr.map((employee) => {
            return `
      <div class='column is-two-thirds-tablet is-one-third-desktop'>
        <div class="card">
          <div class='media-content'>
            <h1 class="title is-3">${employee.getName()}</h1>
            <span class="icon-text">
                <span class="icon">
                    ${getIcon(employee)}
                </span>
                <span class="subtitle is-4">${employee.getRole()}</span>
            </span>
          </div>
          <div class="card-content">
            <p>ID: ${employee.getId()}</p>
            <p>Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></p>
            ${getJobInfo(employee)}
          </div>
        </div>
      </div>
            `
        })
    .join('')}
            </div>
        </div>
    </section>
    `        
};

const generateHTML = (employeesArr) => {
    return ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie-edge">
        <title>Team Profile</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.css'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
        <link rel="stylesheet" href="style.css"/>
    </head>
    <div>
        <h1 class="title is-1 has-text-centered" id="header">My Team</h1>
    </div>
    <body>
        <div>
            ${generateCards(employeesArr)}
        </div>
    </body>
    </html>
    `
};

module.exports = generateHTML;