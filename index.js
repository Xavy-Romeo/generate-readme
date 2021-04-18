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
        type: 'list',
        name: 'license',
        message: 'Choose a license from the list.',
        choices: ['NONE', 'MIT', 'GNU (General Public License)'],
        validate: input => {
            if (!input) {
                return false;
            }
            return true;
        }
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
            return generateMarkdown(data);
        })
        .then(writeToFile);
}

// Function call to initialize app
init();
