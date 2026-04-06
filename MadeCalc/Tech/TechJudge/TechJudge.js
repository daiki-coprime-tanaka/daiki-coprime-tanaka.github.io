let GCnt = 0;
let tf = "";
function addOne() {
    GCnt += 1;
}

function isCorrectEO(mode) {
    if(GCnt % 2 == mode) {
        // alert("Correct!");
        tf = "T";
    } else {
        // alert("Wrong...");
        tf = "F";
    }
    addOne();
    document.getElementById("tf").innerHTML = tf;
    return 0;
}

function exeEven() {
    // alert("Hello.");
    isCorrectEO(0);
    // alert("GC = " + GCnt);
    // let x = document.getElementById("text1").value;
    // document.getElementById("x").innerHTML = x;
    // document.getElementById("text1").value = "";
}

function exeOdd() {
    // alert("Good Night.");
    isCorrectEO(1);
    // alert("GC = " + GCnt);
    // let x = document.getElementById("text1").value;
    // document.getElementById("x").innerHTML = x;
    // document.getElementById("text1").value = "";
}

function exeReset() {
    GCnt = 0;
    tf = "";
    document.getElementById("tf").innerHTML = tf;
}