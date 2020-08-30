// JavaScript Document

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

