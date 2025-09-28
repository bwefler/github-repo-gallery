// Div where profile information will appear
const overview = document.querySelector(".overview");
// My user name
const username = "bwefler";
// Select the unordered list to display the repos list
const repoListSection = document.querySelector(".repo-list");
// Section where repo info appears
const repoInfoSection = document.querySelector(".repos");
// Section where repo data appears
const repoDataSection = document.querySelector(".repo-data");
// "Back to Repo Gallery" button
const backToGalleryButton = document.querySelector(".view-repos");
// "Search by name" placeholder
const filterInput = document.querySelector(".filter-repos");


// Async function to fetch information from GitHub profile 
// using the GitHub API address
const fetchInfo = async function () {
    /// console.log(`### Awaiting fetch -> info ###`)
    const info = await fetch(`https://api.github.com/users/${username}`);
    /// console.log("### Info:");
    /// console.log(info);

    // Resolve the JSON response. 
    /// console.log("### Awaiting info.json ###");
    const response = await info.json();
    /// console.log("### Response:");
    /// console.log(response);

    // Call the function displaying the user information,
    // passing the JSON data as an argument.
    displayUserInfo(response);
};
fetchInfo();

// Display the fetched user information on the page. 
const displayUserInfo = function (json) {
    /// (Testing access to JSON elements)
    /// console.log(`Name: ${json.name}`);

    // Create a new div and give it a class of “user-info”. 
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");

    // Populate the div with elements for 
    // figure, image, and paragraphs
    userInfoDiv.innerHTML = `
        <figure>
          <img alt="user avatar" src=${json.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${json.name}</p>
          <p><strong>Bio:</strong> ${json.bio}</p>
          <p><strong>Location:</strong> ${json.location}</p>
          <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
        </div>`;

    // Append the div to the overview element.
    const overviewElement = document.querySelector(".overview");
    overviewElement.append(userInfoDiv);

    // Fetch repos
    getRepos();
};

// Async function to fetch repos
const getRepos = async function () {
    /// console.log("### Per page ###");
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    /// console.log(fetchRepos);

    // Resolve the JSON response. 
    /// console.log("### Awaiting fetchRepos.json ###");
    const repoData = await fetchRepos.json();
    /// console.log("### repoData:");
    /// console.log(repoData);

    // Display info about each repo
    displayRepoInfo(repoData);
};

// Display information about each repo
const displayRepoInfo = function (repos) {

    // Show the filterInput element.
    filterInput.classList.remove("hide");

    // Create a list item for each repo
    for (const repo in repos) {
        const repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");

        // Give each list item a class of "repo" and an <h2>  
        // element with the repo name
        repoListItem.innerHTML = `<h2>${repos[repo].name}</h2>`
        // Append the list item to the global variable that 
        // selects the unordered repos list
        repoListSection.append(repoListItem);
    }
}

// Event listener for click event on the unordered list with a 
// class of “repo-list”
repoListSection.addEventListener("click", function (e) {
    // Check if the event target matches the <h3> element
    /// console.log(e.target);
    /// console.log(e.target.outerHTML);

    if (e.target.matches("h2")) {
        /// console.log(e.target);
        repoName = e.target.innerText;
        /// console.log(repoName);
        getRepoInfo(repoName);
    }
});

// Get specific repo information
const getRepoInfo = async function(repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    /// console.log(repoInfo);

    // Fetch data from languages_url property of repoInfo
    /// console.log("### repoInfo.languages_url");
    /// console.log(repoInfo.languages_url);
    const fetchLanguages = await fetch(repoInfo.languages_url); // ,,,
    // Save JSON response
    const languageData = await fetchLanguages.json(); // ,,,
    /// console.log("### languageData");
    /// console.log(languageData);

    // Add each language to an empty array called languages. 
    const languages = [];
    for (let lingo in languageData) {
        /// console.log("### lingo:");
        /// console.log(lingo);
        languages.push(lingo);
    }
    /// console.log("### languages:");
    /// for (let i of languages) {
        /// console.log(`language: ${i}`);
    /// }

    displaySpecificInfo(repoInfo, languages);
};

// Display the specific repo information
const displaySpecificInfo = function (repoInfo, languages) {
    // Empty the HTML of the section with a class of 
    // “repo-data” where the individual repo data appears.
    repoDataSection.innerHTML = "";
    // Create a new div element and add the selected repo’s name, 
    // description, default branch, and link to its code on GitHub.
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.svn_url}" target="_blank" 
            rel="noreferrer noopener">View Repo on GitHub!</a>`;
    
    // Append new div element to the section with “repo-data” class
    repoDataSection.append(repoInfoDiv);
    // Show the “repo-data” element. 
    // Hide the element with the class of “repos”
    // Show Repo Gallery button
    repoDataSection.classList.remove("hide");
    repoInfoSection.classList.add("hide");
    backToGalleryButton.classList.remove("hide");
}

// Event listener for "Back to Repo Gallery" button
backToGalleryButton.addEventListener ("click", function (e) {
    // Display "repos" class section
    repoInfoSection.classList.remove("hide");
    // Hide individual repo data section
    repoDataSection.classList.add("hide");
    // Hide "Back to Repo Gallery" button
    backToGalleryButton.classList.add("hide");
});

// An "input" event listener to filterInput. 
filterInput.addEventListener("input", function (e) {
    // Capture the value of the search text.
    let searchText = e.target.value;
    /// console.log(`### Search text:`);
    /// console.log(searchText);

    // Select all elements on the page with the "repo" class
    repos = document.querySelectorAll(".repo");

    // Lowercase value of the search text. 
    let searchTextLower = searchText.toLowerCase();
    /// console.log(searchTextLower);

    // Loop through each repo inside repos element. 
    /// console.log("### Loop thru repos");
    for(repo of repos) {
        // Lowercase value of innerText of each repo.
        /// console.log("### repo inner text:")
        const innerTextLower = repo.innerText.toLowerCase();
        /// console.log(innerTextLower);

        // If lowercase repo text includes lowercase search text,
        // show the repo. Otherwise, hide it.
        if (innerTextLower.includes(searchTextLower)) {
            /// console.log(`### Display ${innerTextLower}`);
            repo.classList.remove("hide");
        } else {
            /// console.log(`### Do not display ${innerTextLower}`);
            repo.classList.add("hide");
        }
    }
});