let bc,static = 0;
function InputA() {
    const a = document.getElementById("ta").value;
    sessionStorage.setItem("a", a);
    document.getElementById("a").innerHTML = a;
    bc++;
}
function InputB() {
    const b = document.getElementById("tb").value;
    sessionStorage.setItem("b", b);
    document.getElementById("b").innerHTML = b;
    bc++;
}
function InputAll() {
    InputA();
    InputB();
    const c = sessionStorage.getItem('c');
    document.getElementById("c").innerHTML = c;
    const d = sessionStorage.getItem('d');
    document.getElementById("d").innerHTML = d;
}
function LoadF() {
    let ta, tb;
    if(bc == 0) {
        sessionStorage.SetItem("a", 0);
        sessionStorage.SetItem("b", 0);
    }
    ta = sessionStorage.GetItem("a");
    document.getElementById("a").innerHTML = ta;
    tb = sessionStorage.GetItem("b");
    document.getElementById("b").innerHTML = tb;
}