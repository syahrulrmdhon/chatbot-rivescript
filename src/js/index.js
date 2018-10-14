function welcome() {
    //document.getElementsByClassName("chat-box").style.display = "block";
    document.getElementById("welcome-chat-box").style.display = "block";
}

function chatbox() {
    document.getElementById("chat-box").style.display = "block";
    document.getElementById("welcome-chat-box").style.display = "none";
}

function tutupchat() {
    document.getElementById("chat-box").style.display = "none";
}

$(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      e.preventDefault();
      var msg = $("#chat-input").val(); 
      if(msg.trim() == ''){
        return false;
      }
      generate_message(msg, 'self');
      setTimeout(function() {      
        generate_message(msg, 'user');  
      }, 1000)
      
    })
    
    function generate_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img id='img-msg-"+INDEX+"' src=\"https:\/\/image.ibb.co\/fK7R8p\/customer_service.png\">";
      str += "          <\/span>";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
      var a = INDEX % 2;
      if (a == 1) {
          $("#img-msg-"+INDEX).attr('src','https://image.ibb.co/jAFfM9/user.png');
      }
      if(type == 'self'){
       $("#chat-input").val(''); 
      }    
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
    }  
    
    $(document).delegate(".chat-btn", "click", function() {
      var value = $(this).attr("chat-value");
      var name = $(this).html();
      $("#chat-input").attr("disabled", false);
      generate_message(name, 'self');
    })
    
  })