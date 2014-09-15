
$(function () {

//snag data
var tuition =  Number( $('#cost').attr('tuition') );
var housing =  Number( $('#cost').attr('housing') );
var books =  Number( $('#cost').attr('books') );
//compute total
var costTotal = tuition + housing + books;

//compute percentages to 1 decimal

tuition = Math.round( (tuition / costTotal) * 100 ) ;

housing = Math.round( (housing / costTotal) * 100 ) ;

books = Math.round( (books / costTotal) * 100 ) ;



  //  Highcharts.setOptions({
 //    colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263',      '#6AF9C4']
  //  });
    
//some globals
var studTestScore;
var studGPA;
var studCategory;
var stud =  $('#personal_info');
var meritTotal=0;
var scholarshipTotal=0;
var grantTotal=0;
var awardTotal=0;

$('#submit').on('click', function(){
    studGPA = Number($(stud).find('#gpa').val());
    studTestScore = Number($(stud).find('#test_score').val());
    studCategory = $(stud).find('#category').val();

    
    //reset totals
    meritTotal=0;
     scholarshipTotal=0;
     grantTotal=0;
     awardTotal=0;
     $('.award').hide();
    elligbleAwards();
    if(awardTotal >= costTotal){
        alert("You have met or exceeded the cost to attend Yodeler's University, Apply Now!");
    }else{
        drawSavings();
    }
    
        
});//end submit function



//calculate Awards that apply
function elligbleAwards(){

    $('#awards .award').each( function(){

           if(isElligbleP(this)){
             $(this).show();
            var awardType = $(this).attr('type');

                if(awardType === "Merit"){
                    meritTotal += Number($(this).attr('ammount'));
                }
                if(awardType === "Scholarship"){
                    scholarshipTotal += Number($(this).attr('ammount'));
                }
                if(awardType === "Grant"){
                    grantTotal += Number($(this).attr('ammount'));
                }
               

           }//else screw it! 

    });//end each award
    awardTotal = meritTotal + scholarshipTotal + grantTotal;

};//end eligble Awards

function isElligbleP(target){


    if( $(target).attr('category') === "ALL" ||
         studCategory === 'ALL' ||
         $(target).attr('category') === studCategory  )
    {
        if(studGPA >= Number($(target).attr('gpa')) &&
            studTestScore >= Number($(target).attr('test-score'))  ){
            //all met conditions
    
       
            return true;
        }
        
    }//end if category
    return false;
}//end function isElligbleP



var cost = $('#cost').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Cost of Attendance'
        },
         subtitle: {
            text: 'Total: $' + costTotal,
            x: -20
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 50,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Cost Breakdown',
            data: [
                ['Books and Supplies',   books],
                ['Housing and Meals',      housing],
                {
                    name: 'Tuition',
                    y:tuition,
                    sliced: true,
                    selected: true
                },

            ]
        }]
    });//end cost toal



function drawSavings(){
var merit = Math.round( (meritTotal / costTotal) * 100 ) ;
var scholarship = Math.round( (scholarshipTotal / costTotal) * 100 ) ;
var grant = Math.round( (grantTotal / costTotal) * 100 ) ;
var remainder = Math.round( ((costTotal - awardTotal) / costTotal) * 100 ) ;


$('#savings').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Your Personal Awards'
        },
         subtitle: {
            text: 'Award Total: $' + awardTotal,
            x: -20
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 50,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Award Breakdown',
            data: [
                ['Grants',   grant],
                ['Scholarships',      scholarship],
                ['Merit', merit],
                {
                    name: 'Direct Cost',
                    y:remainder,
                    sliced: true,
                    selected: true
                },

            ]
        }]
    });//end savings total

};//end function draw savings









});//end doc ready









