
    var e, t, n, i;
    n = function(e, n) {
        var i;
        return i = new ymaps.SuggestView('finder', {width: '362'}),
            // self = map;
            // //Подписываемся на событие SELECT
              i.events.add("select", function(r) {
                console.log(r.get('item').value);
                ymaps.geocode(r.get('item').value).then(function (res) {
                    var o;
                    var s = res.geoObjects.get(0);
                    o = s.geometry.getCoordinates(), t(e, n, o, !0); 
                })
        })
    }, t = function(e, t, n, r) {
        var o, a;
        return a = function(t) {
            return e.geoObjects.removeAll(), e.geoObjects.add(t), i(t.getLength())
        }, o = function(e) {
            return console.log(e)
        }, ymaps.route([t, n], {
            mapStateAutoApply: r
        }).then(a, o)
    }, e = function(e) {
        return new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: e
            }
        })
    }, i = function(e) {
        var t, n, i, r, o, a;
        return n = 60, r = 15e3, i = Math.round(e / 1e3), t = i * n, a = 100 * Math.floor(t / 100), o = Math.max(r, a), 
        
        $(".map .price .left span").text(o + " \u0440\u0443\u0431"),
        $(".map .price .right span").text(i + " \u043a\u043c")
    }, window.init_map = function() {
        var i, r;
        if ($("#map-canvas").length) return i = [58.5983515, 35.8193443], window.map = r = new ymaps.Map("map-canvas", {
            center: i,
            zoom: 10,
            controls: []
        }), r.geoObjects.add(e(i)), r.behaviors.enable("scrollZoom"), r.events.add("click", function(n) {
            var o;
            return o = e(n.get("coords")), r.geoObjects.add(o), t(r, i, n.get("coords"), !1)
        }),
        r.controls.add(new ymaps.control.ZoomControl({
            options: {
                position: {
                    right: 30,
                    bottom: 50
                }
            }
        })),
        n(r, i)
    }