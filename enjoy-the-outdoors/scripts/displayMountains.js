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
    mountainDropdown.addEventListener('change', MountainInfoFromDropdown);
}

//Create mountain cards
function displayMountainCards(){
    //*Locate display div
    const showMountainsDiv = document.getElementById("displayMountainCards");
    
    let cards = ""
    //*For loop to extract and create cards  based on mountainsArray
    for(let index = 0; index < mountainsArray.length; index++){
        let parameter = mountainsArray[index].elevation;
        cards += `
        <div class="card card-custom my-3" id="${mountainsArray[index].name}"  onmouseover="MountainInfoFromCards('${parameter}')">
        <img src="images/${mountainsArray[index].img}" >
            <div class="card-info card-body">
                <h4>${mountainsArray[index].name}</h4>
                <div>
                    <p class="mountain-text"><strong>Effort: </strong>${mountainsArray[index].effort}<br><br>${mountainsArray[index].desc}</p>
                    
                    <button type="button" data-bs-toggle="modal" data-bs-target="#a${parameter}">More info</button>
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


//Modal from select dropdown
function MountainInfoFromDropdown(){
    document.getElementById("myModal").innerHTML = "";
    const mountain = document.getElementById("searchByMountainDropdown");
    const selectedMountainValue = mountain.value;

    //*Find the selected mountain based on user selection
    let matching = mountainsArray.find(mountains => mountains.name.includes(selectedMountainValue));

    //*Create a modal for matching mountain and insert in html
    if(matching){
        document.getElementById("myModal").innerHTML = `
        <div class="modal fade" id="reg-modal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-center">
                                <img src="images/${matching.img}" class="img-fluid">
                            </div>
                            <h3 class="modal-title" id="modal-title">${matching.name}</h3>
                    </div>
                    <div class="modal-body">
                        <p><strong>${matching.desc}</strong></p>
                        <br>
                        <div class="d-flex justify-content-around">
                            <div>
                                <strong>Effort: </strong>${matching.effort}
                                <p><strong>Elevation: </strong>${matching.elevation}<br>
                            </div>
                            <div>
                                <strong>Latitude: </strong>${matching.coords.lat}<br>
                                <strong>Longitude: </strong>${matching.coords.lng}</p>
                            </div>    
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end me-5">
                        <button class="w-25" type="button" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function MountainInfoFromCards(event){
    let myElevation = event;
    console.log(myElevation)
    document.getElementById("myModal").innerHTML = "";

    //*Find matching mountain based on elevation
    let matching = mountainsArray.find(mountains => mountains.elevation == myElevation);
    console.log(matching);

    //*Create a modal for the matching mountain and insert into HTML
    if(matching){
        document.getElementById("myModal").innerHTML = `
        <div class="modal fade" id="a${matching.elevation}" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-center">
                                <img src="images/${matching.img}" class="img-fluid">
                            </div>
                            <h3 class="modal-title" id="modal-title">${matching.name}</h3>
                    </div>
                    <div class="modal-body">
                        <p><strong>${matching.desc}</strong></p>
                        <br>
                        <div class="d-flex justify-content-around">
                            <div>
                                <strong>Effort: </strong>${matching.effort}
                                <p><strong>Elevation: </strong>${matching.elevation}<br>
                            </div>
                            <div>
                                <strong>Latitude: </strong>${matching.coords.lat}<br>
                                <strong>Longitude: </strong>${matching.coords.lng}</p>
                            </div>    
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end me-5">
                        <button type="button" onclick="refresh()">Close</button>  
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

function refresh(){
    location.reload();
}