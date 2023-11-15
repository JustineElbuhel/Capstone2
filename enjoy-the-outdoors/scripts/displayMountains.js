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
    //*Call function to display all moutain cards
    displayMountainCards();

    //*Call function to create dropdown options for mountains
    initMountainDropdown();

    //*Add event listioner to 
    const mountainDropdown = document.getElementById("searchByMountainDropdown");
    mountainDropdown.addEventListener('change', MountainInfo);
}

//Create mountain cards
function displayMountainCards(){
    //*Locate display div
    const showMountainsDiv = document.getElementById("displayMountainCards");

    let cards = ""
    for(let index = 0; index < mountainsArray.length; index++){
        cards += `
        <div class="card my-3" >
        <img src="images/${mountainsArray[index].img}" >
            <div class="card-info card-body">
                <h4>${mountainsArray[index].name}</h4>
                <div>
                <p class="mountain-text">${mountainsArray[index].desc}</p>
                </div>
            </div>
        </div>
        `;
    }
    showMountainsDiv.innerHTML = cards;
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
function MountainInfo(event){
    event.preventDefault();
    document.getElementById("myModal").innerHTML = "";
    const mountain = document.getElementById("searchByMountainDropdown");
    const selectedMountainValue = mountain.value;
    console.log(selectedMountainValue);

    let matching = mountainsArray.find(mountains => mountains.name.includes(selectedMountainValue));

    if(matching){
        document.getElementById("myModal").innerHTML = `
        <div class="modal fade" id="reg-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-center">
                                <img src="images/${matching.img}">
                            </div>
                            <h3 class="modal-title" id="modal-title">${matching.name}</h3>
                    </div>
                    <div class="modal-body">
                        <p><strong>${matching.desc}</strong></p>
                        <br>
                        <p><strong>Elevation: </strong>${matching.elevation}<br>
                        <strong>Latitude: </strong>${matching.coords.lat}<br>
                        <strong>Longitude: </strong>${matching.coords.lng}</p>
                    </div>
                    <div class="modal-footer">
                        POTENTIAL SUNRISE/SUNSET
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    else{
        document.getElementById("myModal").innerHTML = "";
    }
}