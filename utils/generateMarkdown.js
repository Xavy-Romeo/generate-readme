// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.projectTitle}
    
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
  #### ${data.firstName} ${data.lastName}
  `;
}

module.exports = generateMarkdown;
