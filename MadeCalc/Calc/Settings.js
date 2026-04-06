function Start() {
    const qty = document.getElementById("qty").value;
    const dif = document.getElementById("dif").value;
    sessionStorage.setItem('qty', qty);
    sessionStorage.setItem('dif', dif);
}