function openTab(evt, tabName) {
    var i, x, tabLink;
    x = document.getElementsByClassName("mp-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tabLink = document.getElementsByClassName("tablink");
    for (i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" w3-red", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " w3-red";
}