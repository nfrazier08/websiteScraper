$(document).ready(function() {

    $("#scrape").on("click", function(){          
        $.ajax({
            type: "GET",
            url: "/scrape", 
            success: console.log("You are hitting your ajax")
        })
     })
   


}) //End of document.ready
