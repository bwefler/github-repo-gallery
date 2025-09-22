// Div where profile information will appear
const overview = document.querySelector(".overview");
// My user name
const username = "bwefler";

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
const jsonData = fetchInfo();

// Function to display the fetched user information on the page. 
const displayFetchedInfo = function (json) {
    // (Testing access to JSON elements)
    // console.log(`Name: ${json.name}`);

    // Create a new div and give it a class of “user-info”. 
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    // Using innerHTML, populate the div, with elements for 
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
};




