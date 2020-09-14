// JavaScript Document

var url = window.location.href
var cut = url.search('\\?')
var query = url.slice(cut+1)
var submission_status = window.sessionStorage;
//$.ajax({url: 'http://localhost:8989/thank-you',type: "POST",data: JSON.stringify(query),contentType: "application/json"});
//sessionStorage.setItem("status", 0);
console.log(submission_status.getItem("status"))
if (submission_status.getItem("status") == 0) { //FIX THIS, DOESNT STOP
	$.ajax({url : 'https://masksstore.co/thank-you',type: "POST",data: JSON.stringify(query),contentType: "application/json",
         success : function (response) {
			 console.log('Ran')
			 submission_status.setItem("status", Number(submission_status.getItem("status")) + 1);
			 
         }
})
}
