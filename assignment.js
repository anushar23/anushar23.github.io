const search=document.querySelector('i');
var section = document.querySelector('section');

//on click of search button:
search.addEventListener('click',getData);

//countdown function:
var timerId
function timer(){
	var timeLeft = 28;
			timerId = setInterval(function()
			{
					if (timeLeft<=0) {
		        clearTimeout(timerId);
		        // doSomething();
		        // timer();
		      } 
		      else {
		      	$('span').text(timeLeft);
		       
		        timeLeft--;
		      }
		  }
		      , 1000);
}


function callAjax(){


	var inp=$("input").val();

		var urlCheck = new RegExp("([a-zA-Z\d]+://)?(\w+:\w+@)?([a-zA-Z\d.-]+\.[A-Za-z]{2,4})(:\d+)?(/.*)?", 'i');
		// var regexp =new RegExp("/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/");
	  
		//checking if the input is a url format and getting the string after =
		if (urlCheck.test(inp) ){
		    var n = inp.lastIndexOf('=');
			inp = inp.substring(n + 1);
			// console.log('the url string to search is '+ inp);
		}
		$.ajax({

			type:"GET",
			url: `https://newsapi.org/v2/everything?q=${inp}&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1`,
			
			success: function(data){
				
				if(data["totalResults"]<=0){
					alert('no results to show');
				}

				var finals=data.articles;
				finals.forEach( function(each)
				{

					section.innerHTML+='<article><p>'+each.title+'</p><p>'+each.content+'</p></article>';
				
				})
							
			}
			})
			.fail (function(){
				alert('error');
			}) ;
}

var flag=0;
	function getData(){
		
		section.innerHTML="";//clear the result section

		callAjax();//start async call

    
		     //start countdown:

		 	if(flag==0 || flag===undefined){
				timer();
				flag+=1;
				console.log('inside flag '+flag);
			}
			console.log('outside flag '+flag);
			
			
	

		//auto refresh code:
		setInterval(function()
		{

			section.innerHTML="";
			//call for ajax request to auto refresh
			callAjax();
			//update the timer for next auto refresh

			timer();

		},30000);


		//listen for scrolling
		window.onscroll=function yhandler(){
			//check if scroll hits the bottom of the page
		if($(window).scrollTop() >= $(document).height() - $(window).height())
		{
		callAjax();
		
		}
		//to change the background of the fixed header on scroll as the background
		// is transparent initally
		
		var head=$('header');
		 $("header").toggleClass('scrolled', $(this).scrollTop() > head.height()/1.5);

	}

}



