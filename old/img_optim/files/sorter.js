function parseSubstitutions(substitutions) {
    substitutions = substitutions.split('\n');
    return substitutions.map(function (substitution) {
        var temp = substitution.split(';');
        var mask = new RegExp(temp[0], 'ig');
        var replacement = temp[1].split('::');
        return {mask: mask, replacement: replacement, weight: 0}
    })
}
function getMatchedSubstitutions(substitutions, keyword, weight) {
    var matchedSubstitutions = substitutions.map(function (substitution) {
        var matchWeight = keyword.match(substitution.mask) || [];
        substitution.weight += matchWeight.length * weight;
        return substitution;
    });

    return matchedSubstitutions.filter(function (substitution) {
        return substitution.weight !== 0;
    });
}
function positionCriterion(substitutions, keyword, weight) {
    var result;
    var keywords = keyword.split(' ');
    substitutions[0].mask.source.split('|').some(function (_, i) {
        var isMatched = substitutions.some(function (substitution) {
            var maskKeywords = substitution.mask.source.split('|');
            if (maskKeywords[i] === undefined) return false;
            return keyword.match(new RegExp(maskKeywords[i], 'ig'))
        });
        if (isMatched) {
            result = substitutions.map(function (substitution) {
                var maskKeywords = substitution.mask.source.split('|');
                if (keyword.match(new RegExp(maskKeywords[i], 'ig'))) {
                    substitution.weight += weight;
                    var index = 0, posWeight = 0, numberMatches = 1;
                    for (var j = 0, len = keywords.length; j < len; j++) {
                        index = keywords[j].indexOf(maskKeywords[i]);
                        if (index == 0) {
                            substitution.weight += (len - j);
                        }
                    }
                }
                return substitution;
            });
        }
        return isMatched;
    });
    return result;
}
function largestMaskCriterion(substitutions, keyword, weight) {
    var lengthMasks = substitutions.map(function (substitution) {
        var maskKeywords = substitution.mask.source.split('|');
        return Math.max.apply(null, maskKeywords.map(function (mask) {
            var match = keyword.match(new RegExp(mask, 'ig'));
            return match !== null ? mask.length : 0;
        }));
    });
    var maxLengthMask = Math.max.apply(null, lengthMasks);
    return substitutions.map(function (substitution, i) {
        if (lengthMasks[i] === maxLengthMask) {
            substitution.weight += weight;
        }
        return substitution;
    });
}
function earlyMatchCriterion(substitutions, keyword, weight) {
    var matchMatches = substitutions.map(function (substitution) {
        var maskKeywords = substitution.mask.source.split('|');
        return Math.min.apply(null, maskKeywords.map(function (mask) {
            var match = keyword.search(new RegExp(mask, 'ig'));
            return match !== -1 ? match : keyword.length;
        }));
    });
    var minPositionMatch = Math.min.apply(null, matchMatches);
    return substitutions.map(function (substitution, i) {
        if (matchMatches[i] === minPositionMatch) {
            substitution.weight += weight;
        }
        return substitution;
    });
}
function getPrimarySubstitution(substitutions) {
    var index = indexOfMaxElement(substitutions.map(function(substitution) { return substitution.weight }));
    return substitutions[index];
}
function indexOfMaxElement(array) {
    var index = 0;
    var max = array[index];
    array.forEach(function (item, i) {
        if (max < item) {
            max = item;
            index = i;
        }
    });
    return index;
}
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
};
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};
var utm_term = getURLParameter('utm_term') || getCookie('utm_term');
if (utm_term) {
    var substitutions = window.multilanding;
    var keyword = utm_term;
    var parsedSubstitutions = parseSubstitutions(substitutions);
    var substitutionsWithWeight = getMatchedSubstitutions(parsedSubstitutions, keyword, 10);
    var positionedSubstitutions = positionCriterion(substitutionsWithWeight, keyword, 10);
    var largestMaskSubstitutions = largestMaskCriterion(positionedSubstitutions, keyword, 2);
    var earlyMatchSubstitutions = earlyMatchCriterion(largestMaskSubstitutions, keyword, 1);
    var primary = getPrimarySubstitution(earlyMatchSubstitutions);
    //console.log(primary);
    if (!window._ua) { var _ua = navigator.userAgent.toLowerCase(); }
    var browser = {
        version: (_ua.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, '0'])[1],
        opera: (/opera/i.test(_ua) || /opr/i.test(_ua)),
        vivaldi: /vivaldi/i.test(_ua),
        msie: (/msie/i.test(_ua) && !/opera/i.test(_ua) || /trident\//i.test(_ua)) || /edge/i.test(_ua),
        msie6: (/msie 6/i.test(_ua) && !/opera/i.test(_ua)),
        msie7: (/msie 7/i.test(_ua) && !/opera/i.test(_ua)),
        msie8: (/msie 8/i.test(_ua) && !/opera/i.test(_ua)),
        msie9: (/msie 9/i.test(_ua) && !/opera/i.test(_ua)),
        msie_edge: (/edge/i.test(_ua) && !/opera/i.test(_ua)),
        mozilla: /firefox/i.test(_ua),
        chrome: /chrome/i.test(_ua) && !/edge/i.test(_ua),
        safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
        iphone: /iphone/i.test(_ua),
        ipod: /ipod/i.test(_ua),
        iphone4: /iphone.*OS 4/i.test(_ua),
        ipod4: /ipod.*OS 4/i.test(_ua),
        ipad: /ipad/i.test(_ua),
        android: /android/i.test(_ua),
        bada: /bada/i.test(_ua),
        mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(_ua),
        msie_mobile: /iemobile/i.test(_ua),
        safari_mobile: /iphone|ipod|ipad/i.test(_ua),
        opera_mobile: /opera mini|opera mobi/i.test(_ua),
        opera_mini: /opera mini/i.test(_ua),
        mac: /mac/i.test(_ua),
        search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(_ua)
    };
    var Page = {
        setStyle: function(elem, name, value) {
            elem = (typeof elem == 'string' || typeof elem == 'number') ? document.getElementById(elem) : elem;
            if (!elem) return;
            if (typeof name == 'object') return each(name, function(k, v) { this.setStyle(elem,k,v); });
            if (name == 'opacity') {
                if (browser.msie) {
                    if ((value + '').length) {
                        if (value !== 1) {
                            elem.style.filter = 'alpha(opacity=' + value * 100 + ')';
                        } else {
                            elem.style.filter = '';
                        }
                    } else {
                        elem.style.cssText = elem.style.cssText.replace(/filter\s*:[^;]*/gi, '');
                    }
                    elem.style.zoom = 1;
                };
                elem.style.opacity = value;
            } else {
                try{
                    var isN = typeof(value) == 'number';
                    if (isN && (/height|width/i).test(name)) value = Math.abs(value);
                    elem.style[name] = isN && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name) ? value + 'px' : value;
                } catch(e){console.log('setStyle error: ', [name, value], e);}
            }

        },
        getHTML: function() {
            return document.getElementsByTagName('html')[0];
        },
        hidden: function() {
            if(browser.search_bot) return;
            setTimeout(this.setStyle(this.getHTML(), 'opacity', 0), 0);
        },
        visible: function() {
            if(browser.search_bot) return;
            this.setStyle(this.getHTML(), 'opacity', 1);
        }
    };
    Page.hidden();
    jQuery(document).ready(function() {
        var replacement = primary.replacement;
        // replacement[0] - аЗаАаГаОаЛаОаВаОаК аВаВаЕббб
        // replacement[1] - аЗаАаГаОаЛаОаВаОаК аВаНаИаЗб
        // replacement[2] - аГаАбаАаНбаИб
        // replacement[3] - аБбаЛаИб аВаВаЕббб / аВаНаИаЗб
        // replacement[4] - аКаАббаИаНаКаА аОббаЕбаА
        // replacement[5] - аПбаЕаИаМббаЕббаВаА
        // replacement[6] - аПбаАаЙб аВбаЕаДаИбаЕаЛб
        // replacement[7] - аПбаАаЙб аМаЕббаО
        // replacement[8] - аБбаЕаМ баОбаНаО аВ баЕаЛб tab
        // replacement[9] - аБбаЕаМ баОбаНаО аВ баЕаЛб content
        // replacement[10] - аПаОаДаАбаОаК
        // replacement[11] - аАаКбаИб баНаИббаОаЖббаЕ аВбаЕ аВбаЕаДаИбаЕаЛаЕаЙ
        // replacement[12] - аВаОаПбаОбб
        // replacement[13] - аАаКбаИб аКаЛаИаНаИаНаГ
        // replacement[14] - баАаЙаМаЕб
        // replacement[15] - баИаПб аПаОаМаЕбаЕаНаИаЙ
        // replacement[16] - аБаЛаАаГаОаДаАбббаВаЕаНаНбаЕ аПаИббаМаА
        // replacement[17] - аЛаОаГаОбаИаПб аКаЛаИаЕаНбаОаВ

        $('.offer-title').html(replacement[0].replace(/_/g, '&nbsp;')); // аЗаАаГаОаЛаОаВаОаК аВаВаЕббб
        $('#services .section-title').html(replacement[1]); // аЗаАаГаОаЛаОаВаОаК аВаНаИаЗб
        $('.offer-subtitle').html(replacement[2]); // аГаАбаАаНбаИб
        var bullets = replacement[3].split('#');
        $('ul.offer-list, #services ul').html('<li><span>' + bullets.join('</span></li><li><span>') + '</span></li>'); // аБбаЛаИб аВаВаЕббб / аВаНаИаЗб
        $('.offer-image').html('<img src="images/offer/' + replacement[4] + '" alt="ааИаКаВаИаДаАбаИб аВбаЕаДаИбаЕаЛаЕаЙ">'); // аКаАббаИаНаКаА аОббаЕбаА
        advantages(replacement[5]); // аПбаЕаИаМббаЕббаВаА
        price(replacement[6], replacement[7]); // аПбаАаЙб
        book(replacement[8], replacement[9]); // аБбаЕаМ баОбаНаО аВ баЕаЛб
        window.present = replacement[10]; // аПаОаДаАбаОаК
        
        if(replacement[11] == 'hidden') {
            $('#suboffer2').hide(); // аАаКбаИб баНаИббаОаЖббаЕ аВбаЕ аВбаЕаДаИбаЕаЛаЕаЙ
        } else {
             $('#suboffer2').show();
        }

        if(replacement[12] == 'hidden') {
            $('#faq').hide(); // аВаОаПбаОбб
        } else {
            $('#faq').show();
        }

        if(replacement[13] == 'hidden') {
            $('#suboffer3').hide(); // аАаКбаИб аКаЛаИаНаИаНаГ
        } else {
            $('#suboffer3').show();
        }

        if(replacement[14] == 'hidden') {
            $('#counter').hide(); // баАаЙаМаЕб
        } else {
            $('#counter').show();
        }

        if(replacement[15] == 'hidden') {
            $('#disinfection').hide(); // баИаПб аПаОаМаЕбаЕаНаИаЙ
        } else {
            $('#disinfection').show();
        }

        if(replacement[16] == 'hidden') {
            $('#emails').hide(); // аБаЛаАаГаОаДаАбббаВаЕаНаНбаЕ аПаИббаМаА
        } else {
            $('#emails').show();
        }

        if(replacement[16] == 'hidden') {
            $('#clients').hide(); // аБаЛаАаГаОаДаАбббаВаЕаНаНбаЕ аПаИббаМаА
        } else {
            $('#clients').show();
        }

        function advantages(replacement) {
            var blocks = replacement.split('##');
            var items = $('.advantage-item');

            for (var i = 0, len = blocks.length; i < len; i++) {
                var block = blocks[i].split('#');
                items.eq(i).find('.advantage-image').html('<img src="images/advantages/' + block[0] + '" alt="ааИаКаВаИаДаАбаИб аВбаЕаДаИбаЕаЛаЕаЙ">');
                items.eq(i).find('.advantage-title').html('<h3>' + block[1] + '</h3>');
                items.eq(i).find('p').html(block[2]);
            }
        };

        function price(pest, place) {
            window.price = {
                pest: pest,
                place: place
            }
        };

        function book(tab, content) {
            $('#book-sheet li').eq(tab).children('a').tab('show');
            $('#pest' + tab + content + ' a').tab('show');
        };

        Page.visible();
    });
}