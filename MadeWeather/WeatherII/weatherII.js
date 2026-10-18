const DAILY_SPLITS = 24;
const HOUR_DATA_QTYS = 3;
const DAILY_DATA_QTYS = 7;

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
/*
0	快晴
1	概ね晴れ
2	晴れ時々曇り
3	曇り
45	霧
48	着氷性の霧
51	弱い霧雨
53	霧雨
55	強い霧雨
56	弱い着氷性霧雨
57	強い着氷性霧雨
61	弱い雨
63	雨
65	強い雨
66	弱い着氷性雨
67	強い着氷性雨
71	弱い雪
73	雪
75	強い雪
77	細氷（Snow Grains）
80	弱いにわか雨
81	にわか雨
82	激しいにわか雨
85	弱いにわか雪
86	強いにわか雪
95	雷雨
96	雷雨（小さな雹を伴う）
99	雷雨（大きな雹を伴う）
*/
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
        86: "強いにわか雪",
        95:	"雷雨",
        96:	"雷雨（小さな雹を伴う）",
        99:	"雷雨（大きな雹を伴う）"
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

function ISO2JapDATE(iso) {
    const clk = new Date(iso);
    const year = clk.getFullYear();
    const month = clk.getMonth() + 1;
    const day = clk.getDate();
    return `${year}年${month}月${day}日`;
}

function ISO2JapTIME(iso) {
    const clk = new Date(iso);
    const hour = clk.getHours();
    const minute = clk.getMinutes();
    return `${hour}時${minute}分`;   
}

function CalcAvgHumid(array, did) {
    let avg = 0, sum = 0, from = did * DAILY_SPLITS, to = (did + 1) * DAILY_SPLITS;
    for(let roop = from; roop < to; roop++) {
        sum += array[roop];
    }
    avg = sum / DAILY_SPLITS;
    return avg;
}

function windDirectionToText(deg) {
    const directions = [
        "北", "北北東", "北東", "東北東",
        "東", "東南東", "南東", "南南東",
        "南", "南南西", "南西", "西南西",
        "西", "西北西", "北西", "北北西"
    ];

    return directions[Math.round(deg / 22.5) % 16];
}

