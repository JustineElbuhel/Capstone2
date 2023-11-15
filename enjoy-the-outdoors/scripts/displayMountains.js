'use strict'

window.onload = init;



//Navbar on scroll transition
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if(window.scrollY >= 56) {
        navbar.classList.remove('navbar-scrolled');
    }
    else if(window.scrollY < 56){
        navbar.classList.add('navbar-scrolled');
    }
})




//Call create dropdown options and initialize search button
function init(){
    initMountainDropdown();

    const mountainDropdown = document.getElementById("mountainSearchForm");
    mountainDropdown.addEventListener("submit", displayMountainInfo);
}

//Create mountain dropdown options function
function initMountainDropdown(){
    const searchByMountainDropdown = document.getElementById("searchByMountainDropdown");

    for(let index = 0; index < mountainsArray.length; index++){
        const mountainOptions = new Option(mountainsArray[index].name, mountainsArray[index].name);
        searchByMountainDropdown.appendChild(mountainOptions);
    }
}

//Display mountain information function
function displayMountainInfo(event){
    event.preventDefault();
    const mountain = document.getElementById("searchByMountainDropdown");
    const selectedMountainValue = mountain.value;
    console.log(selectedMountainValue);

    let matching = mountainsArray.find(mountains => mountains.name == selectedMountainValue);

    if(matching){
        document.getElementById("displayMountainsInfo").innerHTML = matching.name;
    }
    else{
        document.getElementById("displayMountainsInfo").innerHTML = "";
    }
}