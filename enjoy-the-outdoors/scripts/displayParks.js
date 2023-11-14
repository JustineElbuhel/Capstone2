"use strict"

window.onload = init;

//Initialize radio buttons to display dropdowns
function init(){
    const locationRadio = document.getElementById("locationRadio");
    locationRadio.onclick = displayDropdown;

    const parkTypeRadio = document.getElementById("parkTypeRadio");
    parkTypeRadio.onclick = displayDropdown;
}

//Show || Hide dropdowns
function displayDropdown(){

    //!LOCATION DROPDOWN
    if(locationRadio.checked){
        //*Create a dropdown element
        document.getElementById("dropdownDiv").innerHTML = `
        <form id="locationSearchForm">
            <div class="d-flex justify-content-evenly">
                <select id="searchByLocationDropdown" class="form-select form-select-lg mb-3"></select>
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
            <select id="searchByParkTypeDropdown" class="w-50"></select>
            <button type="submit" id="searchByParkTypeBtn">Search</button>
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


    //*Run a for loop to go through the array of matching states to display them
    let displayParkInfo = ""; 
    for(let index = 0; index < matching.length; index++){
        //*Extract park information
        const name = matching[index].LocationName;
        const city = matching[index].City;
        const state = matching[index].State;

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
            parkWebsite = `<button class="d-flex justify-content-center"><a href="${matching[index].Visit}" target="_blank">More Info</a></button>`;
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
                </div>
                <br>
                <div>
                    <h6 class="card-subtitle mb-2 text-muted">${city}, ${state}</h6>
                    <p class="card-text"><strong>Contact</strong><br>Phone: ${phone}<br>Fax: ${fax}</p>
                    ${parkWebsite}
                </div>
            </div>
        </div>`;
    }
    document.getElementById("displayParks").innerHTML = displayParkInfo;
}