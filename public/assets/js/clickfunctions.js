$(document).ready(function() {

    //Click function to scrape NPR articles
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

    //Click function to submit note for an article
    $(".submitNote").on("click", function(){
        const thisSubmitId = $(this).attr('targetId');
        const addThisNote = $("#noteText").val()
        // console.log(addThisNote)

        if((addThisNote === "")||(addThisNote === null)) {
            // alert("You didn't type anything...")
            $('#alertModal').modal('toggle');
            $("#alertMessage").html("You know...you didn't actually type anything...");
            return false;
        }

        const noteObj = {
            addThisNote: addThisNote
        }

        $.ajax({
            type: "POST", 
            url: `/addNote/${thisSubmitId}`,
            data: JSON.stringify(noteObj),
            dataType: 'json',
            contentType: 'application/json',
            success: function(noteObj){
                // console.log("AJAX HERE")
                // console.log(thisSubmitId)
                // console.log("THIS IS OBJ********")
                // console.log(noteObj)
                $('#addedModal').modal('toggle')
                $("#addedMessage").html("You've successfully added a note");
            }
        })
    })

    $(".viewNotes").on("click", function(){
        const thisArticleId = $(this).attr('targetId');
        console.log(thisArticleId);

        $.ajax({
            type: "GET", 
            url: `/readNotes/${thisArticleId}`, 
            success: function(notes){                                
                notes.notes.forEach(note => {
                    console.log("NOTES >>>>")
                    console.log(note)
                    console.log(note.body)
                    $(".noteText").append(note.body + "\n" + "<span class='glyphicon glyphicon-remove-circle deleteNote' id='note.id' aria-hidden='true'></span>")
                    $(".noteText").append("<hr>")
                });
            }
        })
    })


    $(".delete").on("click", function(){
        console.log("let's delete!")
        const thisDeleteId = $(this).attr('targetId')
        console.log(thisDeleteId)

        $.ajax({
            type: "DELETE", 
            url: `/delete/${thisDeleteId}`,
            success: location.reload()
        })
    })
   
   
}) //End of document.ready


