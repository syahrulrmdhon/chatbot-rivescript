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
    var bot = new RiveScript();
    bot.loadFile("js/brain.rive").then(brainReady).catch(brainError);;

    function brainReady() {
      console.log('Brain ready');
      
    }

    function brainError() {
      console.log("Brain Error");
    }

    $("#chat-submit").click(function(e) {
      e.preventDefault();
      bot.sortReplies();
      var input = $("#chat-input").val(); 
      var msg;
      var promise = bot.reply("local-user", input).then(function(reply) {
        console.log("The bot says: " + reply);
        msg = reply;
      });
      generate_message(msg,input, 'self');
      setTimeout(function() {      
        generate_message(msg,input, 'user');  
      }, 1000)
      
    })
    
    function generate_message(msg,input, type) {
      INDEX++;
      var a = INDEX % 2;
      if (a == 1) {
          var str="";
          str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
          str += "          <span class=\"msg-avatar\">";
          str += "            <img id='img-msg-"+INDEX+"' src=\"https:\/\/image.ibb.co\/fK7R8p\/customer_service.png\">";
          str += "          <\/span>";
          str += "          <div class=\"cm-msg-text\">";
          str += input;
          str += "          <\/div>";
          str += "        <\/div>";
          $(".chat-logs").append(str);
          $("#cm-msg-"+INDEX).hide().fadeIn(300);
          $("#img-msg-"+INDEX).attr('src','https://image.ibb.co/jAFfM9/user.png');
      } else {
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