jQuery(function () {
    initMap();
});

function initMap() {
    jQuery('#map').myMap({
        coordinates: {
            lat: 50.0096231,
            lng: 36.2404606
        },
        zoom: 12,
        marker: true,
        contentString:
        '<div id="my-content">' +
        '<h1>THIS IS POP UP</h1>' +
        '<p>bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</p>' +
        '</div>',
        style: [
            {elementType: 'geometry', stylers: [{color: '#262231'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#262231'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#f5f3e6'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f5f3e6'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f5f3e6'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#26323e'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f5f3e6'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#aaa8a0'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });
}


;(function ($) {
    function MyMap(options) {
        this.options = $.extend({
            holder: '#map',
            btnClose: '.close-popup',
            realBtnClose: 'close-style',
            markerImg: 'marker.png',
            event: 'click',
            parentClass:'content-wrap',
            contentMarker:'#my-content',
            zoom: 4,
            coordinates: {
                lat: 49.9908952,
                lng: 36.22925
            },
            closeContent: '<span class="close-popup"></span>',
            marker: false
        }, options);
        this.init();
    }
    MyMap.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.openMap();
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
        },
        openMap: function () {
            var self = this;
            this.map = new google.maps.Map(self.holder[0], {
                zoom: self.options.zoom,
                center: self.options.coordinates,
                styles: self.options.style
            });
            this.options.marker ? this.openMarker() : 0;
            this.options.contentString ? this.addInfoWindow(): 0;
        },
        openMarker: function () {
            var self = this;
            this.marker = new google.maps.Marker({
                position: self.options.coordinates,
                map: self.map,
                icon: self.options.markerImg
            });
            this.openPopUp();
        },
        openPopUp: function () {
            var self = this;
            this.marker.addListener(self.options.event, function () {
                self.infoWindow.open(self.map, self.marker);
                var content = $(self.options.contentMarker).parent().parent().parent().parent().addClass(self.options.parentClass);
                $(content.children()[0]).hide();
                $(content.children()[2]).addClass(self.options.realBtnClose);
                self.closePopUp();
            });
        },
        closePopUp: function () {
            var self = this;
            $(this.options.btnClose).on(this.options.event, function () {
                $('.' + self.options.realBtnClose).trigger(self.options.event);
            });
        },
        addInfoWindow:function () {
            var self = this;
            this.infoWindow = new google.maps.InfoWindow({content: self.options.closeContent+self.options.contentString});
        },

        myCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
        }
    };
    // jquery plugin
    $.fn.myMap = function (opt) {
        return this.each(function () {
            $(this).data('MyMap', new MyMap($.extend({
                holder: this
            }, opt)));
        });
    };
}(jQuery));