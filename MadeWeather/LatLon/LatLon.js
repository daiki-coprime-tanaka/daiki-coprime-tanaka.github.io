let obj, one;

let resultData = [];

document
    .getElementById("candidate")
    .addEventListener("change", function () {

        const idx = Number(this.value);

        showPlace(idx);
    });

function exe() {
    const chimei = document.getElementById('place').value;
    const trimmed = chimei.trim();
    if(trimmed === "") {
        return;
    }
    const url = "https://msearch.gsi.go.jp/address-search/AddressSearch?q=" + encodeURIComponent(trimmed);
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            //alert(data.length);
            if(data.length > 0) {
                obj = data;
                one = obj[0];
            }
            resultData = data;
            const select = document.getElementById("candidate");
            select.innerHTML = "";
            data.forEach((item, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = item.properties.title;
                select.appendChild(option);
            });
            showPlace(0);
            /*const cods = one.geometry.coordinates;
            const Lat = cods[1], Lon = cods[0];
            const gc = one.properties.title;
            Disp(Lat, Lon, gc);*/
        })
    .catch(err => console.error("エラー:", err));
}

function Disp(lat, lon, address) {
    document.getElementById('latitude').innerHTML = lat;
    document.getElementById('longitude').innerHTML = lon;
    document.getElementById('address').innerHTML = address;
}

function showPlace(idx) {
    const one = resultData[idx];
    const lon = one.geometry.coordinates[0];
    const lat = one.geometry.coordinates[1];
    const address = one.properties.title;
    Disp(lat, lon, address);
}