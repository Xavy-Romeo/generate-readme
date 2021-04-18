// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === 'NONE') {
    return '';
  } 
  else {
      return `![APM](https://img.shields.io/apm/l/npm)`;
  }
};

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return '';
  }
  else if (license === 'MIT'){
    return `View entire license here: https://choosealicense.com/licenses/mit/`;
  }
  else {
    return `View entire license here: https://choosealicense.com/licenses/gpl-3.0/#`;
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license === 'NONE') {
    return '';
  }
  else if (license === 'MIT'){
    return `
  MIT License

  Copyright (c) 2021 ${license.firstName} ${license.lastName}

  Permission is hereby granted, free of charge, to any person obtaining a copy...
    `;
  }
  else {
    return `
  GNU GENERAL PUBLIC LICENSE
  Version 3, 29 June 2007

  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
  Everyone is permitted to copy and distribute verbatim copies
  of this license document, but changing it is not allowed...
  `;
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.projectTitle} 
  ${renderLicenseBadge(data.license)}
    
  ## Description
  #### ${data.description}
  <br>  
  
  ## Table of Contents
  1. [Installation](#Installation)
  2. [Usage](#Usage)
  3. [License](#License)
  4. [Contributing](#Contributing)
  5. [Tests](#Tests)
  6. [Questions](#Questions)
  7. [Author](#Author)
  <br>

  ## Installation
  #### ${data.installation}
  <br>
  
  ## Usage
  #### ${data.usage}
  <br>

  ## License
  ${renderLicenseSection(data.license)}
  ${renderLicenseLink(data.license)}
  <br>

  ## Contributing
  <br>

  ## Tests
  <br>

  ## Questions
  #### Any questions, contact me by email or visit my GitHub: 
  #### Email: ${data.email}
  #### GitHub: github.com/${data.github}
  <br> 
  
  ## Author
  #### ${data.firstName} ${data.lastName}`
  ;
}

module.exports = generateMarkdown;
