const marksDiv = document.getElementById("marks");
var urlList = localStorage.getItem("marks");

if (urlList == null){
    urlList = [];
    alert("Welcome! Write your URLs in" +
    " textbox below and click save. " +
    "\n\nLeft-Click to open URLs and Right-Click to Delete URLs!\n" +
    "\nEnjoy!");
}
else {
    urlList = JSON.parse(urlList);
    for (var i=0;i<urlList.length;i++){
        addMark(urlList[i]);
    }
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function positionDiv(div, WIDTH){
    var size = WIDTH - div.clientWidth / 2;
    div.setAttribute("style", `left: ${size}px;`)}

positionDiv(
    document.getElementById("main"),
    window.innerWidth / 2);
positionDiv(
    marksDiv,
    window.innerWidth / 2);

window.addEventListener("resize", ()=>{
    positionDiv(
        document.getElementById("main"),
        window.innerWidth / 2);
    positionDiv(
        marksDiv,
        window.innerWidth / 2);});

function deleteMark(id){
    document.getElementById(id).outerHTML = "";
    for (var i=0;i<urlList.length;i++){
        if (id == urlList[i]){urlList.remove(i)}}
    localStorage.setItem("marks", JSON.stringify(urlList));
}

function addMark(url){

    var newURL = document.createElement("button");
    newURL.setAttribute("class", "bookmarks");
    newURL.setAttribute("title", url);

    if (url.length >= 88){
        url = url.substr(0, 88);
        url += "..."; 
    }

    newURL.innerHTML = url;
    var id = url.toString();

    newURL.addEventListener('contextmenu', (ev)=>{
        ev.preventDefault();
        deleteMark(id)
        return false;
    }, false);

    newURL.setAttribute("onclick", 
    `window.open("${url}")`
    )

    var container = document.createElement("div");
    container.id = id;
    container.appendChild(newURL);
    marksDiv.appendChild(container);
}

function save(){
    var input = $("#url").val();
    input = encodeURIComponent(input);

    if (
        input.includes("http://") == true
        ||
        input.includes("https://") == true
    ){
        addMark(input);
        urlList.push(input);
    } else {
        input = "http://" + input;
        addMark(input);
        urlList.push(input);
    }

    localStorage.setItem("marks", JSON.stringify(urlList));
}