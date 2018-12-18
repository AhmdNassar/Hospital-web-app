$("#login").click(function(e){
    $(".login-screen").css("display", "block");  
  })

  if(  $(".login-screen").css("display")  )
  {     $(document).keyup(function(e){
            if (e.keyCode === 13) $('.save').click(); 
            if (e.keyCode === 27) $(".login-screen").css("display", "none");
        })
  }

var home = $("#page-home").offset().top;
var about = $("#about-us").offset().top;
var services = $("#services").offset().top;
var appoint = $("#why-us").offset().top;
var docs = $("#our-doctors").offset().top;
var dep = $("#department").offset().top;
var blog = $("#blog").offset().top;
var cont = $("#contact").offset().top;



// Change the navbar color while scrolling .. 
$(document).ready(function () {
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 100)
        {
            $(".navbar").css("opacity","0.7")
        }
        else{
            $(".navbar").css("opacity","1")
        }
    })
  })
  
$(window).scroll(function () {
    var arr = $(window).scrollTop();
    if( arr > home )
    {
        $(".arr-top").css("opacity","1");
    }
    else
    {
        $(".arr-top").css("opacity","0");

    }
  })

  $(".arrtp").click(function(){
    $("html, body").animate({
        scrollTop : ($("#page-home").offset().top)
    },800)
  });

  $(".appoint").click(function(){
      $("html, body").animate({
          scrollTop: ($("#why-us").offset().top)
      },800)
  });

  $(document).ready(function () {
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >= home && scroll < about )
        {   $(".sc1").css("border","1px solid #d8d8d8")    
            $(".sc2").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= about && scroll < services)
        {
            $(".sc2").css("border","1px solid #d8d8d8")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= services && scroll < appoint)
        {   
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","1px solid #d8d8d8")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= appoint && scroll < docs)
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","1px solid #d8d8d8")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= docs && scroll < dep)
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","1px solid #d8d8d8")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= dep && scroll < blog)
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","1px solid #d8d8d8")
            $(".sc7").css("border","none")
            $(".sc8").css("border","none")
        }
        else if (scroll >= blog && scroll < blog+200)
        {  
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","1px solid #d8d8d8")
            $(".sc8").css("border","none")
        }
        else if (scroll >= (blog+20) )
        {
            $(".sc2").css("border","none")
            $(".sc1").css("border","none")
            $(".sc3").css("border","none")
            $(".sc4").css("border","none")
            $(".sc5").css("border","none")
            $(".sc6").css("border","none")
            $(".sc7").css("border","none")
            $(".sc8").css("border","1px solid #d8d8d8")
        }

    })
  })

  $(document).ready(function () {
    $("nav").find("a").click(function (e) { 
        e.preventDefault();
        var target = $(this).attr("href")
        $("html, body").animate({
            scrollTop : ($(target).offset().top)+20
        },800)
        
    });
  });


$(".arr").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href")
    $("html, body").animate({
        scrollTop : ($(target).offset().top)
    },800)
    
  })

  document.getElementById("register").onclick = function () {
    location.href = "register.html";
};

function validateForm() {
    var x = document.forms["register-form"]["firstName"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }


