function Start() {
    const qty = document.getElementById("qty").value;
    const dif = document.getElementById("dif").value;
    if(qty <= 0) {
        alert("問題数は1以上の整数を入力してください");
        sessionStorage.setItem('qty', "10");
    } else {
        sessionStorage.setItem('qty', qty);
    }
    if(dif <= 0) {
        alert("難易度は1以上の整数を入力してください");
        sessionStorage.setItem('dif', "10");
    } else {
        sessionStorage.setItem('dif', dif);
    }
}
