var facts = [ {
        factContent: "<p>In England, chocolate must contain at least 20% cocoa solids, where as in the U.S., cocoa solids need only make up 10%.</p><p>A Cadbury Dairy milk bar contains 23% cocoa solids, while a Hershey bar contains just 11%.</p>"
    }
    ,{
        factContent: "<p>The world-famous and much-loved Kit Kat was invented in York, England, in 1930, after a Rowntree candy company worker suggested a candy bar that &quot;a man could take to work in his pack up.&quot;</p><p>The Kit Kat is produced in England by Nestle\'s, while Hershey’s produces its American counterpart.</p>"
    }
    ,{
        factContent: "<p>The Digestive biscuit was so named because of the belief that sodium bicarbonate, or baking soda, has antacid properties.</p><p>The first references to such biscuits can be found as far back as 1851.  The modern McVitie’s Digestive still uses the company’s 1892 recipe.</p>"
    }
    ,{
        factContent: "<p>Britain’s bestselling Cadbury’s Dairy Milk chocolate bar is one of the biggest brands to adopt the Fairtrade mark.</p><p>This certification ensures that cocoa bean farmers will be paid market price or above for their contribution to the chocolate-making process.</p>"
    }
    ,{
        factContent: "<p>In 2006, Nestle removed all artificial dyes in its Smarties in the UK because of concern of the effects of chemical dyes on children’s health.  Blue Smarties were temporarily removed from the pack as Nestle searched for a natural alternative.</p><p>They were reintroduced in 2008 after the company developed a natural blue dye derived from the cyanobacterium spirulina.</p>"
    }
    ,{
        factContent: "<p>1.5 million Cadbury Creme Eggs are produced every day at Cadbury’s Bournville factory in Birmingham, England.</p>"
    }
    ,{
        factContent: "<p>Turkish Delight was launched in 1914 and though it has always been a popular confection.</p><p>Sales soared when the treat was included in part one of Disney’s adaptation of C.S. Lewis’ The Chronicles of Narnia.</p>"
    }
    ,{
        factContent: "<p>Brits refer to sugar-based hard candies as “boiled sweets,” a reference to how the candy is made.</p><p>Most boiled sweets were originally sold in bulk at a sweet shop.</p>"
    }
    ,{
        factContent: "<p>Walker’s Crisps are one of the bestselling potato chip brands in the UK.</p><p>Flavors include Ready Salted, Cheese & Onion, Salt & Vinegar, Steak & Onion, Smoky Bacon, Roast Chicken, Prawn Cocktail and Pickled Onion.</p>"
    }
    ,{
        factContent: "<p>Though Cadbury’s may be the biggest name in the business.</p><p>Other major chocolate companies in the United Kingdom include Green and Black’s Organic Chocolate, Thornton’s, Mars, Nestle, Divine and Traidcraft.</p>"
    }
];
var photos = [ {
        "title" : "welcome to our store",
        "image" : "img/gallery/g1.jpg",
        "scaleToFit": 1
    }, {
        "title" : "where your sure of a smile",
        "image" : "img/gallery/g2.jpg",
        "scaleToFit" : 0
    }, {
        "title" : "and can send to a friend",
        "image" : "img/gallery/g3.jpg",
        "scaleToFit" : 0
    }
];
//USE pictures from CD #s 8,11,12
var lcc = {
    initialize: function() {
        $('.aboutText').tinyscrollbar();
        this.address = '1442 Lexington Avenue, NYC, NY 10128';
        $('.funfactsText').html('<p>' + facts[0].factContent  + '</p>');
        $('.funfactNumber .f1').addClass('funfactActive');
        $('.galleryCaption').html(photos[0].title);
        this.currentImage = 1;
        this.loadGallery();
        this.scroller();
        this.showBgGallery();
        this.loadMap();
        this.loadTwitter();
        this.loadYelp();
    },
    loadMap: function() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(40.78445749999999,-73.95203620000001);
        var mapOptions = {
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        geocoder.geocode( { 'address': lcc.address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                lcc.map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: lcc.map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    },
    loadGallery: function() {
        $.each(photos,function(){
            var im = document.createElement('img');
            im.src = window.location.href + this.image;
        });
    },
    showBgGallery: function(){
        this.showInterval = setInterval(function(){
            lcc.nextImage();
        },4000);
    },
    nextImage: function(){
        if (this.currentImage < photos.length) {
            $('.galleryCaption').fadeOut(1500,function(){
                $('.galleryCaption').html('');
            });
            $('.galleryImg').fadeOut(1500,"swing",function(){
                var scaling = (photos[lcc.currentImage].scaleToFit == 1) ? {prop: "background-size", val: "100% 100%"} : {prop: "background-size", val: "100% auto"};
                $('.galleryImg').css('background-image','url(\'' + window.location.href + photos[lcc.currentImage].image + '\')').css(scaling.prop , scaling.val).fadeIn(1000,"swing",function(){
                    $('.galleryCaption').html(photos[lcc.currentImage].title).fadeIn();
                    lcc.currentImage++;
                });
            });
        } else {
            this.currentImage = 0;
            $('.galleryCaption').fadeOut(1500,function(){
                $('.galleryCaption').html('');
            });
            $('.galleryImg').fadeOut(1500,"swing",function(){
                var scaling = (photos[lcc.currentImage].scaleToFit == 1) ? {prop: "background-size", val: "100% 100%"} : {prop: "background-size", val: "100% auto"};
                $('.galleryImg').css('background-image','url(\'' + window.location.href + photos[lcc.currentImage].image + '\')').css(scaling.prop , scaling.val).fadeIn(1000,"swing",function(){
                    $('.galleryCaption').html(photos[lcc.currentImage].title).fadeIn();
                    lcc.currentImage++;
                });
            });


        }
    },
    goToByScroll: function(id){
        if (id == 'overview') {
            $('html,body').animate({scrollTop: 0},'slow');
        } else {
            $('html,body').animate({scrollTop: $("."+id).offset().top-100},'slow');
        }
    },
    scroller: function() {
        $(window).scroll(function(e){

        });
    },

    getFact:function(curFact) {
        this.dialler = $('.funfactsDiallerCenter');
        this.facts = $('.funfactNumber');
        $.each(this.facts, function(){
            if ($(this).hasClass('f' + curFact)) {
                $(this).addClass('funfactActive');
                lcc.spin();
                $('.funfactsText').hide();
                $('.funFactsHeader').hide();
                $('.funfactsText').html('');
                $('.funFactsHeader').html('Fun Fact #' + curFact);
                $('.funfactsText').html('<p>' + facts[curFact-1].factContent  + '</p>');
                $('.funFactsHeader').fadeIn();
                $('.funfactsText').fadeIn();

            } else {
                $(this).removeClass('funfactActive');
            }

        });
    },

    spin: function() {
        $('.funfactsDiallerCenter').rotate({
            angle:0,
            animateTo:360,
            easing: function (x,t,b,c,d){
                return c*(t/d)+b;
            }
        });
    },

    loadTwitter: function() {
        setTimeout(function(){
            lcc.getTwitter();
        },3000);
    },

    getTwitter: function() {
        $('.friend_twitter').addClass('friendsIconActive');
        $('.friend_facebook').removeClass('friendsIconActive');
        $('.friend_yelp').removeClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentYp').hide();
        $('.contentFq').hide();
        $('.contentTw').fadeIn();
        $('.friendsContent .contentTw').tinyscrollbar();
    },
    getFacebook: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_yelp').removeClass('friendsIconActive');
        $('.friend_facebook').addClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.contentTw').hide();
        $('.contentYp').hide();
        $('.contentFq').hide();
        $('.contentFb').fadeIn();
    },
    getYelp: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_facebook').removeClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.friend_yelp').addClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentTw').hide();
        $('.contentFq').hide();
        $('.contentYp').fadeIn();
    },
    getFoursquare: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_facebook').removeClass('friendsIconActive');
        $('.friend_yelp').removeClass('friendsIconActive');
        $('.friend_foursquare').addClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentTw').hide();
        $('.contentYp').hide();
        $('.contentFq').fadeIn();
    },
    loadYelp: function() {
        var url = encodeURI('http://api.yelp.com/business_review_search?callback=lcc.yelpPreview&term=candy&location=1442 Lexington Avenue, NYC, NY 10128&ywsid=tkjWgMTX5_EMbWFFKdA49g');
        //var url = encodeURI('http://api.yelp.com/v2/business/characters-nyc-new-york');
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        var head = document.getElementsByTagName('head').item(0);
        head.appendChild(script);
    },
    yelpPreview:function(data) {
        if (data.message.text == "OK") {
            $('.contentYp').children().remove();
            for (var i = 0; i < data.businesses.length; i++) {
                var biz = data.businesses[i];
                if (biz.name == 'The London Candy Company') {
                    for (var j = 0; j < biz.reviews.length; j++) {
                        var review = biz.reviews[j];
                        var mHTML = '<div class="yp_review"><div class="yp_left"><div style="background-image:url(\'' + review.user_photo_url + '\');" class="yp_photo"></div><div class="yp_name">' + review.user_name + '</div></div><div class="yp_text"><span class="yp_rating">' + review.rating + ' stars...</span>' + review.text_excerpt + '<br/><span class="yp_footer">' + review.date + ' | </span><a class="yp_footer" href="' + review.url + '" target="_blank">see more on Yelp</a></div>';
                        $('.contentYp').append(mHTML);
                    }
                }
            }
        }
    }
}

