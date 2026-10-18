function init() {
    // alert("loaded");
    weather();
}

// 天気
function getLatestIndex(data) {
    const times = data.hourly.time;
    let minDiff = Infinity;
    const now = new Date();
    let closestIndex = 0;
    for(let roop = 0; roop < times.length; roop++) {
        const t = new Date(times[roop]);
        const diff = now - t;

        if (diff < minDiff && diff > 0) {
            minDiff = diff;
            closestIndex = roop;
        }
    }
    return closestIndex;
}

function Id2Ja(code) {
    const table = {
        0: "快晴",
        1: "晴れ",
        2: "晴れ時々くもり",
        3: "くもり",
        45: "霧",
        48: "霧氷を伴う霧",
        51: "弱い霧雨",
        53: "霧雨",
        55: "強い霧雨",
        56: "弱い着氷性の霧雨",
        57: "強い着氷性の霧雨",
        61: "弱い雨",
        63: "雨",
        65: "強い雨",
        66: "弱い着氷性の雨",
        67: "強い着氷性の雨",
        71: "弱い雪",
        73: "雪",
        75: "強い雪",
        77: "細かい雪",
        80: "弱いにわか雨",
        81: "にわか雨",
        82: "激しいにわか雨",
        85: "弱いにわか雪",
        86: "強いにわか雪"
    };
    return table[code] ?? "不明";
}

function ISO2JapCLK(iso) {
    const clk = new Date(iso);
    // clk.setHours(clk.getHours() + 9);
    const year = clk.getFullYear();
    const month = clk.getMonth() + 1;
    const day = clk.getDate();
    const hour = clk.getHours();
    const minute = clk.getMinutes();
    return `${year}年${month}月${day}日 ${hour}時${minute}分`;
}

function weather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=35.01&longitude=135.75&current_weather=true&hourly=relativehumidity_2m,temperature_2m,weathercode&timezone=auto";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // alert(data.current_weather.temperature);
            const last_idx = getLatestIndex(data);
            // alert(data.hourly.temperature_2m[last_idx]);
            document.getElementById('temp').innerHTML = data.hourly.temperature_2m[last_idx] + ' ' + data.hourly_units.temperature_2m;
            // alert(data.hourly.relativehumidity_2m[last_idx]);
            document.getElementById('humid').innerHTML = data.hourly.relativehumidity_2m[last_idx] + ' ' + data.hourly_units.relativehumidity_2m;
            // alert(data.hourly.time[last_idx]);
            // alert(ISO2JapCLK(data.hourly.time[last_idx]));
            document.getElementById('weatTime').innerHTML = ISO2JapCLK(data.hourly.time[last_idx]);
            // alert(data.hourly.weathercode[last_idx]);
            // alert(Id2Ja(data.hourly.weathercode[last_idx]));
            document.getElementById('weather').innerHTML = Id2Ja(data.hourly.weathercode[last_idx]);
            document.getElementById('weatID').innerHTML = data.hourly.weathercode[last_idx];
        // 例: data.hourly.temperature_2m に気温が入っている
    })
    .catch(err => console.error("エラー:", err));
}