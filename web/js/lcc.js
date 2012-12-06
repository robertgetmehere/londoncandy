var facts = [ {
        factContent: "In England, chocolate must contain at least 20% cocoa solids, where as in the U.S., cocoa solids need only make up 10%. A Cadbury Dairy milk bar contains 23% cocoa solids, while a Hershey bar contains just 11%."
    }
    ,{
        factContent: "The world-famous and much-loved Kit Kat was invented in York, England, in 1930, after a Rowntree candy company worker suggested a candy bar that &quot;a man could take to work in his pack up.&quot; The Kit Kat is produced in England by Nestle\'s, while Hershey’s produces its American counterpart."
    }
    ,{
        factContent: "The Digestive biscuit was so named because of the belief that sodium bicarbonate, or baking soda, has antacid properties. The first references to such biscuits can be found as far back as 1851.  The modern McVitie’s Digestive still uses the company’s 1892 recipe."
    }
    ,{
        factContent: "Britain’s bestselling Cadbury’s Dairy Milk chocolate bar is one of the biggest brands to adopt the Fairtrade mark. This certification ensures that cocoa bean farmers will be paid market price or above for their contribution to the chocolate-making process."
    }
    ,{
        factContent: "In 2006, Nestle removed all artificial dyes in its Smarties in the UK because of concern of the effects of chemical dyes on children’s health.  Blue Smarties were temporarily removed from the pack as Nestle searched for a natural blue dye alternative.  They were reintroduced in 2008 after the company developed a natural blue dye derived from the cyanobacterium spirulina."
    }
    ,{
        factContent: "1.5 million Cadbury Creme Eggs are produced every day at Cadbury’s Bournville factory in Birmingham, England."
    }
    ,{
        factContent: "Turkish Delight was launched in 1914 and though it has always been a popular confection, sales soared when the treat was included in part one of Disney’s adaptation of C.S. Lewis’ The Chronicles of Narnia."
    }
    ,{
        factContent: "Brits refer to sugar-based hard candies as “boiled sweets,” a reference to how the candy is made.  Most boiled sweets were originally sold in bulk at a sweet shop."
    }
    ,{
        factContent: "Walker’s Crisps are one of the bestselling potato chip brands in the UK.  Flavors include Ready Salted, Cheese & Onion, Salt & Vinegar, Steak & Onion, Smoky Bacon, Roast Chicken, Prawn Cocktail and Pickled Onion."
    }
    ,{
        factContent: "Though Cadbury’s may be the biggest name in the business, other major chocolate companies in the United Kingdom include Green and Black’s Organic Chocolate, Thornton’s, Mars, Nestle, Divine and Traidcraft."
    }
];
var photos = [ {
        "title" : "welcome to our store",
        "image" : "/img/gallery/g1.jpg",
        "scaleToFit": 1
    }, {
        "title" : "where your sure of a smile",
        "image" : "/img/gallery/g2.jpg",
        "scaleToFit" : 0
    }, {
        "title" : "and can send to a friend",
        "image" : "/img/gallery/g3.jpg",
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
            im.src = window.location.href + this.image.substring(1,this.image.length);
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
                $('.galleryImg').css('background-image','url(\'' + photos[lcc.currentImage].image + '\')').css(scaling.prop , scaling.val).fadeIn(1000,"swing",function(){
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
                $('.galleryImg').css('background-image','url(\'' + photos[lcc.currentImage].image + '\')').css(scaling.prop , scaling.val).fadeIn(1000,"swing",function(){
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
    }

}

