// JavaScript Document
$(document).ready(function(){
    // Loop through each div element with the class box
    $(".item2").each(function(){
        // Test if the div element is empty
	var info = $(this).data('info');
	info = info.replace(/\'/g, '\"')
	info = JSON.parse(info)
	
	console.log(typeof info)
	if (typeof info.status == 'undefined') {
		$(this).append("<span class='badge badge-danger'>Not Completed</span>")
	} else if (info.status == 'Completed') {
		$(this).append("<span class='badge badge-success'>Completed</span>")
	} else {
		$(this).append("<span class='badge badge-warning'>"+info.status+"</span>")
	}
    });
});


$('.item').click(function(event) {event.preventDefault();
  var title = $(this).data('title');
	var index = $(this).data('index');
  var sku = $(this).data('sku');
  var price = $(this).data('price');
  var description = $(this).data('description');							  
  var tags = $(this).data('tags');
  var mats = $(this).data('mats');
  var color = $(this).data('color');
  var size = $(this).data('size');
								  var url = $(this).data('url');
  var images = [$(this).data('image1'),$(this).data('image2'), $(this).data('image3')]
	
  console.log(tags)
  
  document.getElementById("edit_title").value = title;
	document.getElementById("edit_sku").value = sku;
								  document.getElementById("edit_url").value = url;
	document.getElementById("edit_price").value = price;
								  document.getElementById("edit_index").value = index;
	document.getElementById("edit_description").value = description;
								  
	document.getElementById("edit_tags").value = tags; // Convert tags from list to string
	document.getElementById("edit_mats").value = mats;
	document.getElementById("edit_color").value = color;
	document.getElementById("edit_size").value = size;
	document.getElementById("image1_text").value = images[0];
	document.getElementById("image2_text").value = images[1];
	document.getElementById("image3_text").value = images[2];
	document.getElementById("image1").setAttribute("src", images[0]);
	document.getElementById("image2").setAttribute("src", images[1]);
	document.getElementById("image3").setAttribute("src", images[2]);
	
								  
								  
});
$('.submit').click(function(event) {event.preventDefault()
									tags = document.getElementById("edit_tags").value
									console.log(typeof tags)
									
									
$.ajax({
    type: "POST",
    url: "/741852963",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({"index":document.getElementById("edit_index").value,"title": document.getElementById("edit_title").value,"sku": document.getElementById("edit_sku").value, "price": document.getElementById("edit_price").value, "description":document.getElementById("edit_description").value, "tags":tags.split(' '),"Url":document.getElementById("edit_url").value, "mats":document.getElementById("edit_mats").value, "Color": document.getElementById("edit_color").value, "Size": document.getElementById("edit_size").value, "Images":[document.getElementById("image1_text").value,document.getElementById("image2_text").value,document.getElementById("image3_text").value],}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
	console.log("Submitted Data")},
    failure: function(errMsg) {
        alert(errMsg);
    }
})})


$("image_form").change(function(){
  	document.getElementById("image1").setAttribute("src", document.getElementById("image1_text").value);
	document.getElementById("image2").setAttribute("src", document.getElementById("image2_text").value);
	document.getElementById("image3").setAttribute("src", document.getElementById("image3_text").value);
});

$('.add').click(function(event) {event.preventDefault()
								 console.log('Adding')
    document.getElementById("edit_title").value = '';
	document.getElementById("edit_sku").value = '';
	document.getElementById("edit_url").value = '';
	document.getElementById("edit_price").value = '';
	document.getElementById("edit_index").value = -2;
	document.getElementById("edit_description").value = '';
								  
	document.getElementById("edit_tags").value = ''; // Convert tags from list to string
	document.getElementById("edit_mats").value = '';
	document.getElementById("edit_color").value = '';
	document.getElementById("edit_size").value = '';
	document.getElementById("image1_text").value = '';
	document.getElementById("image2_text").value = '';
	document.getElementById("image3_text").value = '';
								})

$('.delete').click(function(event) {event.preventDefault()
									tags = document.getElementById("edit_tags").value
									console.log(typeof tags)
$.ajax({
    type: "POST",
    url: "/741852963",
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({"index":-1,"del":document.getElementById("edit_index").value}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
	console.log("Submitted Data")},
    failure: function(errMsg) {
        alert(errMsg);
    }
})})

$('.item2').click(function(event) {event.preventDefault()
	var order = $(this).data('order');
	var info = $(this).data('info');
	var total = $(this).data('total');
	var index = $(this).data('index');

	//$('status_button').data('index',index); //setter
	var status_button = document.getElementById("the_button");
	status_button.setAttribute("data-index", index);
	

	order = order.replace(/\'/g, '\"')
	info = info.replace(/\'/g, '\"')
	
	order = JSON.parse(order)
	info = JSON.parse(info)
	
	console.log(typeof info)
	if (typeof info.status == 'undefined') {
		$(".status").html("<span class='badge badge-danger'>Not Completed</span>")
	} else if (info.status == 'Completed') {
		$(".status").html("<span class='badge badge-success'>Completed</span>")
	} else {
		$(".status").html("<span class='badge badge-warning'>"+info.status+"</span>")
	}
	
	$(".info23").html("Name : "+info['name'])
	$(".info25").html("Info : "+info.phone+" "+info.email)
	$(".info24").html("Address : "+info.address+" "+info.city+" "+info.state+" "+info.zip)
	$(".order-table").html("")
	for (i = 0; i < order.length; i++) {
		$(".order-table").append("<tr><th scope='row'>"+i+"</th><td>"+order[i][0]+"</td><td>"+order[i][1]+"</td><td>"+order[i][2]+"</td></tr>");
	}
})

$('.status_button').click(function(event) {event.preventDefault()
	var index = $(this).data('index');
	console.log(index)
$.ajax({
    type: "POST",
    url: "/order_status",
    
    data: JSON.stringify({"index":index,"status":"Completed"}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){console.log("Submitted Data")
$(".status").html("<span class='badge badge-success'>Completed</span>")},
    failure: function(errMsg) {
        alert(errMsg);
    }
})})