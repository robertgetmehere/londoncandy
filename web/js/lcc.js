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
        "title" : "&quot;For sweets that are simply smashing, English expats and local sugar fiends head to this 'cheerful' UES British candy emporium&quot;<br/><span class='galleryQuote'> - Zagat 2012</span>",
        "image" : "img/gallery/g1.jpg",
        "scaleToFit": 1,
        "color" : '#993333'
    }, {
        "title" : "&quot;Cool theme.  Candy from London.  Tried a coffee drink here, and like it.  Stores like this are fun!!&quot;<br/><span class='galleryQuote'> - Richard S.</span>",
        "image" : "img/gallery/g2.jpg",
        "scaleToFit" : 1
    }, {
        "title" : "&quot;This is a yummy fun candy store. All the items sold are from England. Their coffee is delicious as is their Earl Grey Tea&quot;<br/><span class='galleryQuote'> - Jamiee A</span>",
        "image" : "img/gallery/g3.jpg",
        "scaleToFit" : 0
    },{
        "title" : "&quot;I would recommend coming here for coffee&quot;<br/><span class='galleryQuote'> - Marley N</span>",
        "image" : "img/gallery/g4.jpg",
        "scaleToFit" : 0
    },{
        "title" : "&quot;I seized the opportunity to find a candy I've been constantly searhcing for...&quot;<br/><span class='galleryQuote'> - Lauren R</span>",
        "image" : "img/gallery/g5.jpg",
        "scaleToFit" : 0
    },{
        "title" : "I adore this place great atmosphere, fabulous english candy and items&quot;<br/><span class='galleryQuote'> - Zagat Review</span>",
        "image" : "img/gallery/g6.jpg",
        "scaleToFit" : 1
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
        this.dimensions = this.screenSize();
        this.middle = this.screenCenter();
        this.curNews = 0;
        if (this.dimensions.width < 1200) {
            $('.socPlugins').hide();
            $('.pennant').css('left',50);
            $('.leftPennant').css('left',50);
            $('.rightPennant').css('left',150);
            $('.headerRight').css('left',251);
            $('.headerRight').css('width',this.dimensions.width - 251);
            $('.galleryCaption').css('left',50);
            $('.lcc_socIcons').css('margin-right',50);
        } else {
            $('.socPlugins').show();
            $('.pennant').css('left',200);
            $('.leftPennant').css('left',200);
            $('.rightPennant').css('left',300);
            $('.headerRight').css('left',401);
            $('.headerRight').css('width',this.dimensions.width - 401);
            $('.galleryCaption').css('left',200);
            $('.lcc_socIcons').css('margin-right',0);
        }
        this.visit = {gallery:0,candy:0,drinks:0,events:0,facts:0,friends:0,about:0};

        (function($) {
            $(function() { //on DOM ready
                $("#scroller").simplyScroll({speed:2});
            });
        })(jQuery);

        this.loadFoursquare();

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
        },7000);
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
                    if (typeof photos[lcc.currentImage].color != 'undefined') {
                        $('.galleryCaption').css('color',photos[lcc.currentImage].color);
                        alert(photos[lcc.currentImage].color);
                    }
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
    movePress:function(n) {
        var news = $('.newsPanelItem');
        var newslen = $('.newsPanelItems').css('width');
        if (this.curNews > 0 && n==-1) {
            this.curNews--;
        }
        if (this.curNews < news.length && n==1) {
            this.curNews++;
        }
        for (var i=0;i<news.length;i++) {
            if (i < this.curNews) {news[i].hide();} else {news[i].fadeIn();}
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
            var scrolltop = $(window).scrollTop();
            if (scrolltop < 600) {
                //viewer is in gallery
                if (lcc.visit.gallery == 0) {lcc.visit.gallery=1;_gaq.push(['_trackEvent', 'scroll', 'gallery', new Date().toUTCString()]);}
            }

            if (scrolltop > 300 && scrolltop < 1500) {
                $('.smallCircOne').rotate({
                    angle:0,
                    animateTo:360,
                    easing: function (x,t,b,c,d){
                        return c*(t/d)+b;
                    }
                });
                $('.smallCircTwo').rotate({
                    angle:0,
                    animateTo:360,
                    easing: function (x,t,b,c,d){
                        return c*(t/d)+b;
                    }
                });
                $('.smallCircThree').rotate({
                    angle:0,
                    animateTo:360,
                    easing: function (x,t,b,c,d){
                        return c*(t/d)+b;
                    }
                });
                $('.smallCircFour').rotate({
                    angle:0,
                    animateTo:360,
                    easing: function (x,t,b,c,d){
                        return c*(t/d)+b;
                    }
                });
            }
            if (scrolltop > 600 && scrolltop < 1200) {
                //viewer is in candy
                if (lcc.visit.candy == 0) {
                    lcc.visit.candy=1;
                    _gaq.push(['_trackEvent', 'scroll', 'candy', new Date().toUTCString()]);

                }
            }
            if (scrolltop > 1200 && scrolltop < 1700) {
                //viewer is in drinks
                if (lcc.visit.drinks == 0) {
                    lcc.visit.drinks=1;
                    _gaq.push(['_trackEvent', 'scroll', 'drinks', new Date().toUTCString()]);


                }

            }
            if (scrolltop > 1700 && scrolltop < 2400) {
                //viewer is in events
                if (lcc.visit.events == 0) {lcc.visit.events=1;_gaq.push(['_trackEvent', 'scroll', 'events', new Date().toUTCString()]);}
            }
            if (scrolltop > 2400 && scrolltop < 3050) {
                //viewer is in facts
                if (lcc.visit.facts == 0) {lcc.visit.facts=1;_gaq.push(['_trackEvent', 'scroll', 'facts', new Date().toUTCString()]);}
            }
            if (scrolltop > 3050 && scrolltop < 3700) {
                //viewer is in friends
                if (lcc.visit.friends == 0) {lcc.visit.friends=1;_gaq.push(['_trackEvent', 'scroll', 'friends', new Date().toUTCString()]);}
            }
            if (scrolltop > 3700 && scrolltop < 4300) {
                //viewer is in about us
                if (lcc.visit.about == 0) {lcc.visit.about=1;_gaq.push(['_trackEvent', 'scroll', 'about', new Date().toUTCString()]);}
            }
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
                _gaq.push(['_trackEvent', 'click', 'fact', curFact]);

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
        $('.friend_pinterest').removeClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentYp').hide();
        $('.contentFq').hide();
        $('.contentPt').hide();
        $('.contentTw').fadeIn();
        $('#twCont').tinyscrollbar();
        _gaq.push(['_trackEvent', 'click', 'friends', 'twitter']);
    },
    getFacebook: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_yelp').removeClass('friendsIconActive');
        $('.friend_facebook').addClass('friendsIconActive');
        $('.friend_pinterest').removeClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.contentTw').hide();
        $('.contentYp').hide();
        $('.contentFq').hide();
        $('.contentPt').hide();
        $('.contentFb').fadeIn();
        _gaq.push(['_trackEvent', 'click', 'friends', 'facebook']);
    },
    getYelp: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_facebook').removeClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.friend_pinterest').removeClass('friendsIconActive');
        $('.friend_yelp').addClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentTw').hide();
        $('.contentFq').hide();
        $('.contentPt').hide();
        $('.contentYp').fadeIn();
        $('#ypCont').tinyscrollbar();
        _gaq.push(['_trackEvent', 'click', 'friends', 'yelp']);
    },
    getFoursquare: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_facebook').removeClass('friendsIconActive');
        $('.friend_yelp').removeClass('friendsIconActive');
        $('.friend_pinterest').removeClass('friendsIconActive');
        $('.friend_foursquare').addClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentTw').hide();
        $('.contentYp').hide();
        $('.contentPt').hide();
        $('.contentFq').fadeIn();
        $('#fqCont').tinyscrollbar();
        _gaq.push(['_trackEvent', 'click', 'friends', 'foursquare']);
    },
    getPinterest: function() {
        $('.friend_twitter').removeClass('friendsIconActive');
        $('.friend_facebook').removeClass('friendsIconActive');
        $('.friend_yelp').removeClass('friendsIconActive');
        $('.friend_foursquare').removeClass('friendsIconActive');
        $('.friend_pinterest').addClass('friendsIconActive');
        $('.contentFb').hide();
        $('.contentTw').hide();
        $('.contentYp').hide();
        $('.contentFq').hide();
        $('.contentPt').fadeIn();
        _gaq.push(['_trackEvent', 'click', 'friends', 'pinterest']);
    },
    loadYelp: function() {
        (function () {
            var url = encodeURI('http://api.yelp.com/business_review_search?callback=lcc.yelpPreview&term=candy&location=1442 Lexington Avenue, NYC, NY 10128&ywsid=tkjWgMTX5_EMbWFFKdA49g');
            //var url = encodeURI('http://api.yelp.com/v2/business/characters-nyc-new-york');
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            var head = document.getElementsByTagName('head').item(0);
            head.appendChild(script);
        })();
    },
    yelpPreview:function(data) {
        if (data.message.text == "OK") {
            $('.contentYp .overview').children().remove();
            for (var i = 0; i < data.businesses.length; i++) {
                var biz = data.businesses[i];
                if (biz.name == 'The London Candy Company') {
                    for (var j = 0; j < biz.reviews.length; j++) {
                        var review = biz.reviews[j];
                        var mHTML = '<div class="yp_review"><div class="yp_left"><div style="background-image:url(\'' + review.user_photo_url + '\');" class="yp_photo"></div><div class="yp_name">' + review.user_name + '</div></div><div class="yp_text"><span class="yp_rating">' + review.rating + ' stars...</span>' + review.text_excerpt + '</div><div class="yp_footer">' + review.date + ' | <a href="' + review.url + '" target="_blank">see more on Yelp</a></div>';
                        $('.contentYp .overview').append(mHTML);
                    }
                }
            }
            $('#ypCont').tinyscrollbar();
        }
    },
    loadFoursquare: function() {

        var client = new FourSquareClient("3IB2VUI0U0VA1G2YTQPFKUU33W23ASFKDZ5Z2TDXBIOH0C55", "1SNCMNY05IGUFEO2MBXFHOX0NIUFDGUEDME5KMQWR2UTWGDX", "http://localhost:8080/", "0");

        client.venuesClient.venues("4d974e22daec224bbe7b2c3e", {
            onSuccess: function(data)
            {
                // do something with the response
                // actual object data is inside: data.response
                console.log(data);
                $.each(data.response.venue.tips.groups[0].items,function(){
                    var mHTML = '<div class="yp_review"><div class="yp_left"><div style="background-image:url(\'' + this.user.photo + '\');" class="yp_photo"></div><div class="yp_name">' + this.user.firstName + ' ' + this.user.lastName + '</div></div><div class="yp_text">' + this.text + '</div><div class="yp_footer">' + new Date(this.createdAt*1000).toDateString() + '</div>';
                    $('.contentFq .overview').append(mHTML);
                });
            },
            onFailure: function(data)
            {
                // the request failed
                console.log(data);
            }
        });
    },
    screenSize: function(){
        var w = 0;var h = 0;
        //IE
        if(!window.innerWidth){
            if(!(document.documentElement.clientWidth == 0)){
                //strict mode
                w = document.documentElement.clientWidth;h = document.documentElement.clientHeight;
            } else{
                //quirks mode
                w = document.body.clientWidth;h = document.body.clientHeight;
            }
        } else {
            //w3c
            w = window.innerWidth;h = window.innerHeight;
        }
        return {width:w,height:h};
    },
    screenCenter: function(){
        var hWnd = (arguments[0] != null) ? arguments[0] : {width:0,height:0};
        var _x = 0;var _y = 0;var offsetX = 0;var offsetY = 0;
        //IE
        if(!window.pageYOffset){
            //strict mode
            if(!(document.documentElement.scrollTop == 0)){offsetY = document.documentElement.scrollTop;offsetX = document.documentElement.scrollLeft;}
            //quirks mode
            else{offsetY = document.body.scrollTop;offsetX = document.body.scrollLeft;}}
            //w3c
        else    {
            offsetX = window.pageXOffset;
            offsetY = window.pageYOffset;
        }
        _x = ((this.screenSize().width-hWnd.width)/2)+offsetX;_y = ((this.screenSize().height-hWnd.height)/2)+offsetY;
        return{x:_x,y:_y};
    }
}

