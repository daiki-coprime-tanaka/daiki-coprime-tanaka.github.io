const input = document.getElementById("ans");
let sans = 0;
let QueOrd = 1;
let CorrectCnt = 0;
let qty, dif;

function LoadF() {
    QueOrd = 1;
    CorrectCnt = 0;
    qty = sessionStorage.getItem('qty');
    document.getElementById("qty").innerHTML = qty;
    // alert("qty = " + qty);
    dif = sessionStorage.getItem('dif');
    document.getElementById("dif").innerHTML = dif;
    // alert("dif = " + dif);
    next();
}

function test() {
    // alert("XXX");
    let ians = document.getElementById("ans").value;
    // alert("ans = " + ians + ", sans = " + sans);
    if(ians == sans) {
        correct();
    } else {
        wrong();
    }
}

function correct() {
    CorrectCnt++;
    if(QueOrd == qty) {
        alert("You answered " + qty + " questions and " + CorrectCnt + " was correct");
    } else {
        QueOrd++;
        next();
    }
}

function wrong() {
    alert("The correct answer was " + sans + ".");
    if(QueOrd == qty) {
        alert("You answered " + qty + " questions and " + CorrectCnt + " was correct");
    } else {
        QueOrd++;
        next();
    }
}

function next() {
    document.getElementById("ans").value = "";
    let ta = Math.floor(Math.random() * dif + 1);
    let tb = Math.floor(Math.random() * dif + 1);
    let op = "";
    let help = ["", "", "", "\"/\"は商を計算する演算です。", "\"%\"は余りを計算する演算です。"]
    switch((QueOrd - 1) % 5) {
        case 0:
            op = "+";
            document.getElementById("a").innerHTML = ta;
            document.getElementById("b").innerHTML = tb;
            sans = ta + tb;
            break;
        case 1:
            op = "-";
            document.getElementById("a").innerHTML = ta;
            document.getElementById("b").innerHTML = tb;
            sans = ta - tb;
            break;
        case 2:
            op = "×";
            document.getElementById("a").innerHTML = ta;
            document.getElementById("b").innerHTML = tb;
            sans = ta * tb;
            break;
        case 3:
            op = "/";
            sans = ta;
            document.getElementById("a").innerHTML = ta * tb;
            document.getElementById("b").innerHTML = tb;
            break;
        case 4:
            op = "%";
            document.getElementById("a").innerHTML = ta;
            document.getElementById("b").innerHTML = tb;
            sans = ta % tb;
            break;
    }
    document.getElementById("op").innerHTML = op;
    document.getElementById("no").innerHTML = QueOrd;
    document.getElementById("help").innerHTML = help[(QueOrd - 1) % 5];
}