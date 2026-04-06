let bc,static = 0;
function InputC() {
    const c = document.getElementById("tc").value;
    sessionStorage.setItem("c", c);
    document.getElementById("c").innerHTML = c;
    bc++;
}
function InputD() {
    const d = document.getElementById("td").value;
    sessionStorage.setItem("d", d);
    document.getElementById("d").innerHTML = d;
    bc++;
}
function InputAll() {
    InputC();
    InputD();
    const a = sessionStorage.getItem('a');
    document.getElementById("a").innerHTML = a;
    const b = sessionStorage.getItem('b');
    document.getElementById("b").innerHTML = b;
}
function LoadF() {
    let ta, tb, tc, td;
    ta = sessionStorage.GetItem("a");
    tb = sessionStorage.GetItem("b");
    tc = sessionStorage.GetItem("c");
    td = sessionStorage.GetItem("d");
    alert(ta + ", " + tb + ", " + tc + ", " + td);
    if(bc == 0) {
        sessionStorage.SetItem("a", 0);
        sessionStorage.SetItem("b", 0);
        sessionStorage.SetItem("c", 0);
        sessionStorage.SetItem("d", 0);
    }
    ta = sessionStorage.GetItem("a");
    document.getElementById("a").innerHTML = ta;
    tb = sessionStorage.GetItem("b");
    document.getElementById("b").innerHTML = tb;
    tc = sessionStorage.GetItem("c");
    document.getElementById("c").innerHTML = tc;
    td = sessionStorage.GetItem("d");
    document.getElementById("d").innerHTML = td;
}