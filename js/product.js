/*Depends on nav.js*/
element = document.getElementById("name");
textNode = document.createTextNode(product["name"]);
if(element)
    element.appendChild(textNode);

element = document.getElementById("title-description");
textNode = document.createTextNode(product["title-description"]);
if(element)
    element.appendChild(textNode);

setImages();

element = document.getElementById("description");
textNode = document.createTextNode(product["description"]);
if(element)
    element.appendChild(textNode);

element = document.getElementById("detail");
//textNode = document.createTextNode(product["detail"]);
if(element)
    //element.appendChild(textNode);
    element.innerHTML = product["detail"];

element = document.getElementById("features");
for (let i = 0; i < product["features"].length; i++) {
    let li = document.createElement("li");
    //textNode = document.createTextNode(product["features"][i]);
    //li.appendChild(textNode);
    li.innerHTML = product["features"][i];
    if(element)
        element.appendChild(li);
}

function setImages(){
    if (imageCount > 1) {
        element = document.getElementById("slide-show-indicators");
        for (let i = 0; i < imageCount; i++) {
            let li = document.createElement("li");
            li.setAttribute("data-target", "#slide-show");
            li.setAttribute("data-slide-to", i);
            if (i == 0)
                li.setAttribute("class", "active");
            if(element)
                element.appendChild(li);
        }
    
        element = document.getElementById("slide-show-images");
        for (let i = 0; i < imageCount; i++) {
            let item = document.createElement("div");
            item.setAttribute("class", "carousel-inner");
            let image = document.createElement("img");
            image.setAttribute("src", images[i]);
            image.setAttribute("alt", product["name"]);
            image.setAttribute("width", "100%");
            image.setAttribute("height", "210");
            if (i == 0) {
                item.setAttribute("class", "carousel-item active");
            } else {
                item.setAttribute("class", "carousel-item");
            }
            item.appendChild(image);
            if(element)
                element.appendChild(item);
        }
    } else if (imageCount == 1) {
        element = document.getElementById("slide-show-indicators");
        element.remove();
        element = document.getElementById("slide-show-images");
        element.remove();
        element = document.getElementById("slide-show");
        let image = document.createElement("img");
        image.setAttribute("src", images[0]);
        image.setAttribute("alt", product["name"]);
        image.setAttribute("width", "100%");
        image.setAttribute("height", "210");
        if(element)
            element.appendChild(image);
    }
    
}

$('.carousel').carousel({
    interval: 3000
})