function weather(latitude, longitude) {
    // https://api.open-meteo.com/v1/forecast?latitude=35.01&longitude=135.75&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,weather_code,precipitation_probability,surface_pressure,relative_humidity_2m&timezone=Asia%2FTokyo&forecast_days=3&wind_speed_unit=ms
    /*const url = "https://api.open-meteo.com/v1/forecast?latitude=" + encodeURIComponent(latitude) + "&longitude=" + encodeURIComponent(longitude) 
        + "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&" 
        + "hourly=temperature_2m,weather_code,precipitation_probability,surface_pressure,relative_humidity_2m&timezone=Asia%2FTokyo&forecast_days=3&wind_speed_unit=m";*/
    // const url = ``;
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current_weather=true&hourly=temperature_2m,apparent_temperature,weather_code,precipitation_probability,surface_pressure,relative_humidity_2m&timezone=Asia/Tokyo&forecast_days=3`.replace(/\s+/g, "");
    // 
    // alert(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById('weatTime').innerHTML = ISO2JapCLK(data.current_weather.time);
            const tos = ['todb', 'tomb', 'tdatb'];
            const ds = ['dtod', 'dtom', 'dtdat'];
            let curb = "<tr><th>天気</th><td>" + Id2Ja(data.current_weather.weathercode) + "</td></tr>";
            curb += "<tr><th>気温</th><td>" + data.current_weather.temperature.toFixed(1) + "℃</td></tr>";
            curb += "<tr><th>風速</th><td>" + (data.current_weather.windspeed).toFixed(1) + "km/h</td></tr>";
            curb += "<tr><th>風速</th><td>" + (data.current_weather.windspeed * 5 / 18).toFixed(2) + "m/s</td></tr>";
            curb += "<tr><th>風向</th><td>" + (data.current_weather.winddirection) + "°(" + windDirectionToText(data.current_weather.winddirection) + ")</td></tr>";

            document.getElementById('curb').innerHTML = curb;
            for(let roop = 0; roop < HOUR_DATA_QTYS; roop++) {
                // 今日のデータ
                let html = "<tr><th class=\"title\">時刻</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${iroop}</td>`;
                }
                html += "</tr>"

                html += "<tr><th class=\"title\">天気</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${Id2Ja(data.hourly.weather_code[iroop + roop * DAILY_SPLITS])}</td>`;
                }
                html += "</tr>";

                html += "<tr><th class=\"title\">気温</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${data.hourly.temperature_2m[iroop + roop * DAILY_SPLITS].toFixed(1)}℃</td>`;
                }
                html += "</tr>";

                html += "<tr><th class=\"title\">体感気温</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${data.hourly.apparent_temperature[iroop + roop * DAILY_SPLITS].toFixed(1)}℃</td>`;
                }
                html += "</tr>";

                html += "</tr><th class=\"title\">湿度</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${data.hourly.relative_humidity_2m[iroop + roop * DAILY_SPLITS].toFixed(0)}%</td>`;
                }
                html += "</tr>";

                // 降水確率
                html += "</tr><th class=\"title\">降水確率</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${data.hourly.precipitation_probability[iroop + roop * DAILY_SPLITS].toFixed(0)}%</td>`;
                }
                html += "</tr>";

                // 気圧
                html += "</tr><th class=\"title\">気圧</th>";
                for(let iroop = 0; iroop < DAILY_SPLITS; iroop++) {
                    html += `<td>${data.hourly.surface_pressure[iroop + roop * DAILY_SPLITS].toFixed(1)}hPa</td>`;
                }
                html += "</tr>";
                
                document.getElementById(tos[roop]).innerHTML = html;
                document.getElementById(ds[roop]).innerHTML = ISO2JapDATE(data.hourly.time[roop*DAILY_SPLITS]);
            }
        // 例: data.hourly.temperature_2m に気温が入っている
    })
    .catch(err => console.error("エラー:", err));

    url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&hourly=relative_humidity_2m&timezone=Asia/Tokyo&forecast_days=7`.replace(/\s+/g, "");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let wh = "<tr><th>日付</th><td>天気</td><td>湿度</td><td>降水確率</td><td>最高/最低気温</td><td>日の出</td><td>日の入り</td>";
            for(let roop = 0; roop < DAILY_DATA_QTYS; roop++) {
                // let wh = "<tr><th>日付</th><th>天気</th><th>降水確率</th><th>最高/最低気温</th><th>日の出</th><th>日の入り</th></tr>";
                wh += ("<tr><th>" + ISO2JapDATE(data.daily.time[roop]) + "</th>");
                // wh += ("<td>" + Id2Ja(data.daily.weather_code[roop]) + " (" + data.daily.weather_code[roop] + ") " + "</td>");
                wh += ("<td>" + Id2Ja(data.daily.weather_code[roop]) + "</td>");
                wh += ("<td>" + CalcAvgHumid(data.hourly.relative_humidity_2m, roop).toFixed(1) + "%</td>");
                wh += ("<td>" + data.daily.precipitation_probability_max[roop].toFixed(0) + "%</td>");
                wh += ("<td>" + data.daily.temperature_2m_max[roop].toFixed(1) + "℃/" + data.daily.temperature_2m_min[roop].toFixed(1) + "℃</td>");
                wh += ("<td>" + ISO2JapTIME(data.daily.sunrise[roop]) + "</td>");
                wh += ("<td>" + ISO2JapTIME(data.daily.sunset[roop]) + "</td></tr>");
            }
            document.getElementById('tweek').innerHTML = wh;
    })
    .catch(err => console.error('エラー:', err));
}