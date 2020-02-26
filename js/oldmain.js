let inputwords = document.querySelector('span');
    suggsynonyms = new URL("" + inputwords);

//***Gets synonnyms and returns a promise
fetch(suggsynonyms, })

    //***Changes response into JSON */
    .then(response => response.json())

    //***Gets the suggsynonyms array from API */
    .then(suggsynonyms => {
        console.dir(suggsynonyms)
        $('span').on("mouseenter", function (){
            setTimeout(function() {
                inputwords.dataset.syn = suggsynonyms.results[0].synonyms;
                console.log(inputwords.dataset.syn);
                console.log(suggsynonyms.results[0].synonyms);
            }, 500);
        });
        $('.words').on("mouseleave", function (){
            clearTimeout();
        });
    }) 

    /***Catch errors */
    .catch(err => {
        console.log(err);
    });

//***Pop Up with mouseover */
let setUpPopUp = function () {
    let synonympopup = "",
        synonympopupdiv = document.querySelector(".synonympopup"),
        synonymElements = Array.from(document.querySelectorAll(".words"));

    //***Defines the func that changes the css style of the popup to make it visible and position at mouse*/
    let displaysynonympopup = function(e, obj) {
        synonympopup = obj.dataset.syn;
        synonympopupdiv.innerHTML = synonympopup;
        synonympopupdiv.style.top = e.pageY + "px";
        synonympopupdiv.style.left = e.pageX + "px";
        synonympopupdiv.style.opacity = 1;
    };

    //***Makes pop up display on Event*/
    synonymElements.forEach(function(el) {
        $(el).on("mouseenter", function (e) {
            let that = this;
            setTimeout(function() {
                displaysynonympopup(e, that);
            }, 700);
        });
        $(el).on("mouseleave", function () {
            setTimeout(function() {
                synonympopupdiv.style.opacity = 0;
            }, 700);
        });
    });
};

setUpPopUp();

///**Splits the elements into spans */
function splitIntoSpans(el) {
    let arr = $(el).text().split(' ');
    let buffer = "";
    
    for (let i = 0; i < arr.length; i++) {
      buffer = buffer + "<span>";
      buffer = buffer + arr[i];
      buffer = buffer + "</span> ";
    }
    
    // console.log("<span>" + arr.join("</span> <span>") + "</span>");
  
    $(el).html(buffer.trim());
  }
  
$('h1, li, p').on('mouseenter', (e) => {
    let tx = $(this).text("");

    splitIntoSpans(e);

});