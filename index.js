const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('productName');
const products = data['products'];
let product = data['products'][productName];
const productCount = Object.keys(products).length;
if(!product){
    product = products["amogh"];
}
const images = product["images"];
const imageCount = images.length;

let element = document.getElementById("dropdown-links");
for (let prod in products) {
    let link = document.createElement("a");
    link.setAttribute("class", "dropdown-item");
    link.setAttribute("style", "color:white");
    let href = "#";
    let item_name = products[prod]["name"];
    if (!(productName === item_name.toLowerCase())) {
        href = "./product.html?productName=" + item_name.toLowerCase();
    }
    link.setAttribute("href", href);
    let textNode = document.createTextNode(item_name);
    link.appendChild(textNode);
    element.appendChild(link);
}

element = document.getElementById("name");
textNode = document.createTextNode(product["name"]);
if(element)
    element.appendChild(textNode);

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


element = document.getElementById("description");
textNode = document.createTextNode(product["description"]);
if(element)
    element.appendChild(textNode);

element = document.getElementById("detail");
textNode = document.createTextNode(product["detail"]);
if(element)
    element.appendChild(textNode);

element = document.getElementById("features");
for (let i = 0; i < product["features"].length; i++) {
    let li = document.createElement("li");
    textNode = document.createTextNode(product["features"][i]);
    li.appendChild(textNode);
    if(element)
        element.appendChild(li);
}

var active = false;
function onToggle() {
    debugger;
    if (!active) {
        s = document.getElementById("bottom-div").style
        s += " min-height:60vh"
    }
}

function search(){
    let myInput = document.getElementById("myInput");
    let text = myInput.value;
    let found = false;
    for(prod in products){
        if(prod.toLowerCase() === text.toLowerCase()){
            found = true;
            break;
        }
    }
    if(found){
        console.log(location);
        let host = window.location.host;
        let protocol = window.location.protocol;
        let loc = protocol + "//" + host + "/product.html?productName=" + text.toLowerCase();
        window.location=loc;
    }
}

var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchbtn").click();
  }
});

var index = 1;
if(window.location.pathname == "/"){
    $('.carousel').carousel({
        interval: 2000
    })
    setTitle(Object.keys(products)[0]);
    $('#demo').on('slide.bs.carousel', function () {
        let k = 0;
        let prodName = "";
        for(prod in products){
            if(k==index)
                prodName = prod;
            k++;
        }
        //console.log(prodName);
        setTitle(prodName);
        index++;
        if(index == productCount){
            index = 0;
        }
    })
    let carousel_indicators = document.getElementById("carousel-indicators");
    let count = 0;
    for(prod in products){
        let indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#demo");
        indicator.setAttribute("data-slide-to", count);
        if(count == 0){
            indicator.setAttribute("class", "active");
        }
        count++;
        carousel_indicators.appendChild(indicator);
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
    textNode = document.createTextNode(products[prodName]["description"]);
    description.appendChild(textNode);
    ele.appendChild(h3Name);
    ele.appendChild(description);
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            var startIndex = arr[i].toUpperCase().indexOf(val.toUpperCase());
            if (startIndex > -1) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].substr(0, startIndex);
                b.innerHTML += "<strong>" + arr[i].substr(startIndex, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(startIndex+val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*An array containing all the country names in the world:*/
//var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
var dataArray = ["Phoenix", "Trinity", "Opal-I", "Opal-II", "Amogh"];
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), dataArray);

