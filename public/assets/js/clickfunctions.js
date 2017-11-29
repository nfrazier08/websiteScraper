$(document).ready(function() {

    $("#scrape").on("click", function(){          
        $.ajax({
            type: "GET",
            url: "/scrape",                     
            success: function(article) {                             
                window.location.href = '/view'
                // console.log("changing pages..")
            }
        })
     })

     
   
   
}) //End of document.ready


// $.ajax({
//     type: "POST",
//     url: "/scrape",
//     data: JSON.stringify()
