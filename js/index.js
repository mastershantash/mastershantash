var index = 1;
if(window.location.pathname == "/" || window.location.pathname == "/index4.html"){
    $('.carousel').carousel({
        interval: 2000
    })
    setTitle(Object.keys(products)[0]);
    let carousel_indicators = document.getElementsByClassName("carousel-indicators");
    let count = 0;
    for(prod in products){
        let indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#demo");
        indicator.setAttribute("data-slide-to", count);
        if(count == 0){
            indicator.setAttribute("class", "active");
        }
        count++;
        carousel_indicators[0].appendChild(indicator);
        //carousel_indicators[1].appendChild(indicator);
        //carousel_indicators.appendChild(indicator);
    }
    
    let carousel_inner = document.getElementById("carousel-inner");
    count = 0;
    for(prod in products){
        let carousel_item = document.createElement("div");
        if(count == 0)
            carousel_item.setAttribute("class", "carousel-item active");
        else
            carousel_item.setAttribute("class", "carousel-item");
        let image = document.createElement("img");
        image.setAttribute("src", products[prod].images[0]);
        image.setAttribute("alt", products[prod].name);
        image.setAttribute("width", "100%");
        image.setAttribute("height", "100%");
        //let caption = document.createElement("div");
        //caption.setAttribute("class", "carousel-caption");
        //if(prod != "amogh" && prod != "opal-i")
        //    caption.setAttribute("style", "color:black;")
        //let name = document.createElement("h3");
        //let name_text = document.createTextNode(products[prod]["name"]);
        //let description = document.createElement("strong");
        //let description_text = document.createTextNode(products[prod]["description"]);
        //description.appendChild(description_text);
        //name.appendChild(name_text);
        //caption.appendChild(name);
        //caption.appendChild(description);
        carousel_item.appendChild(image);
        //carousel_item.appendChild(caption);
        //document.getElementById("name").appendChild(caption);
        carousel_inner.appendChild(carousel_item);
        count++;
    }
}



function setTitle(prodName) {
    let ele = document.getElementById("title");
    if (ele.lastElementChild)
        ele.lastElementChild.remove();

    if (ele.lastElementChild)
        ele.lastElementChild.remove();


    let h3Name = document.createElement("h3");
    let textNode = document.createTextNode(products[prodName]["name"]);
    h3Name.appendChild(textNode);
    let description = document.createElement("strong");
    textNode = document.createTextNode(products[prodName]["title-description"]);
    description.appendChild(textNode);
    ele.appendChild(h3Name);
    ele.appendChild(description);
}

$(document).ready(function(){
    $('#demo').on('slide.bs.carousel', function () {
        let k = 0;
        let prodName = "";
        for(prod in products){
            if(k==index)
                prodName = prod;
            k++;
        }
        console.log(prodName);
        setTitle(prodName);
        index++;
        if(index == productCount){
            index = 0;
        }
    })
})