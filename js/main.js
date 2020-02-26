let inputwords = document.querySelector('span');
suggsynonyms = new URL("https://techi.envivent.com/synonym.json");

//***Pop Up */
let setUpPopUp = function (el) {
    let popupDiv = $('.synonympopup');
        //popupElements = $(el).find('span');
    console.dir(popupDiv);
    console.dir(el);

    //***Defines the func that makes the pop up visible and position at mouse*/
    let displaysynonympopup = function(span) {
        let popup = $(span).data("syn");
        popupDiv.html(popup);
        let enoughRoom = $(span).position().top > $(popupDiv).outerHeight() - 6;
        console.dir(enoughRoom);
        console.dir(span.parentElement);

        if (enoughRoom) {
            popupDiv.css('top', $(span).position().top - $(popupDiv).outerHeight() - 6);
        } else {
            popupDiv.css('top', $(span).position().top + $(span).outerHeight());
        };

        popupDiv.css('left', $(span).position().left - 10 + "px");
        popupDiv.toggleClass('active');
    };

    displaysynonympopup(el, this);

    // popupElements.each(function () {
    //     $(this).on('mouseenter', function(e) {
    //     ///*Call to display the popup*/
    //     displaysynonympopup(e, this);
    //     });
    // });
};

///**Defines function that splits the elements into spans */
function splitIntoSpans(elements) {
    for (let i = 0; i < elements.length; i++) {
        let arr = $(elements[i]).text().split(' ');
        let buffer = "";
        
        for (let j = 0; j < arr.length; j++) {
            buffer = buffer + "<span>";
            buffer = buffer + arr[j];
            buffer = buffer + "</span> ";
        }
        
        $(elements[i]).html(buffer.trim());
    };
};

///********************THIS HAPPENS FIRST******************/
//***Gets synonnyms and returns a promise
fetch(suggsynonyms)

//***Changes response into JSON */
.then(response => response.json())

//***Gets the suggsynonyms array from API */
.then(suggsynonyms => {
    console.dir(suggsynonyms)
        ///*Call to split on mouse enter*/
        // $('h1, li, p').one('mouseenter', function() {
        // });    
        let elements = $('h1, li, p');
        console.dir(elements);
        splitIntoSpans(elements); 

        ////////*************Replaces the data value for each span on mouse enter */
        $('body').on("mouseenter", 'span', function (){
            $(this).data('syn', suggsynonyms[$(this).text()].synonyms.join(', '));
            console.log($(this).data("syn"));
            ///*Call to Set up the popup*/
            //setUpPopUp($(this).parent());
            setUpPopUp(this);
        });
})

/***Catch errors */
.catch(err => {
    console.log(err);
});