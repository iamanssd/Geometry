
$(document).ready(function(){
  $("#page2").hide();
  $("#page3").hide();
  $("#result").hide();
  $("#printSellerNetSheet").hide();
  $("#closingDate").datepicker({});


  // make sure the checking value for state, county, and township turns to 'NA' before going LIVE
  $("#next1").on('click', function(){
    if(($("#state").val() != "" && $("#county").val() != "" && $("#township").val() != "" && $("#address").val() != "")){
      $("#page1").hide();
      $("#page2").show();

      var info =[$("#state").val(), $("#county").val(), $("#township").val(), $("#address").val()];
      sendEmail(info);
    }
    else{
      alert("Please fill in all the information")
    }
  });

  $("#previous1").on('click', function(){
    $("#page1").show();
    $("#page2").hide();
  });

  $("#calculate").on('click', function(){
    if(($("#sellPrice").val() != "" && $("#annPropTax").val() != "" && $("#existMrtgPay").val() != "" && $("#addMrtgPay").val() != "" && $("#closingDate").val() != "")){
      $("#page2").hide();
      $("#page3").show();
      
      calculate();
      var info =[$("#state").val(), $("#county").val(), $("#township").val(), $("#address").val(), $("#sellPrice").val(), $("#annPropTax").val(), $("#closingDate").val(), $("#existMrtgPay").val(), $("#addMrtgPay").val(), $("#salesComm").val()];
      sendEmail(info);
    }
    else{
      alert("Please fill out all the starred columns");
    }
  });

  $("#submit").on('click',function(){
    if(($("#name").val() != "" && $("#email").val() != "" && $("#phone").val() != "")){
      $("#result").show();
      $("#printSellerNetSheet").show();
      var info =[$("#state").val(), $("#county").val(), $("#township").val(), $("#address").val(), $("#sellPrice").val(), $("#closingDate").val(), $("#annPropTax").val(), $("#existMrtgPay").val(), $("#addMrtgPay").val(), $("#salesComm").val(), $("#name").val(), $("#email").val(), $("#phone").val()];
      sendEmail(info);
    }
    else{
      alert("Please fill in the starred columns");
    }
  })

  $("#previous2").on('click', function(){
    $("#page2").show();
    $("#page3").hide();
    $("#result").hide();
    $("#printSellerNetSheet").hide();
  })

  $("#reset").on('click', function(){
    $("#page1").hide();
    $("#page2").show();
    $("#page3").hide();
    $("#result").hide();
    $("#printSellerNetSheet").hide();

    $("#sellPrice").val("");
    $("#annPropTax").val("");
    $("#existMrtgPay").val("");
    $("#closingDate").val("");
    $("#addMrtgPay").val("");
    $("#salesComm").val("");
  });

  $("#sellPrice").on('change',function(){
    var commision = Math.round(($("#sellPrice").val() * 0.06)*100)/100;
    $("#salesComm").val(commision);
  });

  //Masking
  $("#sellPrice").mask("999999999");
  $("#annPropTax").mask("999999999");
  $("#existMrtgPay").mask("999999999");
  $("#addMrtgPay").mask("999999999");
  $("#phone").mask("999-999-9999");
  $("#closingDate").mask("00/00/0000");
});

function calculate(){
 var state = $("#state").val().trim();
 var county = $("#county").val();
 var township = $("#township").val();
 var address = $("#address").val();
 var sellPrice = $("#sellPrice").val();
 var annPropTax = $("#annPropTax").val().trim();
 var closingDate = $("#closingDate").val();
 var existMrtgPay = $("#existMrtgPay").val();
 var addMrtgPay = $("#addMrtgPay").val();
 var salesComm = $("#salesComm").val();

}

function sendEmail(info){
  alert("email sent");
}