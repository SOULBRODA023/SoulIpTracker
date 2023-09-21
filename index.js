const submitButton = document.querySelector(".submit");
let map = null;
async function fetchApiData() {
    const input = document.querySelector(".Ipsearch").value; 
    const ipAddress = document.querySelector(".IP");
    const location = document.querySelector(".location");
    const time = document.querySelector(".time");
    const internetService = document.querySelector(".internet")
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_t48oFPchY61s9U44USeApljX1kM6t&ipAddress=${input}`;
    
    try {
        const ipApi = await fetch(apiUrl);
        if (ipApi.ok) {
            const data = await ipApi.json();
            console.log(data);
            console.log(input);
            ipAddress.textContent = data.ip;
            location.textContent = `${data.location.country}, ${data.location.region}`;
            time.textContent = `${ data.location.timezone}`;
            internetService.textContent = data.isp;
    
            if (map) {
                map.remove();
            }

            // Create a new map using Leaflet and display it in the 'map' div
            map = L.map('map').setView([data.location.lat, data.location.lng], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // Add a marker for the location
            L.marker([data.location.lat, data.location.lng]).addTo(map);
    
        } else {
            console.error("Error fetching data from the API");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

submitButton.addEventListener("click", fetchApiData);
