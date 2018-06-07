$(document).ready(function(){

    $(window).on("keydown",function(event){
      if(event.which == 13) {
        event.preventDefault();
        return false;
      }
     });
    $('input[id=currency]').formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    $('input[id=number]').formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    $('input[id=integer]').formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 0 });
    
    if($('#loantype').val()=='11')
    {
    //  alert("Please refer to the Affordability Calculator for seller costs at closing");
    }

    $(".datepicker").datepicker({
      onSelect:function(){
        if($(this).val()!='')
        {
          $(this).css('border','5px solid #696969');
        }
        else
        {
          $(this).css('border','4px solid #bdc3c7');
        }
      },
      onClose:function(){
        $(this).blur();
      }
    });
    // $("#date201").datepicker({
    // // minDate: 0,
    // onSelect: function(dateText, inst) {
    //    var actualDate = new Date(dateText);
    //    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth()+1,0);
    //    $('#date202').datepicker('setDate', newDate );
    //    if($(this).val()!='')
    //     {
    //       $(this).css('border','5px solid #696969');
    //     }
    //     else
    //     {
    //       $(this).css('border','4px solid #bdc3c7');
    //     }
    //     if($("#date202").val()!='')
    //     {
    //       $("#date202").css('border','5px solid #696969');
    //     }
    //     else
    //     {
    //       $("#date202").css('border','4px solid #bdc3c7');
    //     }
    //   },
    //   onClose:function(){
    //     $(this).blur();
    //   }
    // });
    // $("#date202").datepicker({
    //   // var actualDate=new Date();
    //   // var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth()+1,0);
    //   onSelect:function(){
    //     if($(this).val()!='')
    //     {
    //       $(this).css('border','5px solid #696969');
    //     }
    //     else
    //     {
    //       $(this).css('border','4px solid #bdc3c7');
    //     }
    //   },
    //   onClose:function(){
    //     $(this).blur();
    //   }
    // });
    var actualDate = new Date();
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth()+1,0);


    function parseDate(str) {
      var mdy = str.split('/')
      return new Date(mdy[2], mdy[0]-1, mdy[1]);
    } 

    function daydiff(first, second) {
      return Math.floor((second-first)/(1000*60*60*24));
    }

    // alert(daydiff(parseDate($('#first').val()), parseDate($('#second').val())));

    $('#date201,#date202,input[name="row[203]"]').blur(function(){
      if($('#date202').val()!='' && $('#date201').val()!='')
      {
        var differ=daydiff(parseDate($('#date201').val()), parseDate($('#date202').val()));

        var row204=($('input[name="row[203]"]').asNumber()||0)*differ;

        $('input[name="row[204]"]').val(row204).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

        $('input[name="row[205]"]').val(row204).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      }
    });

    function equalHeight(group) 
    {
        group.each(function() 
        {
          $(this).height($(this).siblings(".col-md-7").height());
        });
    }

    equalHeight($('.col-md-5'));
    
    var insurance=$('#insurance').val();
    var loanamount=($('#loanamount').val()||0);
    var salesprice=($('#salesprice').val()||0);
    if(salesprice!=0)
    {
      var PMI=loanamount/salesprice;
    }
    if(PMI>0.8)
    {
      $('input[name="row[397]"]').attr( 'checked', true );
    }
    $( "#date201" ).datepicker( "setDate",actualDate);
    $( "#date202" ).datepicker( "setDate",newDate);
    // console.log(daydiff(parseDate($('#date201').val()), parseDate($('#date202').val())));
    var differ=daydiff(actualDate,newDate);
    var row203=($('input[name="row[203]"]').asNumber()||0);
    var row204=row203*differ;
    
    $('input[name="row[204]"]').val(row204).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

    //var old_url=$("#Old_URL").val();
    var old_url="HPC";
    
    if(old_url=="HPC")
    {
        
        if(($('input[name="row[12]"]').asNumber()||0)!=0)
        {
          $('input[name="row[13]"]').val($('input[name="row[12]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[13]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[13]"]').val('');
          $('input[name="row[13]"]').css('border','4px solid #bdc3c7');
        }
        if(($('input[name="row[14]"]').asNumber()||0)!=0)
        {
          $('input[name="row[15]"]').val($('input[name="row[14]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[15]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[15]"]').val('');
          $('input[name="row[15]"]').css('border','4px solid #bdc3c7');
        }
        if(($('input[name="row[18]"]').asNumber()||0)!=0)
        {
          $('input[name="row[19]"]').val($('input[name="row[18]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[19]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[19]"]').val('');
          $('input[name="row[19]"]').css('border','4px solid #bdc3c7');
        }
      
        if(($('input[name="row[20]"]').asNumber()||0)!=0)
        {
          $('input[name="row[21]"]').val($('input[name="row[20]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[21]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[21]"]').val('');
          $('input[name="row[21]"]').css('border','4px solid #bdc3c7');
        }
      
        if(($('input[name="row[26]"]').asNumber()||0)!=0)
        {
          $('input[name="row[29]"]').val($('input[name="row[26]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[29]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[29]"]').val('');
          $('input[name="row[29]"]').css('border','4px solid #bdc3c7');
        }
      
        if(($('input[name="row[32]"]').asNumber()||0)!=0)
        {
          $('input[name="row[35]"]').val($('input[name="row[32]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[35]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[35]"]').val('');
          $('input[name="row[35]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[38]"]').asNumber()||0)!=0)
        {
          $('input[name="row[41]"]').val($('input[name="row[38]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[41]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[41]"]').val('');
          $('input[name="row[41]"]').css('border','4px solid #bdc3c7');
        }
 
   
        if(($('input[name="row[42]"]').asNumber()||0)!=0)
        {
          $('input[name="row[44]"]').val($('input[name="row[42]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[44]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[44]"]').val('');
          $('input[name="row[44]"]').css('border','4px solid #bdc3c7');
        }
  

        if(($('input[name="row[43]"]').asNumber()||0)!=0)
        {
          $('input[name="row[45]"]').val($('input[name="row[43]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[45]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[45]"]').val('');
          $('input[name="row[45]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[46]"]').asNumber()||0)!=0)
        {
          $('input[name="row[48]"]').val($('input[name="row[46]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[48]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[48]"]').val('');
          $('input[name="row[48]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[47]"]').asNumber()||0)!=0)
        {
          $('input[name="row[49]"]').val($('input[name="row[47]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[49]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[49]"]').val('');
          $('input[name="row[49]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[50]"]').asNumber()||0)!=0)
        {
          $('input[name="row[52]"]').val($('input[name="row[50]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[52]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[52]"]').val('');
          $('input[name="row[52]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[51]"]').asNumber()||0)!=0)
        {
          $('input[name="row[53]"]').val($('input[name="row[51]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[53]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[53]"]').val('');
          $('input[name="row[53]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[54]"]').asNumber()||0)!=0)
        {
          $('input[name="row[56]"]').val($('input[name="row[54]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[56]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[56]"]').val('');
          $('input[name="row[56]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[55]"]').asNumber()||0)!=0)
        {
          $('input[name="row[57]"]').val($('input[name="row[55]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[57]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[57]"]').val('');
          $('input[name="row[57]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[62]"]').asNumber()||0)!=0)
        {
          $('input[name="row[63]"]').val($('input[name="row[62]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[63]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[63]"]').val('');
          $('input[name="row[63]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[66]"]').asNumber()||0)!=0)
        {
          $('input[name="row[67]"]').val($('input[name="row[66]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[67]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[67]"]').val('');
          $('input[name="row[67]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[94]"]').asNumber()||0)!=0)
        {
          $('input[name="row[97]"]').val($('input[name="row[94]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[97]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[97]"]').val('');
          $('input[name="row[97]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[100]"]').asNumber()||0)!=0)
        {
          $('input[name="row[103]"]').val($('input[name="row[100]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[103]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[103]"]').val('');
          $('input[name="row[103]"]').css('border','4px solid #bdc3c7');
        }

        if(($('input[name="row[106]"]').asNumber()||0)!=0)
        {
          $('input[name="row[109]"]').val($('input[name="row[106]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[109]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[109]"]').val('');
          $('input[name="row[109]"]').css('border','4px solid #bdc3c7');
        }
  
        if(($('input[name="row[111]"]').asNumber()||0)!=0)
        {
          $('input[name="row[113]"]').val($('input[name="row[111]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[113]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[113]"]').val('');
          $('input[name="row[113]"]').css('border','4px solid #bdc3c7');
        }
  
        if(($('input[name="row[115]"]').asNumber()||0)!=0)
        {
          $('input[name="row[117]"]').val($('input[name="row[115]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[117]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[117]"]').val('');
          $('input[name="row[117]"]').css('border','4px solid #bdc3c7');
        }
     
        if(($('input[name="row[119]"]').asNumber()||0)!=0)
        {
          $('input[name="row[121]"]').val($('input[name="row[119]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[121]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[121]"]').val('');
          $('input[name="row[121]"]').css('border','4px solid #bdc3c7');
        }
  
        if(($('input[name="row[123]"]').asNumber()||0)!=0)
        {
          $('input[name="row[125]"]').val($('input[name="row[123]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[125]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[125]"]').val('');
          $('input[name="row[125]"]').css('border','4px solid #bdc3c7');
        }


    
        if(($('input[name="row[127]"]').asNumber()||0)!=0)
        {
          $('input[name="row[129]"]').val($('input[name="row[127]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[129]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[129]"]').val('');
          $('input[name="row[129]"]').css('border','4px solid #bdc3c7');
        }

    
        if(($('input[name="row[131]"]').asNumber()||0)!=0)
        {
          $('input[name="row[133]"]').val($('input[name="row[131]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[133]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[133]"]').val('');
          $('input[name="row[133]"]').css('border','4px solid #bdc3c7');
        }
  


        if(($('input[name="row[135]"]').asNumber()||0)!=0)
        {
          $('input[name="row[137]"]').val($('input[name="row[135]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[137]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[137]"]').val('');
          $('input[name="row[137]"]').css('border','4px solid #bdc3c7');
        }
         if($('input[name="row[431]"]').val()!='')
        {
          $('input[name="row[432]"]').val($('input[name="row[431]"]').val());
          $('input[name="row[432]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[432]"]').val('');
          $('input[name="row[432]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[433]"]').val()!='')
        {
          $('input[name="row[434]"]').val($('input[name="row[433]"]').val());
          $('input[name="row[434]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[434]"]').val('');
          $('input[name="row[434]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[42]"]').val()!='')
        {
          $('input[name="row[44]"]').val($('input[name="row[42]"]').val());
          $('input[name="row[44]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[44]"]').val('');
          $('input[name="row[44]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[46]"]').val()!='')
        {
          $('input[name="row[48]"]').val($('input[name="row[46]"]').val());
          $('input[name="row[48]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[48]"]').val('');
          $('input[name="row[48]"]').css('border','4px solid #bdc3c7');
        }

         if($('input[name="row[50]"]').val()!='')
        {
          $('input[name="row[52]"]').val($('input[name="row[50]"]').val());
          $('input[name="row[52]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[52]"]').val('');
          $('input[name="row[52]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[54]"]').val()!='')
        {
          $('input[name="row[56]"]').val($('input[name="row[54]"]').val());
          $('input[name="row[56]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[56]"]').val('');
          $('input[name="row[56]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[110]"]').val()!='')
        {
          $('input[name="row[112]"]').val($('input[name="row[110]"]').val());
          $('input[name="row[112]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[112]"]').val('');
          $('input[name="row[112]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[114]"]').val()!='')
        {
          $('input[name="row[116]"]').val($('input[name="row[114]"]').val());
          $('input[name="row[116]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[116]"]').val('');
          $('input[name="row[116]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[118]"]').val()!='')
        {
          $('input[name="row[120]"]').val($('input[name="row[118]"]').val());
          $('input[name="row[120]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[120]"]').val('');
          $('input[name="row[120]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[122]"]').val()!='')
        {
          $('input[name="row[124]"]').val($('input[name="row[122]"]').val());
          $('input[name="row[124]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[124]"]').val('');
          $('input[name="row[124]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[126]"]').val()!='')
        {
          $('input[name="row[128]"]').val($('input[name="row[126]"]').val());
          $('input[name="row[128]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[128]"]').val('');
          $('input[name="row[128]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[130]"]').val()!='')
        {
          $('input[name="row[132]"]').val($('input[name="row[130]"]').val());
          $('input[name="row[132]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[132]"]').val('');
          $('input[name="row[132]"]').css('border','4px solid #bdc3c7');
        }

        if($('input[name="row[134]"]').val()!='')
        {
          $('input[name="row[136]"]').val($('input[name="row[134]"]').val());
          $('input[name="row[136]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[136]"]').val('');
          $('input[name="row[136]"]').css('border','4px solid #bdc3c7');
        }
    }
     var row207=($('input[name="row[207]"]').asNumber()||0);
    var row227=($('input[name="row[227]"]').asNumber()||0);
    var row209=row207*row227;
    $('input[name="row[209]"]').val(row209).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });


    var row328=($('input[name="row[157]"]').asNumber()||0)+($('input[name="row[159]"]').asNumber()||0)+($('input[name="row[163]"]').asNumber()||0)+
      ($('input[name="row[167]"]').asNumber()||0)+($('input[name="row[171]"]').asNumber()||0)+($('input[name="row[175]"]').asNumber()||0)+
      ($('input[name="row[179]"]').asNumber()||0)+($('input[name="row[183]"]').asNumber()||0)+($('input[name="row[187]"]').asNumber()||0)+
      ($('input[name="row[190]"]').asNumber()||0)+($('input[name="row[193]"]').asNumber()||0)+($('input[name="row[196]"]').asNumber()||0)+
      ($('input[name="row[199]"]').asNumber()||0)+($('input[name="row[205]"]').asNumber()||0)+row209+
      ($('input[name="row[213]"]').asNumber()||0)+($('input[name="row[216]"]').asNumber()||0)+($('input[name="row[219]"]').asNumber()||0)+
      ($('input[name="row[224]"]').asNumber()||0)+($('input[name="row[229]"]').asNumber()||0)+($('input[name="row[234]"]').asNumber()||0)+
      ($('input[name="row[239]"]').asNumber()||0)+($('input[name="row[244]"]').asNumber()||0)+($('input[name="row[248]"]').asNumber()||0)+
      ($('input[name="row[251]"]').asNumber()||0)+($('input[name="row[255]"]').asNumber()||0)+($('input[name="row[258]"]').asNumber()||0)+
      ($('input[name="row[262]"]').asNumber()||0)+($('input[name="row[265]"]').asNumber()||0)+($('input[name="row[268]"]').asNumber()||0)+
      ($('input[name="row[272]"]').asNumber()||0)+($('input[name="row[276]"]').asNumber()||0)+($('input[name="row[279]"]').asNumber()||0)+
      ($('input[name="row[282]"]').asNumber()||0)+($('input[name="row[285]"]').asNumber()||0)+($('input[name="row[288]"]').asNumber()||0)+
      ($('input[name="row[293]"]').asNumber()||0)+($('input[name="row[296]"]').asNumber()||0)+
      ($('input[name="row[312]"]').asNumber()||0)+
      ($('input[name="row[316]"]').asNumber()||0)+($('input[name="row[320]"]').asNumber()||0)+($('input[name="row[323]"]').asNumber()||0)+
      ($('input[name="row[326]"]').asNumber()||0);

    var row329=($('input[name="row[158]"]').asNumber()||0)+($('input[name="row[160]"]').asNumber()||0)+($('input[name="row[164]"]').asNumber()||0)+
    ($('input[name="row[168]"]').asNumber()||0)+($('input[name="row[172]"]').asNumber()||0)+($('input[name="row[176]"]').asNumber()||0)+
    ($('input[name="row[180]"]').asNumber()||0)+($('input[name="row[184]"]').asNumber()||0)+($('input[name="row[188]"]').asNumber()||0)+
    ($('input[name="row[191]"]').asNumber()||0)+($('input[name="row[194]"]').asNumber()||0)+($('input[name="row[197]"]').asNumber()||0)+
    ($('input[name="row[200]"]').asNumber()||0)+($('input[name="row[206]"]').asNumber()||0)+($('input[name="row[210]"]').asNumber()||0)+
    ($('input[name="row[214]"]').asNumber()||0)+($('input[name="row[217]"]').asNumber()||0)+($('input[name="row[220]"]').asNumber()||0)+
    ($('input[name="row[225]"]').asNumber()||0)+($('input[name="row[230]"]').asNumber()||0)+($('input[name="row[235]"]').asNumber()||0)+
    ($('input[name="row[240]"]').asNumber()||0)+($('input[name="row[245]"]').asNumber()||0)+($('input[name="row[249]"]').asNumber()||0)+
    ($('input[name="row[252]"]').asNumber()||0)+($('input[name="row[256]"]').asNumber()||0)+($('input[name="row[259]"]').asNumber()||0)+
    ($('input[name="row[263]"]').asNumber()||0)+($('input[name="row[266]"]').asNumber()||0)+($('input[name="row[269]"]').asNumber()||0)+
    ($('input[name="row[273]"]').asNumber()||0)+($('input[name="row[277]"]').asNumber()||0)+($('input[name="row[280]"]').asNumber()||0)+
    ($('input[name="row[283]"]').asNumber()||0)+($('input[name="row[286]"]').asNumber()||0)+($('input[name="row[289]"]').asNumber()||0)+
    ($('input[name="row[294]"]').asNumber()||0)+($('input[name="row[297]"]').asNumber()||0)+
    ($('input[name="row[313]"]').asNumber()||0)+
    ($('input[name="row[317]"]').asNumber()||0)+($('input[name="row[321]"]').asNumber()||0)+($('input[name="row[324]"]').asNumber()||0)+
    ($('input[name="row[327]"]').asNumber()||0);

   

    $('input[name="row[16]"]').val(row328).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[65]"]').val(row329).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    var row58=($('input[name="row[12]"]').asNumber()||0)+($('input[name="row[14]"]').asNumber()||0)+row328+
    ($('input[name="row[18]"]').asNumber()||0)+($('input[name="row[20]"]').asNumber()||0)+($('input[name="row[26]"]').asNumber()||0)+
    ($('input[name="row[32]"]').asNumber()||0)+($('input[name="row[38]"]').asNumber()||0)+($('input[name="row[43]"]').asNumber()||0)+
    ($('input[name="row[47]"]').asNumber()||0)+($('input[name="row[51]"]').asNumber()||0)+($('input[name="row[55]"]').asNumber()||0);
    
    var row138=($('input[name="row[62]"]').asNumber()||0)+($('input[name="row[64]"]').asNumber()||0)+($('input[name="row[66]"]').asNumber()||0)+
    ($('input[name="row[69]"]').asNumber()||0)+($('input[name="row[72]"]').asNumber()||0)+($('input[name="row[75]"]').asNumber()||0)+
    ($('input[name="row[79]"]').asNumber()||0)+($('input[name="row[83]"]').asNumber()||0)+($('input[name="row[87]"]').asNumber()||0)+
    ($('input[name="row[94]"]').asNumber()||0)+($('input[name="row[100]"]').asNumber()||0)+($('input[name="row[106]"]').asNumber()||0)+
    ($('input[name="row[111]"]').asNumber()||0)+($('input[name="row[115]"]').asNumber()||0)+($('input[name="row[119]"]').asNumber()||0)+
    ($('input[name="row[123]"]').asNumber()||0)+($('input[name="row[127]"]').asNumber()||0)+($('input[name="row[131]"]').asNumber()||0)+
    ($('input[name="row[135]"]').asNumber()||0);
    
    var row142=($('input[name="row[58]"]').asNumber()||0);
    
    var row144=($('input[name="row[138]"]').asNumber()||0);
    
    var row148=row58-row138;
    
    var row59=($('input[name="row[13]"]').asNumber()||0)+($('input[name="row[15]"]').asNumber()||0)+($('input[name="row[17]"]').asNumber()||0)+
    ($('input[name="row[19]"]').asNumber()||0)+($('input[name="row[21]"]').asNumber()||0)+($('input[name="row[29]"]').asNumber()||0)+
    ($('input[name="row[35]"]').asNumber()||0)+($('input[name="row[41]"]').asNumber()||0)+($('input[name="row[45]"]').asNumber()||0)+
    ($('input[name="row[49]"]').asNumber()||0)+($('input[name="row[53]"]').asNumber()||0)+($('input[name="row[57]"]').asNumber()||0);
    
    var row139=($('input[name="row[63]"]').asNumber()||0)+row329+($('input[name="row[67]"]').asNumber()||0)+
    ($('input[name="row[70]"]').asNumber()||0)+($('input[name="row[73]"]').asNumber()||0)+($('input[name="row[77]"]').asNumber()||0)+
    ($('input[name="row[81]"]').asNumber()||0)+($('input[name="row[85]"]').asNumber()||0)+($('input[name="row[89]"]').asNumber()||0)+
    ($('input[name="row[97]"]').asNumber()||0)+($('input[name="row[103]"]').asNumber()||0)+($('input[name="row[109]"]').asNumber()||0)+
    ($('input[name="row[113]"]').asNumber()||0)+($('input[name="row[117]"]').asNumber()||0)+($('input[name="row[121]"]').asNumber()||0)+
    ($('input[name="row[125]"]').asNumber()||0)+($('input[name="row[129]"]').asNumber()||0)+($('input[name="row[133]"]').asNumber()||0)+
    ($('input[name="row[137]"]').asNumber()||0);
    
    var row143=($('input[name="row[59]"]').asNumber()||0);
    
    var row145=($('input[name="row[139]"]').asNumber()||0);
    
    var row151=row59-row139;

    //new add
    // var row329=($('input[name="row[158]"]').asNumber()||0);

    var row213=($('input[name="row[211]"]').asNumber()||0)*(insurance||0);

    var row223=($('input[name="row[221]"]').asNumber()||0)*($('input[name="row[222]"]').asNumber()||0);

    var row228=($('input[name="row[226]"]').asNumber()||0)*($('input[name="row[227]"]').asNumber()||0);

    var row233=($('input[name="row[231]"]').asNumber()||0)*($('input[name="row[232]"]').asNumber()||0);
    
    var row238=($('input[name="row[236]"]').asNumber()||0)*($('input[name="row[237]"]').asNumber()||0);

    var row243=($('input[name="row[241]"]').asNumber()||0)*($('input[name="row[242]"]').asNumber()||0);

    var row219=row223+row228+row233;
    
    // else
    // {
    $('input[name="row[144]"]').val(row138).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[59]"]').val(row59).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[148]"]').val(row148).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[139]"]').val(row139).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[143]"]').val(row59).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
  
    $('input[name="row[145]"]').val(row139).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
  
    $('input[name="row[151]"]').val(row151).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[329]"]').val(row329).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[65]"]').val(row329).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    // }
    
    $('input[name="row[170]"]').val($('input[name="row[171]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    $('input[name="row[174]"]').val($('input[name="row[175]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    $('input[name="row[178]"]').val($('input[name="row[179]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    $('input[name="row[182]"]').val($('input[name="row[183]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    $('input[name="row[186]"]').val($('input[name="row[187]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
   
    // $('input[name="row[224]"]').val(row224).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    // $('input[name="row[229]"]').val(row229).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    // $('input[name="row[234]"]').val(row234).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

    $('input[name="row[328]"]').val(row328).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
    $('input[name="row[213]"]').val(row213).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
    $('input[name="row[223]"]').val(row223).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    
    $('input[name="row[228]"]').val(row228).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    
    $('input[name="row[233]"]').val(row233).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    
    $('input[name="row[238]"]').val(row238).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
    
    // $('input[name="row[204]"]').val(0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

    // $('input[name="row[205]"]').val(0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

    $('input[name="row[243]"]').val(row243).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
     
    //end new

    $('input[name="row[219]"]').val(row219).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
    
    $('input[name="row[58]"],input[name="row[142]"]').val(row58).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
    $('input[name="row[138]"]').val(row138).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
    // $('input[name="row[142]"]').val(row58).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    if($('#loantype').val()=='00')
    {
      $('input[name="row[144]"]').val('').prop('disabled',true);
      $('input[name="row[148]"]').val('').prop('disabled',true);
      $('input[name="row[13]"]').val('').prop('disabled',true);
      $('input[name="row[29]"]').val('').prop('disabled',true);
      $('input[name="row[59]"]').val('').prop('disabled',true);
      $('input[name="row[65]"]').val('').prop('disabled',true);
      $('input[name="row[139]"]').val('').prop('disabled',true);
      $('input[name="row[143]"]').val('').prop('disabled',true);
      $('input[name="row[145]"]').val('').prop('disabled',true);
      $('input[name="row[151]"]').val('').prop('disabled',true);
      $('input[name="row[158]"]').val('').prop('disabled',true);
      $('input[name="row[329]"]').val('').prop('disabled',true);
      $('input[name="row[331]"]').val('').prop('disabled',true);
      $('input[name="row[333]"]').val('').prop('disabled',true);
      $('input[name="row[335]"]').val('').prop('disabled',true);
      $('input[name="row[337]"]').val('').prop('disabled',true);
      $('input[name="row[339]"]').val('').prop('disabled',true);
      $('input[name="row[343]"]').val('').prop('disabled',true);
      $('input[name="row[347]"]').val('').prop('disabled',true);
      $('input[name="row[351]"]').val('').prop('disabled',true);
      $('input[name="row[355]"]').val('').prop('disabled',true);
      $('input[name="row[359]"]').val('').prop('disabled',true);
      $('input[name="row[363]"]').val('').prop('disabled',true);
      $('input[name="row[367]"]').val('').prop('disabled',true);
      $('input[name="row[369]"]').val('').prop('disabled',true);
      $('input[name="row[371]"]').val('').prop('disabled',true);
      $('input[name="row[373]"]').val('').prop('disabled',true);
      $('input[name="row[376]"]').val('').prop('disabled',true);
      $('input[name="row[378]"]').val('').prop('disabled',true);
      $('input[name="row[382]"]').val('').prop('disabled',true);
      $('input[name="row[386]"]').val('').prop('disabled',true);
      $('input[name="row[390]"]').val('').prop('disabled',true);
      //new add
      $('input[name="row[15]"]').val('').prop('disabled',true);
      $('input[name="row[430]"]').val('').prop('disabled',true);
      $('input[name="row[17]"]').val('').prop('disabled',true);
      $('input[name="row[432]"]').val('').prop('disabled',true);
      $('input[name="row[19]"]').val('').prop('disabled',true);
      $('input[name="row[21]"]').val('').prop('disabled',true);
      $('input[name="row[434]"]').val('').prop('disabled',true);
      $('input[name="row[27]"]').val('').prop('disabled',true);
      $('input[name="row[28]"]').val('').prop('disabled',true);
      $('input[name="row[33]"]').val('').prop('disabled',true);
      $('input[name="row[34]"]').val('').prop('disabled',true);
      $('input[name="row[35]"]').val('').prop('disabled',true);
      $('input[name="row[39]"]').val('').prop('disabled',true);
      $('input[name="row[40]"]').val('').prop('disabled',true);
      $('input[name="row[41]"]').val('').prop('disabled',true);
      $('input[name="row[44]"]').val('').prop('disabled',true);
      $('input[name="row[45]"]').val('').prop('disabled',true);
      $('input[name="row[48]"]').val('').prop('disabled',true);
      $('input[name="row[49]"]').val('').prop('disabled',true);
      $('input[name="row[52]"]').val('').prop('disabled',true);
      $('input[name="row[53]"]').val('').prop('disabled',true);
      $('input[name="row[56]"]').val('').prop('disabled',true);
      $('input[name="row[57]"]').val('').prop('disabled',true);
      $('input[name="row[63]"]').val('').prop('disabled',true);
      $('input[name="row[67]"]').val('').prop('disabled',true);
      $('input[name="row[70]"]').val('').prop('disabled',true);
      $('input[name="row[73]"]').val('').prop('disabled',true);
      $('input[name="row[76]"]').val('').prop('disabled',true);
      $('input[name="row[77]"]').val('').prop('disabled',true);
      $('input[name="row[80]"]').val('').prop('disabled',true);
      $('input[name="row[81]"]').val('').prop('disabled',true);
      $('input[name="row[84]"]').val('').prop('disabled',true);
      $('input[name="row[85]"]').val('').prop('disabled',true);
      $('input[name="row[88]"]').val('').prop('disabled',true);
      $('input[name="row[89]"]').val('').prop('disabled',true);
      $('input[name="row[95]"]').val('').prop('disabled',true);
      $('input[name="row[96]"]').val('').prop('disabled',true);
      $('input[name="row[97]"]').val('').prop('disabled',true);
      $('input[name="row[101]"]').val('').prop('disabled',true);
      $('input[name="row[102]"]').val('').prop('disabled',true);
      $('input[name="row[103]"]').val('').prop('disabled',true);
      $('input[name="row[107]"]').val('').prop('disabled',true);
      $('input[name="row[108]"]').val('').prop('disabled',true);
      $('input[name="row[109]"]').val('').prop('disabled',true);
      $('input[name="row[112]"]').val('').prop('disabled',true);
      $('input[name="row[113]"]').val('').prop('disabled',true);
      $('input[name="row[116]"]').val('').prop('disabled',true);
      $('input[name="row[117]"]').val('').prop('disabled',true);
      $('input[name="row[120]"]').val('').prop('disabled',true);
      $('input[name="row[121]"]').val('').prop('disabled',true);
      $('input[name="row[124]"]').val('').prop('disabled',true);
      $('input[name="row[125]"]').val('').prop('disabled',true);
      $('input[name="row[128]"]').val('').prop('disabled',true);
      $('input[name="row[129]"]').val('').prop('disabled',true);
      $('input[name="row[132]"]').val('').prop('disabled',true);
      $('input[name="row[133]"]').val('').prop('disabled',true);
      $('input[name="row[136]"]').val('').prop('disabled',true);
      $('input[name="row[137]"]').val('').prop('disabled',true);
      
      $('input[name="row[160]"]').val('').prop('disabled',true);
      $('input[name="row[164]"]').val('').prop('disabled',true);
      $('input[name="row[168]"]').val('').prop('disabled',true);
      $('input[name="row[172]"]').val('').prop('disabled',true);
      $('input[name="row[176]"]').val('').prop('disabled',true);
      $('input[name="row[180]"]').val('').prop('disabled',true);
      $('input[name="row[184]"]').val('').prop('disabled',true);
      $('input[name="row[188]"]').val('').prop('disabled',true);
      $('input[name="row[191]"]').val('').prop('disabled',true);
      $('input[name="row[194]"]').val('').prop('disabled',true);
      $('input[name="row[197]"]').val('').prop('disabled',true);
      $('input[name="row[200]"]').val('').prop('disabled',true);
      $('input[name="row[206]"]').val('').prop('disabled',true);
      $('input[name="row[210]"]').val('').prop('disabled',true);
      $('input[name="row[214]"]').val('').prop('disabled',true);
      $('input[name="row[217]"]').val('').prop('disabled',true);
      $('input[name="row[220]"]').val('').prop('disabled',true);
      $('input[name="row[225]"]').val('').prop('disabled',true);
      $('input[name="row[230]"]').val('').prop('disabled',true);
      $('input[name="row[235]"]').val('').prop('disabled',true);
      $('input[name="row[240]"]').val('').prop('disabled',true);
      $('input[name="row[245]"]').val('').prop('disabled',true);
      $('input[name="row[249]"]').val('').prop('disabled',true);
      $('input[name="row[252]"]').val('').prop('disabled',true);
      $('input[name="row[256]"]').val('').prop('disabled',true);
      $('input[name="row[259]"]').val('').prop('disabled',true);
      $('input[name="row[263]"]').val('').prop('disabled',true);
      $('input[name="row[266]"]').val('').prop('disabled',true);
      $('input[name="row[269]"]').val('').prop('disabled',true);
      $('input[name="row[273]"]').val('').prop('disabled',true);
      $('input[name="row[277]"]').val('').prop('disabled',true);
      $('input[name="row[280]"]').val('').prop('disabled',true);
      $('input[name="row[283]"]').val('').prop('disabled',true);
      $('input[name="row[286]"]').val('').prop('disabled',true);
      $('input[name="row[289]"]').val('').prop('disabled',true);
      $('input[name="row[294]"]').val('').prop('disabled',true);
      $('input[name="row[297]"]').val('').prop('disabled',true);
      $('input[name="row[302]"]').val('').prop('disabled',true);
      $('input[name="row[307]"]').val('').prop('disabled',true);
      $('input[name="row[310]"]').val('').prop('disabled',true);
      $('input[name="row[313]"]').val('').prop('disabled',true);
      $('input[name="row[317]"]').val('').prop('disabled',true);
      $('input[name="row[321]"]').val('').prop('disabled',true);
      $('input[name="row[324]"]').val('').prop('disabled',true);
      $('input[name="row[327]"]').val('').prop('disabled',true);
    
    }
    if(row148>0) 
    {
      $('#303_to').prop("checked",false);
      $('#303_from').prop("checked",true);
    }
    if(row148<0)
    {
      $('#303_from').prop("checked",false);
      $('#303_to').prop("checked",true);
    }
    if(row148==0)
    {
      $('#303_from').prop("checked",false);
      $('#303_to').prop("checked",false);
    }

    if(row151>0)
    {
      $('#603_froms').prop("checked",false);
      $('#603_tos').prop("checked",true);
    }
    if(row151<0)
    {
      $('#603_tos').prop("checked",false);
      $('#603_froms').prop("checked",true);
    }
    if(row151==0)
    {
      $('#603_tos').prop("checked",false);
      $('#603_froms').prop("checked",false);
    }


    $('input[name="row[94]"],input[name="row[97]"]').focus(function(){
      if(($('input[name="row[26]"]').asNumber()||0)!=0 && ($('input[name="row[29]"]').asNumber()||0)!=0)
      {
        alert('Tax adjustment already made on lines 106 and 406 as a buyer cost');
      }
    });

    //find out the readonly attribution
    $('input[id=currency],input[id=number],.datepicker,input[type=text],input[id=integer]').each(function(){
      if($(this).is('[readonly]'))
      {
        //if have readonly attribution,then have no border
        $(this).css('border','2px solid #bdc3c7');
        $(this).focus(function(){$(this).css('border-color','');});
      }
      if($(this).val()!='')
      {
        $(this).css('border','5px solid #696969');
        $(this).attr('placeholder','');
      }
    });

    $('.datepicker,input[type=text]').blur(function(){
      if($(this).val()!='')
      {
        $(this).css('border','5px solid #696969');
        $(this).attr('placeholder','');
      }
      else
        //return original border
      {
        $(this).css('border','4px solid #bdc3c7');
        $(this).focus(function(){$(this).css('border-color','#1abc9c');});
        $(this).attr('placeholder','');
      }
    });
    //number has no dollar sign,but has decimal
   $('input[id=number]').blur(function() {
      $(this).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

      //if the input is only number and dot,we change border-color to dark and thicker
      if($(this).val() !='')
      {
        //alert($(this).toNumber().val());
        //alert($(this).asNumber({ parse: 'true' }));
        if($(this).toNumber().val()!='')
        {
          $(this).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
          $(this).css('border','5px solid #696969');
          $(this).attr('placeholder','');
        }
        //else change to red border-coloer,and put input field to invalidate value;
        else
        {
          $(this).css('border-color','red');
          $(this).val('');
          $(this).attr('placeholder','Invalid entry');
        }
      }
      else
        //return original border
      {
        $(this).css('border','4px solid #bdc3c7');
        $(this).focus(function(){$(this).css('border-color','#1abc9c');});
        $(this).attr('placeholder','');
      }
    }).focus(function(){
      $(this).toNumber();
    })
    .keyup(function(e) {
      var e = window.event || e;
      var keyUnicode = e.charCode || e.keyCode;
      if (e !== undefined) {
        switch (keyUnicode) {
          case 16: break; // Shift
          case 17: break; // Ctrl
          case 18: break; // Alt
          case 27: this.value = ''; break; // Esc: clear entry
          case 35: break; // End
          case 36: break; // Home
          case 37: break; // cursor left
          case 38: break; // cursor up
          case 39: break; // cursor right
          case 40: break; // cursor down
          case 78: break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
          case 110: break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
          case 190: break; // .
          default: $(this).formatCurrency({ colorize: true,positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
        }
      }
    });

   $('input[id=integer]').blur(function() {
      $(this).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 0 });

      //if the input is only number and dot,we change border-color to dark and thicker
      if($(this).val() !='')
      {
        //alert($(this).toNumber().val());
        //alert($(this).asNumber({ parse: 'true' }));
        if($(this).toNumber().val()!='')
        {
          $(this).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 0 });
          $(this).css('border','5px solid #696969');
          $(this).attr('placeholder','');
        }
        //else change to red border-coloer,and put input field to invalidate value;
        else
        {
          //alert($(this).asNumber());
          $(this).css('border-color','red');
          $(this).val('');
          $(this).attr('placeholder','Invalid entry');
        }
      }
      else
        //return original border
      {
        $(this).css('border','4px solid #bdc3c7');
        $(this).focus(function(){$(this).css('border-color','#1abc9c');});
        $(this).attr('placeholder','');
      }
    }).focus(function(){
      $(this).toNumber();
    })
    .keyup(function(e) {
      var e = window.event || e;
      var keyUnicode = e.charCode || e.keyCode;
      if (e !== undefined) {
        switch (keyUnicode) {
          case 16: break; // Shift
          case 17: break; // Ctrl
          case 18: break; // Alt
          case 27: this.value = ''; break; // Esc: clear entry
          case 35: break; // End
          case 36: break; // Home
          case 37: break; // cursor left
          case 38: break; // cursor up
          case 39: break; // cursor right
          case 40: break; // cursor down
          case 78: break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
          case 110: break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
          case 190: break; // .
          default: $(this).formatCurrency({ colorize: true,positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
        }
      }
    });


    $('textarea').css('border','4px solid #bdc3c7').focus(function(){$(this).css('border-color','#1abc9c');});
    $('textarea').blur(function(){
      if($(this).val() !='')
      {
        $(this).css('border','5px solid #696969');
      }
      else
      {
        $(this).css('border','4px solid #bdc3c7');
        $(this).focus(function(){$(this).css('border-color','#1abc9c');});
      }
    });

    $('input[id=currency]').blur(function() {
        $(this).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

        //if the input is only number and dot,we change border-color to dark and thicker
        if($(this).val() !='')
        {
          //alert($(this).toNumber().val());
          //alert($(this).asNumber({ parse: 'true' }));
          if($(this).toNumber().val()!='')
          {
            $(this).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
            $(this).css('border','5px solid #696969');
            $(this).attr('placeholder','');
          }
          //else change to red border-coloer,and put input field to invalidate value;
          else
          {
            $(this).css('border-color','red');
            $(this).val('');
            $(this).attr('placeholder','Invalid entry');
          }
        }
        else
          //return original border
        {
          $(this).css('border','4px solid #bdc3c7');
          $(this).focus(function(){$(this).css('border-color','#1abc9c');});
          $(this).attr('placeholder','');
        }
      }).focus(function(){
        $(this).toNumber();
      })
      .keyup(function(e) {
        var e = window.event || e;
        var keyUnicode = e.charCode || e.keyCode;
        if (e !== undefined) {
          switch (keyUnicode) {
            case 16: break; // Shift
            case 17: break; // Ctrl
            case 18: break; // Alt
            case 27: this.value = ''; break; // Esc: clear entry
            case 35: break; // End
            case 36: break; // Home
            case 37: break; // cursor left
            case 38: break; // cursor up
            case 39: break; // cursor right
            case 40: break; // cursor down
            case 78: break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
            case 110: break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
            case 190: break; // .
            default: $(this).formatCurrency({ colorize: true,positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: -1, eventOnDecimalsEntered: true });
          }
        }
      });

    if(old_url=="HPC")
    {
      $('input[name="row[12]"]').on('change blur',function(){
        if(($('input[name="row[12]"]').asNumber()||0)!=0)
        {
          $('input[name="row[13]"]').val($('input[name="row[12]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[13]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[13]"]').val('');
          $('input[name="row[13]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[13]"]').on('change blur',function(){
        if(($('input[name="row[13]"]').asNumber()||0)!=0)
        {
          $('input[name="row[12]"]').val($('input[name="row[13]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[12]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[12]"]').val('');
          $('input[name="row[12]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[14]"]').on('change blur',function(){
        if(($('input[name="row[14]"]').asNumber()||0)!=0)
        {
          $('input[name="row[15]"]').val($('input[name="row[14]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[15]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[15]"]').val('');
          $('input[name="row[15]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[15]"]').on('change blur',function(){
        if(($('input[name="row[15]"]').asNumber()||0)!=0)
        {
          $('input[name="row[14]"]').val($('input[name="row[15]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[14]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[14]"]').val('');
          $('input[name="row[14]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[18]"]').on('change blur',function(){
        if(($('input[name="row[18]"]').asNumber()||0)!=0)
        {
          $('input[name="row[19]"]').val($('input[name="row[18]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[19]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[19]"]').val('');
          $('input[name="row[19]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[19]"]').on('change blur',function(){
        if(($('input[name="row[19]"]').asNumber()||0)!=0)
        {
          $('input[name="row[18]"]').val($('input[name="row[19]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[18]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[18]"]').val('');
          $('input[name="row[18]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[20]"]').on('change blur',function(){
        if(($('input[name="row[20]"]').asNumber()||0)!=0)
        {
          $('input[name="row[21]"]').val($('input[name="row[20]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[21]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[21]"]').val('');
          $('input[name="row[21]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[21]"]').on('change blur',function(){
        if(($('input[name="row[21]"]').asNumber()||0)!=0)
        {
          $('input[name="row[20]"]').val($('input[name="row[21]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[20]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[20]"]').val('');
          $('input[name="row[20]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[29]"]').on('change blur',function(){
        if(($('input[name="row[29]"]').asNumber()||0)!=0)
        {
          $('input[name="row[26]"]').val($('input[name="row[29]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[26]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[26]"]').val('');
          $('input[name="row[26]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[26]"]').on('change blur',function(){
        if(($('input[name="row[26]"]').asNumber()||0)!=0)
        {
          $('input[name="row[29]"]').val($('input[name="row[26]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[29]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[29]"]').val('');
          $('input[name="row[29]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[32]"]').on('change blur',function(){
        if(($('input[name="row[32]"]').asNumber()||0)!=0)
        {
          $('input[name="row[35]"]').val($('input[name="row[32]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[35]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[35]"]').val('');
          $('input[name="row[35]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[35]"]').on('change blur',function(){
        if(($('input[name="row[35]"]').asNumber()||0)!=0)
        {
          $('input[name="row[32]"]').val($('input[name="row[35]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[32]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[32]"]').val('');
          $('input[name="row[32]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[38]"]').on('change blur',function(){
        if(($('input[name="row[38]"]').asNumber()||0)!=0)
        {
          $('input[name="row[41]"]').val($('input[name="row[38]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[41]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[41]"]').val('');
          $('input[name="row[41]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[41]"]').on('change blur',function(){
        if(($('input[name="row[41]"]').asNumber()||0)!=0)
        {
          $('input[name="row[38]"]').val($('input[name="row[41]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[38]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[38]"]').val('');
          $('input[name="row[38]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[42]"]').on('change blur',function(){
        if(($('input[name="row[42]"]').asNumber()||0)!=0)
        {
          $('input[name="row[44]"]').val($('input[name="row[42]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[44]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[44]"]').val('');
          $('input[name="row[44]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[44]"]').on('change blur',function(){
        if(($('input[name="row[44]"]').asNumber()||0)!=0)
        {
          $('input[name="row[42]"]').val($('input[name="row[44]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[42]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[42]"]').val('');
          $('input[name="row[42]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[43]"]').on('change blur',function(){
        if(($('input[name="row[43]"]').asNumber()||0)!=0)
        {
          $('input[name="row[45]"]').val($('input[name="row[43]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[45]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[45]"]').val('');
          $('input[name="row[45]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[45]"]').on('change blur',function(){
        if(($('input[name="row[45]"]').asNumber()||0)!=0)
        {
          $('input[name="row[43]"]').val($('input[name="row[45]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[43]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[43]"]').val('');
          $('input[name="row[43]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[46]"]').on('change blur',function(){
        if(($('input[name="row[46]"]').asNumber()||0)!=0)
        {
          $('input[name="row[48]"]').val($('input[name="row[46]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[48]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[48]"]').val('');
          $('input[name="row[48]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[48]"]').on('change blur',function(){
        if(($('input[name="row[48]"]').asNumber()||0)!=0)
        {
          $('input[name="row[46]"]').val($('input[name="row[48]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[46]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[46]"]').val('');
          $('input[name="row[46]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[47]"]').on('change blur',function(){
        if(($('input[name="row[47]"]').asNumber()||0)!=0)
        {
          $('input[name="row[49]"]').val($('input[name="row[47]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[49]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[49]"]').val('');
          $('input[name="row[49]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[49]"]').on('change blur',function(){
        if(($('input[name="row[49]"]').asNumber()||0)!=0)
        {
          $('input[name="row[47]"]').val($('input[name="row[49]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[47]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[47]"]').val('');
          $('input[name="row[47]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[50]"]').on('change blur',function(){
        if(($('input[name="row[50]"]').asNumber()||0)!=0)
        {
          $('input[name="row[52]"]').val($('input[name="row[50]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[52]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[52]"]').val('');
          $('input[name="row[52]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[52]"]').on('change blur',function(){
        if(($('input[name="row[52]"]').asNumber()||0)!=0)
        {
          $('input[name="row[50]"]').val($('input[name="row[52]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[50]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[50]"]').val('');
          $('input[name="row[50]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[51]"]').on('change blur',function(){
        if(($('input[name="row[51]"]').asNumber()||0)!=0)
        {
          $('input[name="row[53]"]').val($('input[name="row[51]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[53]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[53]"]').val('');
          $('input[name="row[53]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[53]"]').on('change blur',function(){
        if(($('input[name="row[53]"]').asNumber()||0)!=0)
        {
          $('input[name="row[51]"]').val($('input[name="row[53]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[51]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[51]"]').val('');
          $('input[name="row[51]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[54]"]').on('change blur',function(){
        if(($('input[name="row[54]"]').asNumber()||0)!=0)
        {
          $('input[name="row[56]"]').val($('input[name="row[54]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[56]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[56]"]').val('');
          $('input[name="row[56]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[56]"]').on('change blur',function(){
        if(($('input[name="row[56]"]').asNumber()||0)!=0)
        {
          $('input[name="row[54]"]').val($('input[name="row[56]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[54]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[54]"]').val('');
          $('input[name="row[54]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[55]"]').on('change blur',function(){
        if(($('input[name="row[55]"]').asNumber()||0)!=0)
        {
          $('input[name="row[57]"]').val($('input[name="row[55]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[57]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[57]"]').val('');
          $('input[name="row[57]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[57]"]').on('change blur',function(){
        if(($('input[name="row[57]"]').asNumber()||0)!=0)
        {
          $('input[name="row[55]"]').val($('input[name="row[57]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[55]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[55]"]').val('');
          $('input[name="row[55]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[62]"]').on('change blur',function(){
        if(($('input[name="row[62]"]').asNumber()||0)!=0)
        {
          $('input[name="row[63]"]').val($('input[name="row[62]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[63]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[63]"]').val('');
          $('input[name="row[63]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[63]"]').on('change blur',function(){
        if(($('input[name="row[63]"]').asNumber()||0)!=0)
        {
          $('input[name="row[62]"]').val($('input[name="row[63]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[62]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[62]"]').val('');
          $('input[name="row[62]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[66]"]').on('change blur',function(){
        if(($('input[name="row[66]"]').asNumber()||0)!=0)
        {
          $('input[name="row[67]"]').val($('input[name="row[66]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[67]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[67]"]').val('');
          $('input[name="row[67]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[67]"]').on('change blur',function(){
        if(($('input[name="row[67]"]').asNumber()||0)!=0)
        {
          $('input[name="row[66]"]').val($('input[name="row[67]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[66]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[66]"]').val('');
          $('input[name="row[66]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[94]"]').on('change blur',function(){
        if(($('input[name="row[94]"]').asNumber()||0)!=0)
        {
          $('input[name="row[97]"]').val($('input[name="row[94]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[97]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[97]"]').val('');
          $('input[name="row[97]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[97]"]').on('change blur',function(){
        if(($('input[name="row[97]"]').asNumber()||0)!=0)
        {
          $('input[name="row[94]"]').val($('input[name="row[97]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[94]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[94]"]').val('');
          $('input[name="row[94]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[100]"]').on('change blur',function(){
        if(($('input[name="row[100]"]').asNumber()||0)!=0)
        {
          $('input[name="row[103]"]').val($('input[name="row[100]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[103]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[103]"]').val('');
          $('input[name="row[103]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[103]"]').on('change blur',function(){
        if(($('input[name="row[103]"]').asNumber()||0)!=0)
        {
          $('input[name="row[100]"]').val($('input[name="row[103]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[100]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[100]"]').val('');
          $('input[name="row[100]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[106]"]').on('change blur',function(){
        if(($('input[name="row[106]"]').asNumber()||0)!=0)
        {
          $('input[name="row[109]"]').val($('input[name="row[106]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[109]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[109]"]').val('');
          $('input[name="row[109]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[109]"]').on('change blur',function(){
        if(($('input[name="row[109]"]').asNumber()||0)!=0)
        {
          $('input[name="row[106]"]').val($('input[name="row[109]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[106]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[106]"]').val('');
          $('input[name="row[106]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[111]"]').on('change blur',function(){
        if(($('input[name="row[111]"]').asNumber()||0)!=0)
        {
          $('input[name="row[113]"]').val($('input[name="row[111]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[113]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[113]"]').val('');
          $('input[name="row[113]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[113]"]').on('change blur',function(){
        if(($('input[name="row[113]"]').asNumber()||0)!=0)
        {
          $('input[name="row[111]"]').val($('input[name="row[113]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[111]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[111]"]').val('');
          $('input[name="row[111]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[115]"]').on('change blur',function(){
        if(($('input[name="row[115]"]').asNumber()||0)!=0)
        {
          $('input[name="row[117]"]').val($('input[name="row[115]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[117]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[117]"]').val('');
          $('input[name="row[117]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[117]"]').on('change blur',function(){
        if(($('input[name="row[117]"]').asNumber()||0)!=0)
        {
          $('input[name="row[115]"]').val($('input[name="row[117]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[115]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[115]"]').val('');
          $('input[name="row[115]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[119]"]').on('change blur',function(){
        if(($('input[name="row[119]"]').asNumber()||0)!=0)
        {
          $('input[name="row[121]"]').val($('input[name="row[119]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[121]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[121]"]').val('');
          $('input[name="row[121]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[121]"]').on('change blur',function(){
        if(($('input[name="row[121]"]').asNumber()||0)!=0)
        {
          $('input[name="row[119]"]').val($('input[name="row[121]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[119]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[119]"]').val('');
          $('input[name="row[119]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[123]"]').on('change blur',function(){
        if(($('input[name="row[123]"]').asNumber()||0)!=0)
        {
          $('input[name="row[125]"]').val($('input[name="row[123]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[125]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[125]"]').val('');
          $('input[name="row[125]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[125]"]').on('change blur',function(){
        if(($('input[name="row[125]"]').asNumber()||0)!=0)
        {
          $('input[name="row[123]"]').val($('input[name="row[125]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[123]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[123]"]').val('');
          $('input[name="row[123]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[127]"]').on('change blur',function(){
        if(($('input[name="row[127]"]').asNumber()||0)!=0)
        {
          $('input[name="row[129]"]').val($('input[name="row[127]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[129]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[129]"]').val('');
          $('input[name="row[129]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[129]"]').on('change blur',function(){
        if(($('input[name="row[129]"]').asNumber()||0)!=0)
        {
          $('input[name="row[127]"]').val($('input[name="row[129]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[127]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[127]"]').val('');
          $('input[name="row[127]"]').css('border','4px solid #bdc3c7');
        }
      });
 
      $('input[name="row[131]"]').on('change blur',function(){
        if(($('input[name="row[131]"]').asNumber()||0)!=0)
        {
          $('input[name="row[133]"]').val($('input[name="row[131]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[133]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[133]"]').val('');
          $('input[name="row[133]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[133]"]').on('change blur',function(){
        if(($('input[name="row[133]"]').asNumber()||0)!=0)
        {
          $('input[name="row[131]"]').val($('input[name="row[133]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[131]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[131]"]').val('');
          $('input[name="row[131]"]').css('border','4px solid #bdc3c7');
        }
      });

      $('input[name="row[135]"]').on('change blur',function(){
        if(($('input[name="row[135]"]').asNumber()||0)!=0)
        {
          $('input[name="row[137]"]').val($('input[name="row[135]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[137]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[137]"]').val('');
          $('input[name="row[137]"]').css('border','4px solid #bdc3c7');
        }
      });
      $('input[name="row[137]"]').on('change blur',function(){
        if(($('input[name="row[137]"]').asNumber()||0)!=0)
        {
          $('input[name="row[135]"]').val($('input[name="row[137]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
          $('input[name="row[135]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[135]"]').val('');
          $('input[name="row[135]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[431]"]').on('change blur',function(){
        if($('input[name="row[431]"]').val()!='')
        {
          $('input[name="row[432]"]').val($('input[name="row[431]"]').val());
          $('input[name="row[432]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[432]"]').val('');
          $('input[name="row[432]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[432]"]').on('change blur',function(){
        if($('input[name="row[432]"]').val()!='')
        {
          $('input[name="row[431]"]').val($('input[name="row[432]"]').val());
          $('input[name="row[431]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[431]"]').val('');
          $('input[name="row[431]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[433]"]').on('change blur',function(){
        if($('input[name="row[433]"]').val()!='')
        {
          $('input[name="row[434]"]').val($('input[name="row[433]"]').val());
          $('input[name="row[434]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[434]"]').val('');
          $('input[name="row[434]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[434]"]').on('change blur',function(){
        if($('input[name="row[434]"]').val()!='')
        {
          $('input[name="row[433]"]').val($('input[name="row[434]"]').val());
          $('input[name="row[433]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[433]"]').val('');
          $('input[name="row[433]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[42]"]').on('change blur',function(){
        if($('input[name="row[42]"]').val()!='')
        {
          $('input[name="row[44]"]').val($('input[name="row[42]"]').val());
          $('input[name="row[44]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[44]"]').val('');
          $('input[name="row[44]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[44]"]').on('change blur',function(){
        if($('input[name="row[44]"]').val()!='')
        {
          $('input[name="row[42]"]').val($('input[name="row[44]"]').val());
          $('input[name="row[42]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[42]"]').val('');
          $('input[name="row[42]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[46]"]').on('change blur',function(){
        if($('input[name="row[46]"]').val()!='')
        {
          $('input[name="row[48]"]').val($('input[name="row[46]"]').val());
          $('input[name="row[48]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[48]"]').val('');
          $('input[name="row[48]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[48]"]').on('change blur',function(){
        if($('input[name="row[48]"]').val()!='')
        {
          $('input[name="row[46]"]').val($('input[name="row[48]"]').val());
          $('input[name="row[46]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[46]"]').val('');
          $('input[name="row[46]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[50]"]').on('change blur',function(){
        if($('input[name="row[50]"]').val()!='')
        {
          $('input[name="row[52]"]').val($('input[name="row[50]"]').val());
          $('input[name="row[52]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[52]"]').val('');
          $('input[name="row[52]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[52]"]').on('change blur',function(){
        if($('input[name="row[52]"]').val()!='')
        {
          $('input[name="row[50]"]').val($('input[name="row[52]"]').val());
          $('input[name="row[50]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[50]"]').val('');
          $('input[name="row[50]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[54]"]').on('change blur',function(){
        if($('input[name="row[54]"]').val()!='')
        {
          $('input[name="row[56]"]').val($('input[name="row[54]"]').val());
          $('input[name="row[56]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[56]"]').val('');
          $('input[name="row[56]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[56]"]').on('change blur',function(){
        if($('input[name="row[56]"]').val()!='')
        {
          $('input[name="row[54]"]').val($('input[name="row[56]"]').val());
          $('input[name="row[54]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[54]"]').val('');
          $('input[name="row[54]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[110]"]').on('change blur',function(){
        if($('input[name="row[110]"]').val()!='')
        {
          $('input[name="row[112]"]').val($('input[name="row[110]"]').val());
          $('input[name="row[112]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[112]"]').val('');
          $('input[name="row[112]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[112]"]').on('change blur',function(){
        if($('input[name="row[112]"]').val()!='')
        {
          $('input[name="row[110]"]').val($('input[name="row[112]"]').val());
          $('input[name="row[110]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[110]"]').val('');
          $('input[name="row[110]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[114]"]').on('change blur',function(){
        if($('input[name="row[114]"]').val()!='')
        {
          $('input[name="row[116]"]').val($('input[name="row[114]"]').val());
          $('input[name="row[116]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[116]"]').val('');
          $('input[name="row[116]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[116]"]').on('change blur',function(){
        if($('input[name="row[116]"]').val()!='')
        {
          $('input[name="row[114]"]').val($('input[name="row[116]"]').val());
          $('input[name="row[114]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[114]"]').val('');
          $('input[name="row[114]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[118]"]').on('change blur',function(){
        if($('input[name="row[118]"]').val()!='')
        {
          $('input[name="row[120]"]').val($('input[name="row[118]"]').val());
          $('input[name="row[120]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[120]"]').val('');
          $('input[name="row[120]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[120]"]').on('change blur',function(){
        if($('input[name="row[120]"]').val()!='')
        {
          $('input[name="row[118]"]').val($('input[name="row[120]"]').val());
          $('input[name="row[118]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[118]"]').val('');
          $('input[name="row[118]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[122]"]').on('change blur',function(){
        if($('input[name="row[122]"]').val()!='')
        {
          $('input[name="row[124]"]').val($('input[name="row[122]"]').val());
          $('input[name="row[124]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[124]"]').val('');
          $('input[name="row[124]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[124]"]').on('change blur',function(){
        if($('input[name="row[124]"]').val()!='')
        {
          $('input[name="row[122]"]').val($('input[name="row[124]"]').val());
          $('input[name="row[122]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[122]"]').val('');
          $('input[name="row[122]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[126]"]').on('change blur',function(){
        if($('input[name="row[126]"]').val()!='')
        {
          $('input[name="row[128]"]').val($('input[name="row[126]"]').val());
          $('input[name="row[128]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[128]"]').val('');
          $('input[name="row[128]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[128]"]').on('change blur',function(){
        if($('input[name="row[128]"]').val()!='')
        {
          $('input[name="row[126]"]').val($('input[name="row[128]"]').val());
          $('input[name="row[126]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[126]"]').val('');
          $('input[name="row[126]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[130]"]').on('change blur',function(){
        if($('input[name="row[130]"]').val()!='')
        {
          $('input[name="row[132]"]').val($('input[name="row[130]"]').val());
          $('input[name="row[132]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[132]"]').val('');
          $('input[name="row[132]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[132]"]').on('change blur',function(){
        if($('input[name="row[132]"]').val()!='')
        {
          $('input[name="row[130]"]').val($('input[name="row[132]"]').val());
          $('input[name="row[130]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[130]"]').val('');
          $('input[name="row[130]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[134]"]').on('change blur',function(){
        if($('input[name="row[134]"]').val()!='')
        {
          $('input[name="row[136]"]').val($('input[name="row[134]"]').val());
          $('input[name="row[136]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[136]"]').val('');
          $('input[name="row[136]"]').css('border','4px solid #bdc3c7');
        }
      });
        $('input[name="row[136]"]').on('change blur',function(){
        if($('input[name="row[136]"]').val()!='')
        {
          $('input[name="row[134]"]').val($('input[name="row[136]"]').val());
          $('input[name="row[134]"]').css('border','5px solid #696969');
        }
        else
        {
          $('input[name="row[134]"]').val('');
          $('input[name="row[134]"]').css('border','4px solid #bdc3c7');
        }
      });
    }
    $('input[name="row[2]"]').trigger('blur');
    $('input[name="row[201]"]').trigger('blur');
    $('#date201,#date202,input[name="row[203]"]').trigger("blur");

    $('input').on('change blur',function(){
      var row207=($('input[name="row[207]"]').asNumber()||0);
      var row227=($('input[name="row[227]"]').asNumber()||0);
      var row209=row207*row227;
      $('input[name="row[209]"]').val(row209).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
      // var row224=($('input[name="row[223]"]').asNumber()||0);
      // var row229=($('input[name="row[228]"]').asNumber()||0);
      // var row234=($('input[name="row[233]"]').asNumber()||0);
      // $('input[name="row[224]"]').val(row224).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
      // $('input[name="row[229]"]').val(row229).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
      // $('input[name="row[234]"]').val(row234).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      var row328=($('input[name="row[157]"]').asNumber()||0)+($('input[name="row[159]"]').asNumber()||0)+($('input[name="row[163]"]').asNumber()||0)+
      ($('input[name="row[167]"]').asNumber()||0)+($('input[name="row[171]"]').asNumber()||0)+($('input[name="row[175]"]').asNumber()||0)+
      ($('input[name="row[179]"]').asNumber()||0)+($('input[name="row[183]"]').asNumber()||0)+($('input[name="row[187]"]').asNumber()||0)+
      ($('input[name="row[190]"]').asNumber()||0)+($('input[name="row[193]"]').asNumber()||0)+($('input[name="row[196]"]').asNumber()||0)+
      ($('input[name="row[199]"]').asNumber()||0)+($('input[name="row[205]"]').asNumber()||0)+row209+
      ($('input[name="row[213]"]').asNumber()||0)+($('input[name="row[216]"]').asNumber()||0)+($('input[name="row[219]"]').asNumber()||0)+
      ($('input[name="row[224]"]').asNumber()||0)+($('input[name="row[229]"]').asNumber()||0)+($('input[name="row[234]"]').asNumber()||0)+
      ($('input[name="row[239]"]').asNumber()||0)+($('input[name="row[244]"]').asNumber()||0)+($('input[name="row[248]"]').asNumber()||0)+
      ($('input[name="row[251]"]').asNumber()||0)+($('input[name="row[255]"]').asNumber()||0)+($('input[name="row[258]"]').asNumber()||0)+
      ($('input[name="row[262]"]').asNumber()||0)+($('input[name="row[265]"]').asNumber()||0)+($('input[name="row[268]"]').asNumber()||0)+
      ($('input[name="row[272]"]').asNumber()||0)+($('input[name="row[276]"]').asNumber()||0)+($('input[name="row[279]"]').asNumber()||0)+
      ($('input[name="row[282]"]').asNumber()||0)+($('input[name="row[285]"]').asNumber()||0)+($('input[name="row[288]"]').asNumber()||0)+
      ($('input[name="row[293]"]').asNumber()||0)+($('input[name="row[296]"]').asNumber()||0)+
      ($('input[name="row[312]"]').asNumber()||0)+
      ($('input[name="row[316]"]').asNumber()||0)+($('input[name="row[320]"]').asNumber()||0)+($('input[name="row[323]"]').asNumber()||0)+
      ($('input[name="row[326]"]').asNumber()||0);

    var row329=($('input[name="row[158]"]').asNumber()||0)+($('input[name="row[160]"]').asNumber()||0)+($('input[name="row[164]"]').asNumber()||0)+
    ($('input[name="row[168]"]').asNumber()||0)+($('input[name="row[172]"]').asNumber()||0)+($('input[name="row[176]"]').asNumber()||0)+
    ($('input[name="row[180]"]').asNumber()||0)+($('input[name="row[184]"]').asNumber()||0)+($('input[name="row[188]"]').asNumber()||0)+
    ($('input[name="row[191]"]').asNumber()||0)+($('input[name="row[194]"]').asNumber()||0)+($('input[name="row[197]"]').asNumber()||0)+
    ($('input[name="row[200]"]').asNumber()||0)+($('input[name="row[206]"]').asNumber()||0)+($('input[name="row[210]"]').asNumber()||0)+
    ($('input[name="row[214]"]').asNumber()||0)+($('input[name="row[217]"]').asNumber()||0)+($('input[name="row[220]"]').asNumber()||0)+
    ($('input[name="row[225]"]').asNumber()||0)+($('input[name="row[230]"]').asNumber()||0)+($('input[name="row[235]"]').asNumber()||0)+
    ($('input[name="row[240]"]').asNumber()||0)+($('input[name="row[245]"]').asNumber()||0)+($('input[name="row[249]"]').asNumber()||0)+
    ($('input[name="row[252]"]').asNumber()||0)+($('input[name="row[256]"]').asNumber()||0)+($('input[name="row[259]"]').asNumber()||0)+
    ($('input[name="row[263]"]').asNumber()||0)+($('input[name="row[266]"]').asNumber()||0)+($('input[name="row[269]"]').asNumber()||0)+
    ($('input[name="row[273]"]').asNumber()||0)+($('input[name="row[277]"]').asNumber()||0)+($('input[name="row[280]"]').asNumber()||0)+
    ($('input[name="row[283]"]').asNumber()||0)+($('input[name="row[286]"]').asNumber()||0)+($('input[name="row[289]"]').asNumber()||0)+
    ($('input[name="row[294]"]').asNumber()||0)+($('input[name="row[297]"]').asNumber()||0)+
    ($('input[name="row[313]"]').asNumber()||0)+
    ($('input[name="row[317]"]').asNumber()||0)+($('input[name="row[321]"]').asNumber()||0)+($('input[name="row[324]"]').asNumber()||0)+
    ($('input[name="row[327]"]').asNumber()||0);

      var row58=($('input[name="row[12]"]').asNumber()||0)+($('input[name="row[14]"]').asNumber()||0)+row328+
                ($('input[name="row[18]"]').asNumber()||0)+($('input[name="row[20]"]').asNumber()||0)+($('input[name="row[26]"]').asNumber()||0)+
                ($('input[name="row[32]"]').asNumber()||0)+($('input[name="row[38]"]').asNumber()||0)+($('input[name="row[43]"]').asNumber()||0)+
                ($('input[name="row[47]"]').asNumber()||0)+($('input[name="row[51]"]').asNumber()||0)+($('input[name="row[55]"]').asNumber()||0);

      var row138=($('input[name="row[62]"]').asNumber()||0)+($('input[name="row[64]"]').asNumber()||0)+($('input[name="row[66]"]').asNumber()||0)+
                ($('input[name="row[69]"]').asNumber()||0)+($('input[name="row[72]"]').asNumber()||0)+($('input[name="row[75]"]').asNumber()||0)+
                ($('input[name="row[79]"]').asNumber()||0)+($('input[name="row[83]"]').asNumber()||0)+($('input[name="row[87]"]').asNumber()||0)+
                ($('input[name="row[94]"]').asNumber()||0)+($('input[name="row[100]"]').asNumber()||0)+($('input[name="row[106]"]').asNumber()||0)+
                ($('input[name="row[111]"]').asNumber()||0)+($('input[name="row[115]"]').asNumber()||0)+($('input[name="row[119]"]').asNumber()||0)+
                ($('input[name="row[123]"]').asNumber()||0)+($('input[name="row[127]"]').asNumber()||0)+($('input[name="row[131]"]').asNumber()||0)+
                ($('input[name="row[135]"]').asNumber()||0);

      // var row142=($('input[name="row[58]"]').asNumber()||0);

      // var row144=($('input[name="row[138]"]').asNumber()||0);

      var row148=row58-row138;

      var row59=($('input[name="row[13]"]').asNumber()||0)+($('input[name="row[15]"]').asNumber()||0)+($('input[name="row[17]"]').asNumber()||0)+
                ($('input[name="row[19]"]').asNumber()||0)+($('input[name="row[21]"]').asNumber()||0)+($('input[name="row[29]"]').asNumber()||0)+
                ($('input[name="row[35]"]').asNumber()||0)+($('input[name="row[41]"]').asNumber()||0)+($('input[name="row[45]"]').asNumber()||0)+
                ($('input[name="row[49]"]').asNumber()||0)+($('input[name="row[53]"]').asNumber()||0)+($('input[name="row[57]"]').asNumber()||0);

      var row139=($('input[name="row[63]"]').asNumber()||0)+row329+($('input[name="row[67]"]').asNumber()||0)+
                ($('input[name="row[70]"]').asNumber()||0)+($('input[name="row[73]"]').asNumber()||0)+($('input[name="row[77]"]').asNumber()||0)+
                ($('input[name="row[81]"]').asNumber()||0)+($('input[name="row[85]"]').asNumber()||0)+($('input[name="row[89]"]').asNumber()||0)+
                ($('input[name="row[97]"]').asNumber()||0)+($('input[name="row[103]"]').asNumber()||0)+($('input[name="row[109]"]').asNumber()||0)+
                ($('input[name="row[113]"]').asNumber()||0)+($('input[name="row[117]"]').asNumber()||0)+($('input[name="row[121]"]').asNumber()||0)+
                ($('input[name="row[125]"]').asNumber()||0)+($('input[name="row[129]"]').asNumber()||0)+($('input[name="row[133]"]').asNumber()||0)+
                ($('input[name="row[137]"]').asNumber()||0);

      // var row143=($('input[name="row[59]"]').asNumber()||0);

      // var row145=($('input[name="row[139]"]').asNumber()||0);

      var row151=row59-row139;

      $('input[name="row[144]"]').val(row138).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[65]"]').val(row329).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[59]"]').val(row59).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[148]"]').val(row148).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[139]"]').val(row139).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[143]"]').val(row59).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
      $('input[name="row[145]"]').val(row139).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
      $('input[name="row[151]"]').val(row151).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[329]"]').val(row329).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      //new add
      // var row329=($('input[name="row[158]"]').asNumber()||0);

      var row213=($('input[name="row[211]"]').asNumber()||0)*(insurance||0);

      var row223=($('input[name="row[221]"]').asNumber()||0)*($('input[name="row[222]"]').asNumber()||0);

      var row228=($('input[name="row[226]"]').asNumber()||0)*($('input[name="row[227]"]').asNumber()||0);

      var row233=($('input[name="row[231]"]').asNumber()||0)*($('input[name="row[232]"]').asNumber()||0);
      
      var row238=($('input[name="row[236]"]').asNumber()||0)*($('input[name="row[237]"]').asNumber()||0);

      var row243=($('input[name="row[241]"]').asNumber()||0)*($('input[name="row[242]"]').asNumber()||0);

      var row219=row223+row228+row233;
      
      var row373=row223+row228+row233;

      $('input[name="row[219]"]').val(row219).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
      // $('input[name="row[329]"]').val(row329).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[213]"]').val(row213).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[223]"]').val(row223).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[228]"]').val(row228).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[233]"]').val(row233).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[238]"]').val(row238).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[243]"]').val(row243).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      
      $('input[name="row[373]"]').val(row373).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });
    
      //end new
      //
      //new add
      

      // var row204=($('input[name="row[203]"]').asNumber()||0)*differ;

      // $('input[name="row[204]"]').val(row204).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

      $('input[name="row[16]"]').val(row328).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[328]"]').val(row328).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      //end new

      $('input[name="row[58]"]').val(row58).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[138]"]').val(row138).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[142]"]').val(row58).formatCurrency({ colorize: true, positiveFormat:'%s%n',negativeFormat: '-%s%n', roundToDecimalPlace: 2 });

      $('input[name="row[170]"]').val($('input[name="row[171]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      $('input[name="row[174]"]').val($('input[name="row[175]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      $('input[name="row[178]"]').val($('input[name="row[179]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      $('input[name="row[182]"]').val($('input[name="row[183]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });
      $('input[name="row[186]"]').val($('input[name="row[187]"]').asNumber()||0).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

      var differ=daydiff(parseDate($('#date201').val()), parseDate($('#date202').val()));

      var row204=($('input[name="row[203]"]').asNumber()||0)*differ;

      $('input[name="row[204]"]').val(row204).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

      $('input[name="row[205]"]').val(row204).formatCurrency({ colorize: true, positiveFormat:'%n',negativeFormat: '-%n', roundToDecimalPlace: 2 });

      if(row148>0)
      {
        $('#303_to').prop("checked",false);
        $('#303_from').prop("checked",true);
      }
      if(row148<0)
      {
        $('#303_from').prop("checked",false);
        $('#303_to').prop("checked",true);
      }
      if(row148==0)
      {
        $('#303_from').prop("checked",false);
        $('#303_to').prop("checked",false);
      }

      if(row151>0)
      {
        $('#603_froms').prop("checked",false);
        $('#603_tos').prop("checked",true);
      }
      if(row151<0)
      {
        $('#603_tos').prop("checked",false);
        $('#603_froms').prop("checked",true);
      }
      if(row151==0)
      {
        $('#603_tos').prop("checked",false);
        $('#603_froms').prop("checked",false);
      }
      
      //adjusted to show buyer/seller
      if($('#loantype').val()=='00')
      {
        $('input[name="row[144]"]').val('').prop('disabled',true);
        $('input[name="row[148]"]').val('').prop('disabled',true);
        $('input[name="row[13]"]').val('').prop('disabled',true);
        $('input[name="row[29]"]').val('').prop('disabled',true);
        $('input[name="row[59]"]').val('').prop('disabled',true);
        $('input[name="row[65]"]').val('').prop('disabled',true);
        $('input[name="row[139]"]').val('').prop('disabled',true);
        $('input[name="row[143]"]').val('').prop('disabled',true);
        $('input[name="row[145]"]').val('').prop('disabled',true);
        $('input[name="row[151]"]').val('').prop('disabled',true);
        $('input[name="row[158]"]').val('').prop('disabled',true);
        $('input[name="row[329]"]').val('').prop('disabled',true);
        $('input[name="row[331]"]').val('').prop('disabled',true);
        $('input[name="row[333]"]').val('').prop('disabled',true);
        $('input[name="row[335]"]').val('').prop('disabled',true);
        $('input[name="row[337]"]').val('').prop('disabled',true);
        $('input[name="row[339]"]').val('').prop('disabled',true);
        $('input[name="row[343]"]').val('').prop('disabled',true);
        $('input[name="row[347]"]').val('').prop('disabled',true);
        $('input[name="row[351]"]').val('').prop('disabled',true);
        $('input[name="row[355]"]').val('').prop('disabled',true);
        $('input[name="row[359]"]').val('').prop('disabled',true);
        $('input[name="row[363]"]').val('').prop('disabled',true);
        $('input[name="row[367]"]').val('').prop('disabled',true);
        $('input[name="row[369]"]').val('').prop('disabled',true);
        $('input[name="row[371]"]').val('').prop('disabled',true);
        $('input[name="row[373]"]').val('').prop('disabled',true);
        $('input[name="row[376]"]').val('').prop('disabled',true);
        $('input[name="row[378]"]').val('').prop('disabled',true);
        $('input[name="row[382]"]').val('').prop('disabled',true);
        $('input[name="row[386]"]').val('').prop('disabled',true);
        $('input[name="row[390]"]').val('').prop('disabled',true);
        //new add
        $('input[name="row[15]"]').val('').prop('disabled',true);
        $('input[name="row[430]"]').val('').prop('disabled',true);
        $('input[name="row[17]"]').val('').prop('disabled',true);
        $('input[name="row[432]"]').val('').prop('disabled',true);
        $('input[name="row[19]"]').val('').prop('disabled',true);
        $('input[name="row[21]"]').val('').prop('disabled',true);
        $('input[name="row[434]"]').val('').prop('disabled',true);
        $('input[name="row[27]"]').val('').prop('disabled',true);
        $('input[name="row[28]"]').val('').prop('disabled',true);
        $('input[name="row[33]"]').val('').prop('disabled',true);
        $('input[name="row[34]"]').val('').prop('disabled',true);
        $('input[name="row[35]"]').val('').prop('disabled',true);
        $('input[name="row[39]"]').val('').prop('disabled',true);
        $('input[name="row[40]"]').val('').prop('disabled',true);
        $('input[name="row[41]"]').val('').prop('disabled',true);
        $('input[name="row[44]"]').val('').prop('disabled',true);
        $('input[name="row[45]"]').val('').prop('disabled',true);
        $('input[name="row[48]"]').val('').prop('disabled',true);
        $('input[name="row[49]"]').val('').prop('disabled',true);
        $('input[name="row[52]"]').val('').prop('disabled',true);
        $('input[name="row[53]"]').val('').prop('disabled',true);
        $('input[name="row[56]"]').val('').prop('disabled',true);
        $('input[name="row[57]"]').val('').prop('disabled',true);
        $('input[name="row[63]"]').val('').prop('disabled',true);
        $('input[name="row[67]"]').val('').prop('disabled',true);
        $('input[name="row[70]"]').val('').prop('disabled',true);
        $('input[name="row[73]"]').val('').prop('disabled',true);
        $('input[name="row[76]"]').val('').prop('disabled',true);
        $('input[name="row[77]"]').val('').prop('disabled',true);
        $('input[name="row[80]"]').val('').prop('disabled',true);
        $('input[name="row[81]"]').val('').prop('disabled',true);
        $('input[name="row[84]"]').val('').prop('disabled',true);
        $('input[name="row[85]"]').val('').prop('disabled',true);
        $('input[name="row[88]"]').val('').prop('disabled',true);
        $('input[name="row[89]"]').val('').prop('disabled',true);
        $('input[name="row[95]"]').val('').prop('disabled',true);
        $('input[name="row[96]"]').val('').prop('disabled',true);
        $('input[name="row[97]"]').val('').prop('disabled',true);
        $('input[name="row[101]"]').val('').prop('disabled',true);
        $('input[name="row[102]"]').val('').prop('disabled',true);
        $('input[name="row[103]"]').val('').prop('disabled',true);
        $('input[name="row[107]"]').val('').prop('disabled',true);
        $('input[name="row[108]"]').val('').prop('disabled',true);
        $('input[name="row[109]"]').val('').prop('disabled',true);
        $('input[name="row[112]"]').val('').prop('disabled',true);
        $('input[name="row[113]"]').val('').prop('disabled',true);
        $('input[name="row[116]"]').val('').prop('disabled',true);
        $('input[name="row[117]"]').val('').prop('disabled',true);
        $('input[name="row[120]"]').val('').prop('disabled',true);
        $('input[name="row[121]"]').val('').prop('disabled',true);
        $('input[name="row[124]"]').val('').prop('disabled',true);
        $('input[name="row[125]"]').val('').prop('disabled',true);
        $('input[name="row[128]"]').val('').prop('disabled',true);
        $('input[name="row[129]"]').val('').prop('disabled',true);
        $('input[name="row[132]"]').val('').prop('disabled',true);
        $('input[name="row[133]"]').val('').prop('disabled',true);
        $('input[name="row[136]"]').val('').prop('disabled',true);
        $('input[name="row[137]"]').val('').prop('disabled',true);
        
        $('input[name="row[160]"]').val('').prop('disabled',true);
        $('input[name="row[164]"]').val('').prop('disabled',true);
        $('input[name="row[168]"]').val('').prop('disabled',true);
        $('input[name="row[172]"]').val('').prop('disabled',true);
        $('input[name="row[176]"]').val('').prop('disabled',true);
        $('input[name="row[180]"]').val('').prop('disabled',true);
        $('input[name="row[184]"]').val('').prop('disabled',true);
        $('input[name="row[188]"]').val('').prop('disabled',true);
        $('input[name="row[191]"]').val('').prop('disabled',true);
        $('input[name="row[194]"]').val('').prop('disabled',true);
        $('input[name="row[197]"]').val('').prop('disabled',true);
        $('input[name="row[200]"]').val('').prop('disabled',true);
        $('input[name="row[206]"]').val('').prop('disabled',true);
        $('input[name="row[210]"]').val('').prop('disabled',true);
        $('input[name="row[214]"]').val('').prop('disabled',true);
        $('input[name="row[217]"]').val('').prop('disabled',true);
        $('input[name="row[220]"]').val('').prop('disabled',true);
        $('input[name="row[225]"]').val('').prop('disabled',true);
        $('input[name="row[230]"]').val('').prop('disabled',true);
        $('input[name="row[235]"]').val('').prop('disabled',true);
        $('input[name="row[240]"]').val('').prop('disabled',true);
        $('input[name="row[245]"]').val('').prop('disabled',true);
        $('input[name="row[249]"]').val('').prop('disabled',true);
        $('input[name="row[252]"]').val('').prop('disabled',true);
        $('input[name="row[256]"]').val('').prop('disabled',true);
        $('input[name="row[259]"]').val('').prop('disabled',true);
        $('input[name="row[263]"]').val('').prop('disabled',true);
        $('input[name="row[266]"]').val('').prop('disabled',true);
        $('input[name="row[269]"]').val('').prop('disabled',true);
        $('input[name="row[273]"]').val('').prop('disabled',true);
        $('input[name="row[277]"]').val('').prop('disabled',true);
        $('input[name="row[280]"]').val('').prop('disabled',true);
        $('input[name="row[283]"]').val('').prop('disabled',true);
        $('input[name="row[286]"]').val('').prop('disabled',true);
        $('input[name="row[289]"]').val('').prop('disabled',true);
        $('input[name="row[294]"]').val('').prop('disabled',true);
        $('input[name="row[297]"]').val('').prop('disabled',true);
        $('input[name="row[302]"]').val('').prop('disabled',true);
        $('input[name="row[307]"]').val('').prop('disabled',true);
        $('input[name="row[310]"]').val('').prop('disabled',true);
        $('input[name="row[313]"]').val('').prop('disabled',true);
        $('input[name="row[317]"]').val('').prop('disabled',true);
        $('input[name="row[321]"]').val('').prop('disabled',true);
        $('input[name="row[324]"]').val('').prop('disabled',true);
        $('input[name="row[327]"]').val('').prop('disabled',true);
      }
    });
    $('input[name="row[328]"]').trigger('blur');
  });