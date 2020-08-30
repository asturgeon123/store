// JavaScript Document
var inputs = document.getElementsByClassName("shipping-form");
var stripe = Stripe('pk_test_51HI3pfLOw0BgohiPe0gDzdbSnz8yWvcEK2V1dheuuqOwciZikeRQXLtNXmO4kTaplQWdC1IhG9NxT65u3TXeYUmr00lWMmoXZ0');
var ready = true
var submission_status = window.sessionStorage;


$('#checkout_button').on('click',function(e){
	for(i=0; i<inputs.length; i++) {
		console.log(inputs[i].value)
		if (inputs[i].value == "") {
			ready = false
			$(inputs[i]).addClass("red-border");
			//$(inputs[i]).effect( "shake" );
		} else {
			$(inputs[i]).removeClass("red-border");
		}
	}
	if (ready) {
		console.log('Processing Payment')
		var price = $(".complete-total").text().replace('$', '');
		var order = {info:{"email":$("#1_email").val(),"phone":$("#1_phone").val(),"address":$("#1_address").val(),"city":$("#2_address").val(),"state":$("#3_address").val(),"zip":$("#4_address").val()}}
		var counter = 0
		var product_info = document.getElementsByClassName("product_info")
		for(var i=0; i<product_info.length; i++) {
			counter++
			console.log($(product_info[i]).data('name'))
			var name = $(product_info[i]).data('name')
			order[counter] = {"name":name,"title":$(product_info[i]).data('title'),"count":$(product_info[i]).data('count')}
		}
					submission_status.setItem("status", 0);
console.log(submission_status.getItem("status"))
		order.total = price
		var response = fetch('/charge/'+JSON.stringify(order)).then(function(response) {
  			return response.json();
		}).then(function(responseJson) {

  			var sessionID = responseJson.session_id;
			  stripe.redirectToCheckout({
				// Make the id field from the Checkout Session creation API response
				// available to this file, so you can provide it as argument here
				// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
				sessionId: responseJson.session_id
			  }).then(function (result) {
				  console.log()
			//$.ajax({url: 'localhost:8989/thank-you',type: "POST",data: JSON.stringify(order),contentType: "application/json"});
				// If `redirectToCheckout` fails due to a browser or network
				// error, display the localized error message to your customer
				result.error.message
			  });
  			// Call stripe.redirectToCheckout() with the Session ID.
});
	}
	ready=true
});
