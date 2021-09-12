document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("submit");
    const txtField = document.getElementById("websites");
    btn.addEventListener("click", () => {
        alert(txtField.value)
        txtField.value = "";
    }, false);
}, false);