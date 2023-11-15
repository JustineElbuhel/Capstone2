"use strict"

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


//Initialize radio buttons to display dropdowns
function init(){
    //*Location radio
    const locationRadio = document.getElementById("locationRadio");
    locationRadio.onclick = displayDropdown;

    //*Park type radio
    const parkTypeRadio = document.getElementById("parkTypeRadio");
    parkTypeRadio.onclick = displayDropdown;

    //*Location AND parky type radios
    const bothRadio = document.getElementById("bothRadio");
    bothRadio.onclick = displayDropdown;
}

//Show || Hide dropdowns
function displayDropdown(){

    //!LOCATION DROPDOWN
    if(locationRadio.checked){
        //*Create a dropdown element
        document.getElementById("dropdownDiv").innerHTML = `
        <form id="locationSearchForm">
            <select id="searchByLocationDropdown" class="form-select form-selectsm mb-3">
                <option>Select state</option>
            </select>
            <div class="d-flex justify-content-end pb-2">
                <button type="submit" id="searchByLocationBtn" class="btn btn-custom">Search</button>
            </div>
        </form>`;

        //*Loop through the locationArray to create dropdown options for each
        const locationDropdown = document.getElementById("searchByLocationDropdown");
        for(let index = 0; index < locationsArray.length; index++){
            const locationOptions = new Option(locationsArray[index], locationsArray[index]);
            locationDropdown.appendChild(locationOptions);
        }

        //*Call displayPark function
        const locationSearchBtn = document.getElementById("locationSearchForm");
        locationSearchBtn.addEventListener("submit", displayParks)
    }

    //!PARK TYPE DROPDOWN
    else if(parkTypeRadio.checked){
        //*Create dropdown element
        document.getElementById("dropdownDiv").innerHTML =`
        <form id="parkTypeSearchForm">
            <select id="searchByParkTypeDropdown" class="form-select form-selectsm mb-3">
                <option>Select park type</option>
            </select>
            <div class="d-flex justify-content-end pb-2">
                <button type="submit" id="searchByParkTypeBtn" class="w-50">Search</button>
            </div>
        </form>`;

        //*Loop through the parkTypesArray to create dropdown options for each
        const parkTypeDropdown = document.getElementById("searchByParkTypeDropdown");
        for(let index = 0; index < parkTypesArray.length; index++){
            const parkTypeOptions = new Option(parkTypesArray[index], parkTypesArray[index]);
            parkTypeDropdown.appendChild(parkTypeOptions);
        }

        //*Call displayParks function
        const parkTypeSearchBtn = document.getElementById("parkTypeSearchForm");
        parkTypeSearchBtn.addEventListener("submit", displayParks);
    }

    //!LOCATION AND PARK TYPE DROPDOWNS
    else if(bothRadio.checked){
        document.getElementById("dropdownDiv").innerHTML = `
        <form id="SearchForm">
            <div class="d-flex justify-content-between flex-column">
                <select id="searchByLocationDropdown" class="form-select form-selectsm mb-3 me-3">
                <option>Select state</option>
                </select>
                <select id="searchByParkTypeDropdown" class="form-select form-selectsm mb-3"select>
                    <option>Select park type</option>
                </select>
                <div class="d-flex justify-content-end pb-2">
                    <button type="submit" id="bothBtn">Search</button>
                </div>
        </form>`;

        //*Loop through the locationArray to create dropdown options for each
        const locationDropdown = document.getElementById("searchByLocationDropdown");
        for(let index = 0; index < locationsArray.length; index++){
            const locationOptions = new Option(locationsArray[index], locationsArray[index]);
            locationDropdown.appendChild(locationOptions);
        }

        //*Loop through the parkTypesArray to create dropdown options for each
        const parkTypeDropdown = document.getElementById("searchByParkTypeDropdown"); //Location of dropdown
        for(let index = 0; index < parkTypesArray.length; index++){
            const parkTypeOptions = new Option(parkTypesArray[index], parkTypesArray[index]);
            parkTypeDropdown.appendChild(parkTypeOptions);
        }



        //*Call displayParks function
        const bothBtn = document.getElementById("SearchForm");
        bothBtn.addEventListener("submit", displayParks);
    }
    
    //!NO SELECTION ON RADIO BUTTONS
    else{
        document.getElementById("dropdownDiv").innerHTML = "";
    }
}


//Display parks on user state selection function
function displayParks(event){
    event.preventDefault();
    //*If else if statement to utilize the proper dropdown
    let matching = null;

    //*Location selection
    if(locationRadio.checked){
    const locations = document.getElementById("searchByLocationDropdown");
    const selectedLocationValue = locations.value;
    matching = nationalParksArray.filter(location => location.State == selectedLocationValue);
    }

    //*Park type selection
    else if(parkTypeRadio.checked){
    const parkType = document.getElementById("searchByParkTypeDropdown");
    const selectedParkTypeValue = parkType.value;
    matching = nationalParksArray.filter(parks => parks.LocationName.includes(selectedParkTypeValue));
    }

    //*Location and park type selection
    else if(bothRadio.checked){
        const locations = document.getElementById("searchByLocationDropdown");
        const selectedLocationValue = locations.value;
        const parkType = document.getElementById("searchByParkTypeDropdown");
        const selectedParkTypeValue = parkType.value;
        matching = nationalParksArray.filter(both => both.State == selectedLocationValue && both.LocationName.includes(selectedParkTypeValue));
    }


    //*Run a for loop to go through the array of matching states to display them
    let displayParkInfo = ""; 
    if(matching.length > 0){
        for(let index = 0; index < matching.length; index++){
            //*Extract park information
            const name = matching[index].LocationName;
            const city = matching[index].City;
            const state = matching[index].State;
            const code = matching[index].LocationID;

            //*Extract phone number if available
            let phone = null;
            if(matching[index].Phone == 0){
                phone = "N/A";
            }
            else if(matching[index].Phone.includes("(")){
                phone = matching[index].Phone;
            }
            else {
                phone = "N/A"
            }

            //*Extract fax numver if available
            let fax = null;
            if (matching[index].Fax == 0){
                fax = "N/A"
            }
            else {
                fax = matching[index].Fax;
            }

            //*Extract park website if available
            let parkWebsite = null;
            if(matching[index].Visit){
                parkWebsite = `<button class="d-flex justify-content-center" onclick="window.open('${matching[index].Visit}')">Learn more</button>`;
            }
            else{
                parkWebsite = "<br>";
            }

            
            //*declare a variable with HTML with the each park info
            displayParkInfo +=`
            <div class="card my-3" style="width: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">${name}</h5>
                        <div class="d-flex  flex-row justify-content-between mt-1"> 
                            <div>
                                <p class="card-subtitle mb-2 text-muted fs-large">${city}, ${state}</p>
                            </div>
                            <div>
                                <p class="card-subtitle mb-2 text-muted fs-large"><strong>(${code})</strong></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="card-text"><strong>Contact</strong><br>Phone: ${phone}<br> Fax: ${fax}</p>
                        <div class="d-flex justify-content-center">
                            ${parkWebsite}
                        </div>
                    </div>
                </div>
            </div>`;
        }
        document.getElementById("displayParks").innerHTML = displayParkInfo;
    }

    //*No parks found display 
    else {
        displayParkInfo = `
        <div class="card my-3" style="width: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div class="d-flex justify-content-center">
                        <h3 class="card-title">No parks found</h3>
                    </div>
                </div>
            </div>`;

        document.getElementById("displayParks").innerHTML = displayParkInfo;
    }    
}