const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const userInput = (input, regex, blankError, inputError) => {
    if (!input) {
        return blankError;
    }
    else
     if (regex === '') {
        return true;
    }
    else if (!regex.test(input)) {
        return inputError;
    }
    else {
        return true;
    }
 };

const firstName = input => {
    let firstRegex = /^[a-zA-Z]+$/;
    let firstBlankError = 'Please enter your first name.';
    let firstInputError = 'Please enter letters only.';
    
    return userInput(input, firstRegex, firstBlankError, firstInputError);
};

const lastName = input => {
    let lastRegex = /^[a-zA-Z]+$/;
    let lastBlankError = 'Please enter your last name.';
    let lastInputError = 'Please enter letters only.';
    
    return userInput(input, lastRegex, lastBlankError, lastInputError);
};

const email = input => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    let emailBlankError = 'Please enter your email.';
    let emailInputError = 'Please enter a valid email format.';
    
    return userInput(input, emailRegex, emailBlankError, emailInputError);
};

const github = input => {
    let githubBlankError = 'Please enter your GitHub username.';
    
    return userInput(input, '', githubBlankError, '');
};

const projectName = input => {
    let projectBlankError = 'Please enter the title of your project.';
    
    return userInput(input, '', projectBlankError, '');
};

const projectDescription = input => {
    let descriptionBlankError = 'Please enter the title of your project.';
    
    return userInput(input, '', descriptionBlankError, '');
};

const projectInstall = input => {
    let installBlankError = 'Please enter instructions to install your project.';
    
    return userInput(input, '', installBlankError, '');
};

const usage = input => {
    let usageBlankError = 'Please enter usage information for your project.';
    
    return userInput(input, '', usageBlankError, '');
};

const contribution = input => {
    let contributionBlankError = 'Please enter contribution guidelines.';
    
    return userInput(input, '', contributionBlankError, '');
};

const tests = input => {
    let testsBlankError = 'Please enter tests and instruction on how to run them.';
    
    return userInput(input, '', testsBlankError, '');
};
const questions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is your first name? (Required)',
        validate: firstNameInput => firstName(firstNameInput),
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is your last name? (Required)',
        validate: lastNameInput => lastName(lastNameInput),
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address: (Required)',
        validate: emailInput => email(emailInput),
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username: (Required)',
        validate: usernameInput => github(usernameInput),
    },
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project? (Required)',
        validate: projectInput => projectName(projectInput),
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project. (Required)',
        validate: descriptionInput => projectDescription(descriptionInput),
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter project installation instructions. (Required)',
        validate: installInput => projectInstall(installInput),
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions and examples for use. (Required)',
        validate: usageInput => usage(usageInput),
    },
    {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Would you like others to contribute to your application or package?',
        default: false,
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter guidelines for how to contribute to your application or package. (Required)',
        when: ({confirmContributing}) => confirmContributing,
        validate: contributingInput => contribution(contributingInput),
    },
    {
        type: 'confirm',
        name: 'confirmTests',
        message: 'Would you like to add examples and test how to run them?',
        default: false,
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter tests for your applications and instruction on how to run them. (Required)',
        when: ({confirmTests}) => confirmTests,
        validate: testsInput => tests(testsInput),
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Choose a license from the list.',
        choices: ['test1', 'test2'],
    }

];

const promptUser = () => inquirer.prompt(questions);

// TODO: Create a function to write README file
const writeToFile = readmeFile => {
    return new Promise ((resolve, reject) => {
        fs.writeFile('./dist/README.md', readmeFile, err => {
            if (err) {
                reject(err);
                return;
            }
            else{
                resolve({
                    ok: true,
                    message: 'README created!',
                });
            }
        });
    });
};

// TODO: Create a function to initialize app
const init = () => {
    promptUser()
        .then(data => {
            console.log(data);
            return generateMarkdown(data);
        })
        .then(writeToFile);
}

// Function call to initialize app
init();


// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title
     // of my project and sections entitled Description, Table of Contents, 
     // Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information,
     // contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled 
     // Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a 
     // notice is added to the section of the README entitled License that 
     // explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with 
     // a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with 
     // instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README