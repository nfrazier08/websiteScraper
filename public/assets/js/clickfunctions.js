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
        
        $("#noteText").val("")
    })

    $(".viewNotes").on("click", function(){
        const thisArticleId = $(this).attr('targetId');
        console.log(thisArticleId);

        $.ajax({
            type: "GET", 
            url: `/readNotes/${thisArticleId}`, 
            success: function(notes){                                
                notes.notes.forEach(note => {
                    console.log("NOTES ID >>>>")
                    const noteId = note._id;
                    console.log(note._id)
                    // console.log(note.body)                   
                    $(".noteText").append(note.body + "\n" + `<button type='button' class='btn btn-default deleteNote' id=${noteId} aria-label='Left Align'><span class='glyphicon glyphicon-remove-circle' aria-hidden='true'></span></button>`)
                    $(".noteText").append("<hr>")
                });
            }
        })
    })

    //To click on dynamically created events => do a listener on the parent and the child is the dynamic element
    // $("#parent").on("click", ".child", function(event){})


    $(".noteText").on("click", ".deleteNote", function(){
        console.log("can I?")
        const noteDeleteId = $(this).attr('id')
        console.log(noteDeleteId);
        
        $.ajax({
            type:"DELETE", 
            url: `/deleteNote/${noteDeleteId}`,
            success: location.reload()
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


