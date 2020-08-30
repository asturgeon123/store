// JavaScript Document




function get_products() {
	let url = "http://127.0.0.1:8989/load_products"
	fetch(url)
	.then(res => res.json())
	.then((json) => {
	  console.log('Checkout this JSON! ', json);
		
		var i;
		//$('#product_page').html('') //#This clears the previous Static Content
		for (i = 0; i < json['data'].length; i++) {
			$('#product_page').append("<div class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women'><!-- Block2 --><div class='block2'><div class='block2-pic hov-img0'><img src="+json['data'][i]['Images'][0]+" alt='IMG-PRODUCT'>"+

							//"<a type='button' data-toggle='modal' data-target='#myModal' id='quickview' href='#' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 //bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1'>"+
							//	"Quick View"+
							//"</a>"+
						"</div>"+

						"<div class='block2-txt flex-w flex-t p-t-14'>"+
							"<div class='block2-txt-child1 flex-col-l'>"+
								"<a href='product-detail/" +json['data'][i]['sku']+ "' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6'>"+
									json['data'][i]['sku']+
								"</a>"+

								"<span class='stext-105 cl3'>"+
									"$"+json['data'][i]['price']+
								"</span>"+
							"</div>"+

							"<div class='block2-txt-child2 flex-r p-t-3'>"+
								"<a href='#' class='btn-addwish-b2 dis-block pos-relative js-addwish-b2'>"+
									"<img class='icon-heart1 dis-block trans-04' src='images/icons/icon-heart-01.png' alt='ICON'>"+
									"<img class='icon-heart2 dis-block trans-04 ab-t-l' src='images/icons/icon-heart-02.png' alt='ICON'>"+
								"</a>"+
							"</div>"+
						"</div>"+
					"</div>"+
				"</div>");
		}
	})
	.catch(err => { throw err });
}

$(document).ready(function(){get_products()})


$("#product_page").on("click", "a", function(event){
   $('#myModal').modal('toggle'); 
});






