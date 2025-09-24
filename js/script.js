// Div where profile information will appear
const overview = document.querySelector(".overview");
// My user name
const username = "bwefler";
// Select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

// Async function to fetch information from GitHub profile 
// using the GitHub API address
const fetchInfo = async function () {
    // console.log(`### Awaiting fetch -> info ###`)
    const info = await fetch(`https://api.github.com/users/${username}`);
    // console.log("### Info:");
    // console.log(info);

    // Resolve the JSON response. 
    // console.log("### Awaiting info.json ###");
    const response = await info.json();
    // console.log("### Response:");
    // console.log(response);

    // Call the function displaying the user information,
    // passing the JSON data as an argument.
    displayFetchedInfo(response);
};
fetchInfo();

// Display the fetched user information on the page. 
const displayFetchedInfo = function (json) {
    // (Testing access to JSON elements)
    // console.log(`Name: ${json.name}`);

    // Create a new div and give it a class of “user-info”. 
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    // Populate the div with elements for 
    // figure, image, and paragraphs
    // Use the JSON data to grab the relevant properties 
    // to display on the page.
    userInfo.innerHTML = `
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
    overviewElement.append(userInfo);

    // Fetch repos
    gitRepos();
};

// Async function to fetch repos
const gitRepos = async function () {
    // console.log("### Per page ###");
    const fetchRepos = await 
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    // console.log(fetchRepos);

    // Resolve the JSON response. 
    // console.log("### Awaiting fetchRepos.json ###");
    const repoData = await fetchRepos.json();
    console.log("### repoData:"); // ###
    console.log(repoData); // ###

    // Display info about each repo
    displayRepoInfo(repoData);
};

// Display information about each repo
const displayRepoInfo = function (repos) {
    // Create a list item for each repo
    for (let repo in repos) {
        let repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");
        
        // Give each list item a class of "repo" and an <h3> element 
        // with the repo name
        let repoName = document.createElement("h3");
        console.log(repos[repo].name);
        repoName.innerText = repos[repo].name;
        console.log(`### repoName ###`);
        console.log(`${repoName.innerText}`);
        
        // Append the list item to the global variable that selects
        // the unordered repos list
        repoListItem.append(repos[repo].name);
        repoList.append(repoListItem);
    }
}
