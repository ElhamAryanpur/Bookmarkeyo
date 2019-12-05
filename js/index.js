const marksDiv = document.getElementById("marks");
var urlList = [];

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

function addMark(url){

    var newURL = document.createElement("button");
    newURL.setAttribute("class", "bookmarks");
    newURL.setAttribute("title", url);

    if (url.length >= 88){
        url = url.substr(0, 88);
        url += "..."; 
    }

    newURL.innerHTML = url;

    marksDiv.appendChild(newURL);
    marksDiv.appendChild(document.createElement("br"));
}

function save(){
    var input = $("#url").val();
    
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
}