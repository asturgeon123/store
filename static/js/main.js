
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
	
	/*[Load Header File]
	===========================================================*/
	//$(function(){
  		//$("#header").load("header.html"); 
  	//	$("#footer").load("{{ url_for('static',filename='footer.html') }}"); 
	//});
	
	
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });



})(jQuery);

// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  
  // Constructor
  function Item(name, price, count,image, title) {
    this.name = name;
    this.price = price;
    this.count = count;
	this.image = image;
	this.title = title;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(name, price, count, image,title) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count = cart[item].count + count;;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count, image, title);
    cart.push(item);
    saveCart();
  }	

  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
	  saveCart();
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var count = Number(document.getElementById('counter_box').value);
  var image = $(this).data('image');
  var title = $(this).data('title');
  console.log(count)
  shoppingCart.addItemToCart(name, price, count, image,title);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart(page = 0) {
  var cartArray = shoppingCart.listCart();
  var checkout_cart = "<tr class='table_head'>"+
  "<th class='column-1'>Product</th>"+
	"<th class='column-2'></th>"+
	"<th class='column-3'>Price</th>"+
	"<th class='column-4'>Quantity</th>"+
	"<th class='column-5'>Total</th>"+
	"</tr>";
  var listview = "";
  for(var i in cartArray) {
		  checkout_cart += "<tr data-title='"+cartArray[i].title+"' data-name='"+cartArray[i].name+"' data-count='"+cartArray[i].count+"' class='product_info table_row'>" +
			  "<td class='column-1'>" + 
			  	"<div data-name='"+cartArray[i].name+"'class='delete-item how-itemcart1'>" +
			  		"<img src='" + cartArray[i].image + "' alt='IMG'/>" +
				"</div>" +
			  "</td>" + 
			"<td class=column-2>" + cartArray[i].title + "</td>" +
			"<td class='column-3'>" + cartArray[i].price + "</td>" +
			"<td class='column-4'>" +
				"<div class='wrap-num-product flex-w m-l-auto m-r-0'>" + 
				"<div data-count='"+cartArray[i].count+"' data-name='"+cartArray[i].name+"' class='minus-item btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'>" +
					"<i class='fs-16 zmdi zmdi-minus'></i>" +
				"</div>" +
					"<input data-name='"+cartArray[i].name+"' class='item-count mtext-104 cl3 txt-center num-product' type='number' name='num-product1' value=" + cartArray[i].count + ">" +
					"<div data-name='"+cartArray[i].name+"' data-count='"+cartArray[i].count+"' class='plus-item btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m'>" + 
						"<i class='fs-16 zmdi zmdi-plus'></i>" + 
					"</div>" + 
				"</div>" + 
			"</td><td class='column-5'>$" + cartArray[i].total + "</td></tr>"
	  
	 listview += "<li class='header-cart-item flex-w flex-t m-b-12'>" +
						"<div data-name='"+cartArray[i].name+"' class='delete-item header-cart-item-img'>" +
							"<img src='" + cartArray[i].image + "' alt='IMG'>" +
						"</div>" +

						"<div class='header-cart-item-txt p-t-8'>" + 
							"<a href='#' class='header-cart-item-name m-b-18 hov-cl1 trans-04'>" +
								cartArray[i].title +
							"</a>" +
							"<span class='header-cart-item-info'>" + 
								cartArray[i].count+" x $"+cartArray[i].price +
							"</span>" +
						"</div>" +
					"</li>" 

  }
	
  $('.show-cart1').html(checkout_cart);
  $('.show-cart').html(listview);
  $('.total-cart').html("$"+shoppingCart.totalCart());
  $('.total-cart1').html("Total: $"+shoppingCart.totalCart());
  $('#total-count').data('notify',shoppingCart.totalCount());
	document.getElementsByClassName(".complete-total").value = shoppingCart.totalCart()+9.10
   $('.complete-total').html("$"+(shoppingCart.totalCart()).toFixed(2))//Number(document.getElementById('shipping_cost').value));
  //$('.total-count').html(shoppingCart.totalCount());
}


// Delete item button
$('.show-cart').on("click", ".delete-item",function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
	console.log('Item Deleted')
  displayCart();
})

$('.show-cart1').on("click", ".delete-item",function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
	console.log('Item Deleted')
  displayCart();
})

// -1
$('.show-cart1').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart1').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  var count = $(this).data('count')
  console.log(count)
  shoppingCart.setCountForItem(name,count+1);
  displayCart();
})

// Item count input
$('.show-cart1').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});


displayCart(); 





