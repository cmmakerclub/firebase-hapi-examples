
$( document ).ready(function(){
    // Sets up click behavior on all button elements with the alert class
    // that exist in the DOM when the instruction was executed

    //set id(switch) = id(box) in HTML page
    $( ".btn.switch" ).on( "click", function() {
        var switch_ = $(this)[0].id;
        console.log(switch_);
        var switch_fn = "#" + switch_;
        console.log(switch_fn);
        $(switch_fn).toggleClass("box_active");
    });


});
