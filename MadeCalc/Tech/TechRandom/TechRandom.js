let qtyDice = 0;

function madeSleep(n) {
    return new Promise(resolve => setTimeout(resolve, n));
}

function regDice() {
    qtyDice = document.getElementById("qtyDice").value;
    rollDice();
}
async function rollDice() {
    let sum = 0;
    let res = "";
    let qtys = [0, 0, 0, 0, 0, 0];
    for(let roop = 0; roop < qtyDice; roop++) {
        let temp = Math.floor(Math.random() * 6 + 1)
        sum += temp;
        qtys[temp - 1]++;
        if(roop == 0) {
            res += temp;
        } else {
            res += (", " + temp);
        }
        document.getElementById("res").innerHTML = res;
        document.getElementById("sum").innerHTML = sum;
        document.getElementById("qtys").innerHTML = qtys[0] + ", " + qtys[1] + ", " + qtys[2] + ", " + qtys[3] + ", " + qtys[4] + ", " + qtys[5];
        await madeSleep(500);
    }
}