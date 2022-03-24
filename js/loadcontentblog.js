$(document).ready(function(){
    console.log("test");
    $(".blogannoucementcontent").slice(0, 3).show();
    $("#blogannoucementloadmore").on("click", function(e){
      e.preventDefault();
      $(".blogannoucementcontent:hidden").slice(0, 3).slideDown();
      if($(".blogannoucementcontent:hidden").length == 0) {
        $("#blogannoucementloadmore").text("All blog articles loaded").addClass("blogannoucementnocontent");
      }
    });
    
  })