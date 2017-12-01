jQuery.noConflict();
(function($) {
    var curSite = document.domain;

    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (typeof haystack[i] == 'object') {
                if (arrayCompare(haystack[i], needle)) return true;
            } else {
                if (haystack[i] == needle) return true;
            }
        }
        return false;
    }
    window.isset = function(v) {
        if (typeof(v) == 'object' && v == 'undefined') {
            return false;
        } else if (arguments.length === 0) {
            return false;
        } else {
            var buff = arguments[0];
            for (var i = 0; i < arguments.length; i++) {
                if (typeof(buff) === 'undefined' || buff === null) return false;
                buff = buff[arguments[i + 1]];
            }
        }
        return true;
    }

    function myconf() {
        
        var cf = $.Deferred();

        $.ajax({
            type: 'POST',
            url: 'http://' + curSite + '/feedback/',
            dataType: 'json',
            data: 'act=cfg',
            success: function(answer) {
                cf.resolve(answer.configs);
            }
        });

        return cf;

    }

    var mcf = myconf();
    mcf.done(function(conf) {
        $(document).ready(function() {
            (function() {
                var fb = $('.feedback');
                if (fb.length > 0) {
                    fb.each(function() {
                        var form = $(this).closest('form'),
                            name = form.attr('name');
                        if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
                            $(form).prepend('<input type="text" name="' + conf[name].cfg.antispamjs + '" value="tesby" style="display:none;">');
                        }
                    });
                }
            })();
        });

        function feedback(vars) {
            var bt = $(vars.form).find('.feedback');
            var btc = bt.clone();
            var bvc = bt.val();
            var cfg = conf[vars.act].cfg;
            $.ajax({
                type: 'POST',
                url: 'http://' + curSite + '/feedback/',
                cache: false,
                dataType: 'json',
                data: 'act=' + vars.act + '&' + vars.data,
                beforeSend: function() {
                    $(bt).prop("disabled", true);
                    $(bt).addClass('loading');
                },
                success: function(answer) {
                    if (isset(cfg.notify) && !/none/i.test(cfg.notify)) {
                        if (/textbox/i.test(cfg.notify)) {
                            if (isset(answer.errors)) {
                                $.each(answer.errors, function(k, val) {
                                    $.jGrowl(val, {
                                        theme: 'error',
                                        header: 'Ошибка!',
                                        life: 3000
                                    });
                                });
                            }
                            if (isset(answer.infos)) {
                                $.each(answer.infos, function(k, val) {
                                    $.jGrowl(val, {
                                        theme: 'infos',
                                        header: 'Внимание!',
                                        life: 3000
                                    });
                                });
                            }
                        }
                        if (/color/i.test(cfg.notify)) {
                            $(vars.form).find('input[type=text]:visible, textarea:visible, select:visible').css({
                                'border': '1px solid #D7D5CF'
                            }, 300);
                            if (isset(answer.errors)) {
                                $.each(answer.errors, function(k, val) {
                                    var reg = /[a-z]/i;
                                    if (reg.test(k)) {
                                        var e = $(vars.form).find('[name=' + k + ']');
                                        if (e.length == 1) {
                                            $(e).css({
                                                'border': '1px solid #FF532E'
                                            }, 100);
                                        }
                                    }
                                });
                            }
                            if (isset(answer.infos)) {
                                var li = '',
                                    $inf = $('<ul>', {
                                        id: 'feedback-infolist'
                                    });
                                $.each(answer.infos, function(k, val) {
                                    li += '<li>' + val + '</li>';
                                });
                                $inf.html(li);
                                $.arcticmodal('close');
                                if ((vars.data.search('Exit_Win') != -1)) {
                                    //yaCounter40513390.reachGoal('exitWin');
                                    location.href = '/katalog_tipovyh_proektov.pdf';
                                    $("*").click(function(event) {});
                                };
                                if ((vars.data.search('qside') != -1)) {
                                    //yaCounter40513390.reachGoal('QSIDE');
                                };
                                if ($("input.q5").val() != "") {
                                    //yaCounter40513390.reachGoal('ORDER');
                                    location.href = 'http://barbecue-black.ru/activation.php';
                                }
                                if (/modal/i.test(cfg.notify)) {
                                    var m = $('<div class="box-modal" id="feedback-modal-box" />');
                                    m.html($inf);
                                    m.prepend('<div class="modal-close arcticmodal-close">X</div>');
                                    $.arcticmodal({
                                        content: m
                                    });
                                }
                            }
                        }
                    }
                    $(bt).prop("disabled", false);
                    $(bt).removeClass('loading');
                    if (isset(answer.ok) && answer.ok == 1) {
                        $(vars.form)[0].reset();
                    }
                }
            });
        }

        $(document).on('mouseenter mouseover', '.feedback', function() {
            var form = $(this).closest('form'),
                name = form.attr('name');
            if (isset(conf[name]) && isset(conf[name].cfg.antispamjs)) {
                $('input[name=' + conf[name].cfg.antispamjs + ']').val('');
            }
        });
        $(document).on('click', '.feedback', function() {
            var form = $(this).closest('form'),
                name = form.attr('name'),
                obj = {};
            obj.form = form;
            obj.act = name;
            obj.data = $(form).serialize();
            feedback(obj);
            return false;
        });
    });
})(jQuery);;
(function($) {
    var default_options = {
        type: 'html',
        content: '',
        url: '',
        ajax: {},
        ajax_request: null,
        closeOnEsc: true,
        closeOnOverlayClick: true,
        clone: false,
        overlay: {
            block: undefined,
            tpl: '<div class="arcticmodal-overlay"></div>',
            css: {
                backgroundColor: '#000',
                opacity: .6
            }
        },
        container: {
            block: undefined,
            tpl: '<div class="arcticmodal-container"><table class="arcticmodal-container_i"><tr><td class="arcticmodal-container_i2"></td></tr></table></div>'
        },
        wrap: undefined,
        body: undefined,
        errors: {
            tpl: '<div class="arcticmodal-error arcticmodal-close"></div>',
            autoclose_delay: 2000,
            ajax_unsuccessful_load: 'Error'
        },
        openEffect: {
            type: 'fade',
            speed: 400
        },
        closeEffect: {
            type: 'fade',
            speed: 400
        },
        beforeOpen: $.noop,
        afterOpen: $.noop,
        beforeClose: $.noop,
        afterClose: $.noop,
        afterLoading: $.noop,
        afterLoadingOnShow: $.noop,
        errorLoading: $.noop
    };
    var modalID = 0;
    var modals = $([]);
    var utils = {
        isEventOut: function(blocks, e) {
            var r = true;
            $(blocks).each(function() {
                if ($(e.target).get(0) == $(this).get(0)) r = false;
                if ($(e.target).closest('HTML', $(this).get(0)).length == 0) r = false;
            });
            return r;
        }
    };
    var modal = {
        getParentEl: function(el) {
            var r = $(el);
            if (r.data('arcticmodal')) return r;
            r = $(el).closest('.arcticmodal-container').data('arcticmodalParentEl');
            if (r) return r;
            return false;
        },
        transition: function(el, action, options, callback) {
            callback = callback == undefined ? $.noop : callback;
            switch (options.type) {
                case 'fade':
                    action == 'show' ? el.fadeIn(options.speed, callback) : el.fadeOut(options.speed, callback);
                    break;
                case 'none':
                    action == 'show' ? el.show() : el.hide();
                    callback();
                    break;
            }
        },
        prepare_body: function(D, $this) {
            $('.arcticmodal-close', D.body).unbind('click.arcticmodal').bind('click.arcticmodal', function() {
                $this.arcticmodal('close');
                return false;
            });
        },
        init_el: function($this, options) {
            var D = $this.data('arcticmodal');
            if (D) return;
            D = options;
            modalID++;
            D.modalID = modalID;
            D.overlay.block = $(D.overlay.tpl);
            D.overlay.block.css(D.overlay.css);
            D.container.block = $(D.container.tpl);
            D.body = $('.arcticmodal-container_i2', D.container.block);
            if (options.clone) {
                D.body.html($this.clone(true));
            } else {
                $this.before('<div id="arcticmodalReserve' + D.modalID + '" style="display: none" />');
                D.body.html($this);
            }
            modal.prepare_body(D, $this);
            if (D.closeOnOverlayClick)
                D.overlay.block.add(D.container.block).click(function(e) {
                    if (utils.isEventOut($('>*', D.body), e))
                        $this.arcticmodal('close');
                });
            D.container.block.data('arcticmodalParentEl', $this);
            $this.data('arcticmodal', D);
            modals = $.merge(modals, $this);
            $.proxy(actions.show, $this)();
            if (D.type == 'html') return $this;
            if (D.ajax.beforeSend != undefined) {
                var fn_beforeSend = D.ajax.beforeSend;
                delete D.ajax.beforeSend;
            }
            if (D.ajax.success != undefined) {
                var fn_success = D.ajax.success;
                delete D.ajax.success;
            }
            if (D.ajax.error != undefined) {
                var fn_error = D.ajax.error;
                delete D.ajax.error;
            }
            var o = $.extend(true, {
                url: D.url,
                beforeSend: function() {
                    if (fn_beforeSend == undefined) {
                        D.body.html('<div class="arcticmodal-loading" />');
                    } else {
                        fn_beforeSend(D, $this);
                    }
                },
                success: function(responce) {
                    $this.trigger('afterLoading');
                    D.afterLoading(D, $this, responce);
                    if (fn_success == undefined) {
                        D.body.html(responce);
                    } else {
                        fn_success(D, $this, responce);
                    }
                    modal.prepare_body(D, $this);
                    $this.trigger('afterLoadingOnShow');
                    D.afterLoadingOnShow(D, $this, responce);
                },
                error: function() {
                    $this.trigger('errorLoading');
                    D.errorLoading(D, $this);
                    if (fn_error == undefined) {
                        D.body.html(D.errors.tpl);
                        $('.arcticmodal-error', D.body).html(D.errors.ajax_unsuccessful_load);
                        $('.arcticmodal-close', D.body).click(function() {
                            $this.arcticmodal('close');
                            return false;
                        });
                        if (D.errors.autoclose_delay)
                            setTimeout(function() {
                                $this.arcticmodal('close');
                            }, D.errors.autoclose_delay);
                    } else {
                        fn_error(D, $this);
                    }
                }
            }, D.ajax);
            D.ajax_request = $.ajax(o);
            $this.data('arcticmodal', D);
        },
        init: function(options) {
            options = $.extend(true, {}, default_options, options);
            if ($.isFunction(this)) {
                if (options == undefined) {
                    $.error('jquery.arcticmodal: Uncorrect parameters');
                    return;
                }
                if (options.type == '') {
                    $.error('jquery.arcticmodal: Don\'t set parameter "type"');
                    return;
                }
                switch (options.type) {
                    case 'html':
                        if (options.content == '') {
                            $.error('jquery.arcticmodal: Don\'t set parameter "content"');
                            return
                        }
                        var c = options.content;
                        options.content = '';
                        return modal.init_el($(c), options);
                        break;
                    case 'ajax':
                        if (options.url == '') {
                            $.error('jquery.arcticmodal: Don\'t set parameter "url"');
                            return;
                        }
                        return modal.init_el($('<div />'), options);
                        break;
                }
            } else {
                return this.each(function() {
                    modal.init_el($(this), $.extend(true, {}, options));
                });
            }
        }
    };
    var actions = {
        show: function() {
            var $this = modal.getParentEl(this);
            if ($this === false) {
                $.error('jquery.arcticmodal: Uncorrect call');
                return;
            }
            var D = $this.data('arcticmodal');
            D.overlay.block.hide();
            D.container.block.hide();
            $('BODY').append(D.overlay.block);
            $('BODY').append(D.container.block);
            D.beforeOpen(D, $this);
            $this.trigger('beforeOpen');
            if (D.wrap.css('overflow') != 'hidden') {
                D.wrap.data('arcticmodalOverflow', D.wrap.css('overflow'));
                var w1 = D.wrap.outerWidth(true);
                D.wrap.css('overflow', 'hidden');
                var w2 = D.wrap.outerWidth(true);
                if (w2 != w1)
                    D.wrap.css('marginRight', (w2 - w1) + 'px');
            }
            modals.not($this).each(function() {
                var d = $(this).data('arcticmodal');
                d.overlay.block.hide();
            });
            modal.transition(D.overlay.block, 'show', modals.length > 1 ? {
                type: 'none'
            } : D.openEffect);
            modal.transition(D.container.block, 'show', modals.length > 1 ? {
                type: 'none'
            } : D.openEffect, function() {
                D.afterOpen(D, $this);
                $this.trigger('afterOpen');
            });
            return $this;
        },
        close: function() {
            if ($.isFunction(this)) {
                modals.each(function() {
                    $(this).arcticmodal('close');
                });
            } else {
                return this.each(function() {
                    var $this = modal.getParentEl(this);
                    if ($this === false) {
                        $.error('jquery.arcticmodal: Uncorrect call');
                        return;
                    }
                    var D = $this.data('arcticmodal');
                    if (D.beforeClose(D, $this) === false) return;
                    $this.trigger('beforeClose');
                    modals.not($this).last().each(function() {
                        var d = $(this).data('arcticmodal');
                        d.overlay.block.show();
                    });
                    modal.transition(D.overlay.block, 'hide', modals.length > 1 ? {
                        type: 'none'
                    } : D.closeEffect);
                    modal.transition(D.container.block, 'hide', modals.length > 1 ? {
                        type: 'none'
                    } : D.closeEffect, function() {
                        D.afterClose(D, $this);
                        $this.trigger('afterClose');
                        if (!D.clone)
                            $('#arcticmodalReserve' + D.modalID).replaceWith(D.body.find('>*'));
                        D.overlay.block.remove();
                        D.container.block.remove();
                        $this.data('arcticmodal', null);
                        if (!$('.arcticmodal-container').length) {
                            if (D.wrap.data('arcticmodalOverflow'))
                                D.wrap.css('overflow', D.wrap.data('arcticmodalOverflow'));
                            D.wrap.css('marginRight', 0);
                        }
                    });
                    if (D.type == 'ajax')
                        D.ajax_request.abort();
                    modals = modals.not($this);
                });
            }
        },
        setDefault: function(options) {
            $.extend(true, default_options, options);
        }
    };
    $(function() {
        default_options.wrap = $((document.all && !document.querySelector) ? 'html' : 'body');
    });
    $(document).bind('keyup.arcticmodal', function(e) {
        var m = modals.last();
        if (!m.length) return;
        var D = m.data('arcticmodal');
        if (D.closeOnEsc && (e.keyCode === 27))
            m.arcticmodal('close');
    });
    $.arcticmodal = $.fn.arcticmodal = function(method) {
        if (actions[method]) {
            return actions[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return modal.init.apply(this, arguments);
        } else {
            $.error('jquery.arcticmodal: Method ' + method + ' does not exist');
        }
    };
})(jQuery);;
(function($) {
    var $ie6 = (function() {
        return false === $.support.boxModel && $.support.objectAll && $support.leadingWhitespace;
    })();
    $.jGrowl = function(m, o) {
        if ($('#jGrowl').size() == 0)
            $('<div id="jGrowl"></div>').addClass((o && o.position) ? o.position : $.jGrowl.defaults.position).appendTo('body');
        $('#jGrowl').jGrowl(m, o);
    };
    $.fn.jGrowl = function(m, o) {
        if ($.isFunction(this.each)) {
            var args = arguments;
            return this.each(function() {
                var self = this;
                if ($(this).data('jGrowl.instance') == undefined) {
                    $(this).data('jGrowl.instance', $.extend(new $.fn.jGrowl(), {
                        notifications: [],
                        element: null,
                        interval: null
                    }));
                    $(this).data('jGrowl.instance').startup(this);
                }
                if ($.isFunction($(this).data('jGrowl.instance')[m])) {
                    $(this).data('jGrowl.instance')[m].apply($(this).data('jGrowl.instance'), $.makeArray(args).slice(1));
                } else {
                    $(this).data('jGrowl.instance').create(m, o);
                }
            });
        };
    };
    $.extend($.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: '',
            group: '',
            sticky: false,
            position: 'top-right',
            glue: 'after',
            theme: 'default',
            themeState: '',
            corners: '10px',
            check: 250,
            life: 3000,
            closeDuration: 'normal',
            openDuration: 'normal',
            easing: 'swing',
            closer: true,
            closeTemplate: '&times;',
            closerTemplate: '<div>[ close all ]</div>',
            log: function(e, m, o) {},
            beforeOpen: function(e, m, o) {},
            afterOpen: function(e, m, o) {},
            open: function(e, m, o) {},
            beforeClose: function(e, m, o) {},
            close: function(e, m, o) {},
            animateOpen: {
                opacity: 'show'
            },
            animateClose: {
                opacity: 'hide'
            }
        },
        notifications: [],
        element: null,
        interval: null,
        create: function(message, o) {
            var o = $.extend({}, this.defaults, o);
            if (typeof o.speed !== 'undefined') {
                o.openDuration = o.speed;
                o.closeDuration = o.speed;
            }
            this.notifications.push({
                message: message,
                options: o
            });
            o.log.apply(this.element, [this.element, message, o]);
        },
        render: function(notification) {
            var self = this;
            var message = notification.message;
            var o = notification.options;
            o.themeState = (o.themeState == '') ? '' : 'ui-state-' + o.themeState;
            var notification = $('<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' +
                ((o.group != undefined && o.group != '') ? ' ' + o.group : '') + '">' + '<div class="jGrowl-close">' + o.closeTemplate + '</div>' + '<div class="jGrowl-header">' + o.header + '</div>' + '<div class="jGrowl-message">' + message + '</div></div>').data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl", function() {
                $(this).parent().trigger('jGrowl.close');
            }).parent();
            $(notification).bind("mouseover.jGrowl", function() {
                $('div.jGrowl-notification', self.element).data("jGrowl.pause", true);
            }).bind("mouseout.jGrowl", function() {
                $('div.jGrowl-notification', self.element).data("jGrowl.pause", false);
            }).bind('jGrowl.beforeOpen', function() {
                if (o.beforeOpen.apply(notification, [notification, message, o, self.element]) != false) {
                    $(this).trigger('jGrowl.open');
                }
            }).bind('jGrowl.open', function() {
                if (o.open.apply(notification, [notification, message, o, self.element]) != false) {
                    if (o.glue == 'after') {
                        $('div.jGrowl-notification:last', self.element).after(notification);
                    } else {
                        $('div.jGrowl-notification:first', self.element).before(notification);
                    }
                    $(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
                        if ($.support.opacity === false)
                            this.style.removeAttribute('filter');
                        if ($(this).data("jGrowl") != null)
                            $(this).data("jGrowl").created = new Date();
                        $(this).trigger('jGrowl.afterOpen');
                    });
                }
            }).bind('jGrowl.afterOpen', function() {
                o.afterOpen.apply(notification, [notification, message, o, self.element]);
            }).bind('jGrowl.beforeClose', function() {
                if (o.beforeClose.apply(notification, [notification, message, o, self.element]) != false)
                    $(this).trigger('jGrowl.close');
            }).bind('jGrowl.close', function() {
                $(this).data('jGrowl.pause', true);
                $(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
                    if ($.isFunction(o.close)) {
                        if (o.close.apply(notification, [notification, message, o, self.element]) !== false)
                            $(this).remove();
                    } else {
                        $(this).remove();
                    }
                });
            }).trigger('jGrowl.beforeOpen');
            if (o.corners != '' && $.fn.corner != undefined) $(notification).corner(o.corners);
            if ($('div.jGrowl-notification:parent', self.element).size() > 1 && $('div.jGrowl-closer', self.element).size() == 0 && this.defaults.closer != false) {
                $(this.defaults.closerTemplate).addClass('jGrowl-closer ' + this.defaults.themeState + ' ui-corner-all').addClass(this.defaults.theme).appendTo(self.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
                    $(this).siblings().trigger("jGrowl.beforeClose");
                    if ($.isFunction(self.defaults.closer)) {
                        self.defaults.closer.apply($(this).parent()[0], [$(this).parent()[0]]);
                    }
                });
            };
        },
        update: function() {
            $(this.element).find('div.jGrowl-notification:parent').each(function() {
                if ($(this).data("jGrowl") != undefined && $(this).data("jGrowl").created != undefined && ($(this).data("jGrowl").created.getTime() + parseInt($(this).data("jGrowl").life)) < (new Date()).getTime() && $(this).data("jGrowl").sticky != true && ($(this).data("jGrowl.pause") == undefined || $(this).data("jGrowl.pause") != true)) {
                    $(this).trigger('jGrowl.beforeClose');
                }
            });
            if (this.notifications.length > 0 && (this.defaults.pool == 0 || $(this.element).find('div.jGrowl-notification:parent').size() < this.defaults.pool))
                this.render(this.notifications.shift());
            if ($(this.element).find('div.jGrowl-notification:parent').size() < 2) {
                $(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
                    $(this).remove();
                });
            }
        },
        startup: function(e) {
            this.element = $(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');
            this.interval = setInterval(function() {
                $(e).data('jGrowl.instance').update();
            }, parseInt(this.defaults.check));
            if ($ie6) {
                $(this.element).addClass('ie6');
            }
        },
        shutdown: function() {
            $(this.element).removeClass('jGrowl').find('div.jGrowl-notification').remove();
            clearInterval(this.interval);
        },
        close: function() {
            $(this.element).find('div.jGrowl-notification').each(function() {
                $(this).trigger('jGrowl.beforeClose');
            });
        }
    });
    $.jGrowl.defaults = $.fn.jGrowl.prototype.defaults;
})(jQuery);;
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.5", d.TRANSITION_DURATION = 150, d.prototype.close = function(b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.5", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function() {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function(a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function(a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function(a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function() {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    };
    var e = function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.5", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function() {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function(a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function() {
            var d = a(this),
                e = b(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f))))
        }))
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.5", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");
            if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);
            if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");
                if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);
                if (i.length) {
                    var j = i.index(c.target);
                    38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            d.$element.one("mouseup.dismiss.bs.modal", function(b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function() {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function() {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function() {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function() {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.isInStateTrue = function() {
        for (var a in this.inState)
            if (this.inState[a]) return !0;
        return !1
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), c.isInStateTrue() ? void 0 : (clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide())
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);
                h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var p = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(p, h);
            var q = function() {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function(b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
                top: 0,
                left: 0
            } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        var a = this;
        clearTimeout(this.timeout), this.hide(function() {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.5", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.5", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")),
            d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function() {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.5", c.TRANSITION_DURATION = 150, c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function() {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    };
    var e = function(c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.5", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function(a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);;
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s];
                if (null !== a.triggerPoint) {
                    var l = o.oldScroll < a.triggerPoint,
                        h = o.newScroll >= a.triggerPoint,
                        p = l && h,
                        u = !l && !h;
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();;
(function() {
    var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };

    Util = (function() {
        function Util() {}

        Util.prototype.extend = function(custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function(agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };

        Util.prototype.createEvent = function(event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function(elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if (("on" + event) in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function(elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function(elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function() {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;

    })();

    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }

        WeakMap.prototype.get = function(key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };

        WeakMap.prototype.set = function(key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };

        return WeakMap;

    })());

    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn('MutationObserver is not supported by your browser.');
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
            }
        }

        MutationObserver.notSupported = true;

        MutationObserver.prototype.observe = function() {};

        return MutationObserver;

    })());

    getComputedStyle = this.getComputedStyle || function(el, pseudo) {
        this.getPropertyValue = function(prop) {
            var ref;
            if (prop === 'float') {
                prop = 'styleFloat';
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function(_, _char) {
                    return _char.toUpperCase();
                });
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
        };
        return this;
    };

    getComputedStyleRX = /(\-([a-z]){1})/g;

    this.WOW = (function() {
        WOW.prototype.defaults = {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: null
        };

        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            this.animationNameCache = new WeakMap();
            this.wowEvent = this.util().createEvent(this.config.boxClass);
        }

        WOW.prototype.init = function() {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };

        WOW.prototype.start = function() {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = (function() {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            this.all = (function() {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true);
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(window, 'scroll', this.scrollHandler);
                this.util().addEvent(window, 'resize', this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50);
            }
            if (this.config.live) {
                return new MutationObserver((function(_this) {
                    return function(records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push((function() {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node));
                                }
                                return results1;
                            }).call(_this));
                        }
                        return results;
                    };
                })(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };

        WOW.prototype.stop = function() {
            this.stopped = true;
            this.util().removeEvent(window, 'scroll', this.scrollHandler);
            this.util().removeEvent(window, 'resize', this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };

        WOW.prototype.sync = function(element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };

        WOW.prototype.doSync = function(element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element;
            }
            if (element.nodeType !== 1) {
                return;
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle();
                    } else {
                        this.applyStyle(box, true);
                    }
                    results.push(this.scrolled = true);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        WOW.prototype.show = function(box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box);
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, 'animationend', this.resetAnimation);
            this.util().addEvent(box, 'oanimationend', this.resetAnimation);
            this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
            this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
            return box;
        };

        WOW.prototype.applyStyle = function(box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute('data-wow-duration');
            delay = box.getAttribute('data-wow-delay');
            iteration = box.getAttribute('data-wow-iteration');
            return this.animate((function(_this) {
                return function() {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            })(this));
        };

        WOW.prototype.animate = (function() {
            if ('requestAnimationFrame' in window) {
                return function(callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function(callback) {
                    return callback();
                };
            }
        })();

        WOW.prototype.resetStyle = function() {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = 'visible');
            }
            return results;
        };

        WOW.prototype.resetAnimation = function(event) {
            var target;
            if (event.type.toLowerCase().indexOf('animationend') >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, '').trim();
            }
        };

        WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };

        WOW.prototype.vendors = ["moz", "webkit"];

        WOW.prototype.vendorSet = function(elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push((function() {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
                    }
                    return results1;
                }).call(this));
            }
            return results;
        };

        WOW.prototype.vendorCSS = function(elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };

        WOW.prototype.animationName = function(box) {
            var animationName;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (_error) {
                animationName = getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };

        WOW.prototype.cacheAnimationName = function(box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };

        WOW.prototype.cachedAnimationName = function(box) {
            return this.animationNameCache.get(box);
        };

        WOW.prototype.scrollHandler = function() {
            return this.scrolled = true;
        };

        WOW.prototype.scrollCallback = function() {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = (function() {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!(box)) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        results.push(box);
                    }
                    return results;
                }).call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };

        WOW.prototype.offsetTop = function(element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };

        WOW.prototype.isVisible = function(box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute('data-wow-offset') || this.config.offset;
            viewTop = window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };

        WOW.prototype.util = function() {
            return this._util != null ? this._util : this._util = new Util();
        };

        WOW.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };

        return WOW;

    })();

}).call(this);;
! function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    var caretTimeoutId, ua = navigator.userAgent,
        iPhone = /iphone/i.test(ua),
        chrome = /chrome/i.test(ua),
        android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin, this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select());
            })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), {
                begin: begin,
                end: end
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length, firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])), null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
            }), this.trigger("unmask").each(function() {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++)
                            if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                        settings.completed.call(input);
                    }
                }

                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }

                function seekNext(pos) {
                    for (; ++pos < len && !tests[pos];);
                    return pos;
                }

                function seekPrev(pos) {
                    for (; --pos >= 0 && !tests[pos];);
                    return pos;
                }

                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++)
                            if (tests[i]) {
                                if (!(len > j && tests[i].test(buffer[j]))) break;
                                buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                            }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }

                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++)
                        if (tests[i]) {
                            if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                            c = t;
                        }
                }

                function androidInputEvent() {
                    var curVal = input.val(),
                        pos = input.caret();
                    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1];) pos.begin--;
                        if (0 === pos.begin)
                            for (; pos.begin < firstNonMaskPos && !tests[pos.begin];) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin];) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }

                function blurEvent() {
                    checkVal(), input.val() != focusText && input.change();
                }

                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(), begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1), end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1), e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText), input.caret(0, checkVal()), e.preventDefault());
                    }
                }

                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode,
                            pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)), p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                    var proxy = function() {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }

                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                }

                function writeBuffer() {
                    input.val(buffer.join(""));
                }

                function checkVal(allow) {
                    var i, c, pos, test = input.val(),
                        lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++)
                        if (tests[i]) {
                            for (buffer[i] = getPlaceholder(i); pos++ < test.length;)
                                if (c = test.charAt(pos - 1), tests[i].test(c)) {
                                    buffer[i] = c, lastMatch = i;
                                    break;
                                }
                            if (pos > test.length) {
                                clearBuffer(i + 1, len);
                                break;
                            }
                        } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""), clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))), partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this),
                    buffer = $.map(mask.split(""), function(c, i) {
                        return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                    }),
                    defaultBuffer = buffer.join(""),
                    focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }), input.one("unmask", function() {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function() {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                            input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                    input.prop("readonly") || setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos), tryFireCompleted();
                    }, 0);
                }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent), checkVal();
            });
        }
    });
});;
(function() {
    var guid = 0;
    var exitModalObj = function(element, options) {
        this.guid = guid++;
        this.settings = jQuery.extend({}, exitModalInterface.defaults, options);
        this.jQueryelement = jQuery(element);
        this.showCounter = 0;
        this.eventPrefix = '.exitModal' + this.guid;
        this.modalShowEvent = 'show.bs.modal' + this.eventPrefix;
        this.modalShownEvent = 'shown.bs.modal' + this.eventPrefix;
        this.modalHideEvent = 'hide.bs.modal' + this.eventPrefix;
        this.modalHiddenEvent = 'hidden.bs.modal' + this.eventPrefix;
    }
    exitModalObj.prototype = {
        init: function() {
            var plugin = this;
            plugin.jQueryelement.modal({
                backdrop: plugin.settings.modalBackdrop,
                keyboard: plugin.settings.modalKeyboard,
                show: false
            });
            plugin.jQueryelement.on(plugin.modalShowEvent, function(e) {
                plugin.showCounter++;
                plugin.mouseOutEventUnbind();
                plugin.settings.callbackOnModalShow.call(plugin);
            });
            plugin.jQueryelement.on(plugin.modalShownEvent, function(e) {
                plugin.settings.callbackOnModalShown.call(plugin);
            });
            plugin.jQueryelement.on(plugin.modalHideEvent, function(e) {
                plugin.settings.callbackOnModalHide.call(plugin);
            });
            plugin.jQueryelement.on(plugin.modalHiddenEvent, function(e) {
                if (plugin.settings.numberToShown) {
                    if (plugin.showCounter < plugin.settings.numberToShown) {
                        plugin.mouseOutEventBind();
                    }
                } else {
                    plugin.mouseOutEventBind();
                }
                plugin.settings.callbackOnModalHidden.call(plugin);
            });
            plugin.mouseOutEventBind();
        },
        mouseOutEventBind: function() {
            var plugin = this;
            var oldY = 0;
            jQuery(plugin.settings.viewportSelector).on("mousemove" + plugin.eventPrefix, function(e) {
                if ((e.clientY <= plugin.settings.pageYValueForEventFired) && (e.pageY < oldY)) {
                    plugin.showModal();
                }
                oldY = e.pageY;
            });
        },
        mouseOutEventUnbind: function() {
            var plugin = this;
            jQuery(plugin.settings.viewportSelector).off("mousemove" + plugin.eventPrefix);
        },
        allEventsUnbind: function() {
            var plugin = this;
            jQuery(plugin.settings.viewportSelector).off(plugin.eventPrefix);
            plugin.jQueryelement.off(plugin.eventPrefix);
        },
        showModal: function() {
            var plugin = this;
            plugin.jQueryelement.modal('show');
        },
        hideModal: function() {
            var plugin = this;
            plugin.jQueryelement.modal('hide');
        },
        destroy: function() {
            var plugin = this;
            plugin.allEventsUnbind();
            plugin.jQueryelement.data('exitModal', null);
        }
    };

    function exitModalInterface(methodOrOptions) {
        var methodsParameters = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            if (!jQuery(this).data('exitModal')) {
                var plugin = new exitModalObj(this, methodOrOptions);
                jQuery(this).data('exitModal', plugin);
                plugin.init();
            } else if (typeof methodOrOptions === 'object') {
                jQuery.error('jQuery.exitModal already initialized');
            } else {
                var plugin = jQuery(this).data('exitModal');
                if (plugin[methodOrOptions]) {
                    plugin[methodOrOptions].apply(plugin, methodsParameters);
                } else {
                    jQuery.error('Method ' + methodOrOptions + ' does not exist on jQuery.exitModal');
                }
            }
        })
    }
    exitModalInterface.defaults = {
        viewportSelector: document,
        showButtonClose: true,
        showButtonCloseOnlyForMobile: true,
        pageYValueForEventFired: 10,
        numberToShown: false,
        modalBackdrop: true,
        modalKeyboard: true,
        modalShowEvent: 'show.bs.modal',
        modalShownEvent: 'shown.bs.modal',
        modalHideEvent: 'hide.bs.modal',
        modalHiddenEvent: 'hidden.bs.modal',
        callbackOnModalShow: function() {},
        callbackOnModalShown: function() {},
        callbackOnModalHide: function() {},
        callbackOnModalHidden: function() {}
    };
    jQuery.fn.exitModal = exitModalInterface;
})();;
jQuery.noConflict();
(function($) {
    $(document).ready(function() {
        $("#phone-last").mask("+7 (999) 999-99-99");
        $("#phone-01").mask("+7 (999) 999-99-99");
        $("#phone-02").mask("+7 (999) 999-99-99");
        $("#phone-03").mask("+7 (999) 999-99-99");
        $("#phone-04").mask("+7 (999) 999-99-99");
        $("#phone-05").mask("+7 (999) 999-99-99");
        $("#phone-06").mask("+7 (999) 999-99-99");
        $("#phone-07").mask("+7 (999) 999-99-99");
        $("#phone-08").mask("+7 (999) 999-99-99");
        $("#phone-09").mask("+7 (999) 999-99-99");
        $("#phone-10").mask("+7 (999) 999-99-99");
        $(".phone").mask("+7 (999) 999-99-99");

        function printNumbersInterval() {
            var i = 30000;
            var timerId = setInterval(function() {
                $('.discount-total-count').text(i + " руб.");
                if (i == 0) {
                    clearInterval(timerId);
                }
                i = i - 10;

                function func() {
                    $('.discount-total-count').removeClass('animated flash');
                }
                setTimeout(func, 500);

                function func2() {
                    $('.discount-total-count').addClass('animated flash');
                }
                setTimeout(func2, 1000);
            }, 1000);
        }
        if (location.href == 'http://barbecue-black.ru/?s=1') {
            $('.row-first-screen').hide();
            $('.alpha_first-screen').hide();
            $('.alpha_first-screen-left').show();
            $('.item-1').show();
            $(".discount-total-count").removeClass('animated bounceIn');
            $(".screen-form-inner-1").removeClass("hidden");
            $(".video").remove();
            printNumbersInterval();
            $(".discount-inner").removeClass("hidden");
            $('.progress-wrapper').show();
            $('.progress-value').text("20%");
            $('.progress-line').animate({
                'width': '20%'
            }, 500);
        }
        $(document).ready(function() {
            $(document).on('click', '.callback-1', function() {
                $('#small-modal-1').arcticmodal();
            });
            $(document).on('click', '.callback-2', function() {
                $('#small-modal-2').arcticmodal();
            });
            $(document).on('click', '.callback-3', function() {
                $('#small-modal-3').arcticmodal();
            });
            $(document).on('click', '.callback-4', function() {
                $('#small-modal-4').arcticmodal();
            });
        });
        $(document).on('click', '.start-test', function() {
            $('.row-first-screen').hide();
            $('.alpha_first-screen').hide();
            $('.alpha_first-screen-left').show();
            $('.item-1').show();
            $(".screen-form-inner-1").removeClass("hidden");
            $(".video").remove();
            //yaCounter40513390.reachGoal('buttonStart');
            $(".discount-inner").removeClass("hidden");
            $('.progress-wrapper').show();
            $('.progress-value').text("20%");
            $('.progress-line').animate({
                'width': '20%'
            }, 500);
            printNumbersInterval();
        });
        $(document).on('click', '.item-1-option', function() {
            $('.item-1-button .hidden-button').show();
            if ($(this).find('.item-circle').hasClass("hidden")) {
                $('.item-circle').addClass("hidden");
                $(this).find('.item-circle').removeClass("hidden");
                var optionText = $(this).find(".item-text").text();
                $(".q1").val(optionText);
                var sumProcent = $(this).attr("data-count");
                $("input.sumProcent").val(sumProcent);
                $(".discount-inner").removeClass("hidden");
            }
        });
        $(document).on('click', '.item-1-button .hidden-button', function() {
            $('.item-1').hide();
            $('.item-2').show();
            $(".screen-form-inner-1").addClass("hidden");
            $(".screen-form-inner-2").removeClass("hidden");
            //yaCounter40513390.reachGoal('Q1NEXT');
        });
        $(document).on('click', '.item-2-option', function() {
            $('.item-2-button .hidden-button').show();
            if ($(this).find('.item-circle').hasClass("hidden")) {
                $('.item-circle').addClass("hidden");
                $(this).find('.item-circle').removeClass("hidden");
                var optionText = $(this).find(".item-text").text();
            }
        });
        $(document).on('click', '.item-2-button .hidden-button', function() {
            var arr = $('.item-2 input:checkbox:checked').map(function() {
                return this.value;
            }).get();
            var arrCounts = $('.item-2 input:checkbox:checked').map(function() {
                return $(this).attr('data-count');
            }).get();
            var sumQ2 = 0;
            for (var i = 0; i < arrCounts.length; i++) {
                sumQ2 = sumQ2 + parseInt(arrCounts[i]);
            }
            $("input.sumQ2").val(sumQ2);
            arr = arr.join('; ');
            $(".q2").val(arr);
            if ($(".q2").val() != "") {
                $('.item-2').hide();
                $('.item-3').show();
                $(".discount-inner").removeClass("hidden");

                function explode() {}
                setTimeout(explode, 2000);
                $(".screen-form-inner-2").addClass("hidden");
                $(".screen-form-inner-3").removeClass("hidden");
                //yaCounter40513390.reachGoal('Q2NEXT');
                $('.progress-wrapper').show();
                $('.progress-value').text("60%");
                $('.progress-line').animate({
                    'width': '60%'
                }, 500);
            } else {
                alert("Выберите один или несколько вариантов");
            }
        });
        $(document).on('click', '.item-3-option', function() {
            $('.item-3-button .hidden-button').show();
            if ($(this).find('.item-circle').hasClass("hidden")) {
                $('.item-circle').addClass("hidden");
                $(this).find('.item-circle').removeClass("hidden");
                var optionText = $(this).find(".item-text").text();
            }
        });
        $(document).on('click', '.item-3-button .hidden-button', function() {
            var arr = $('.item-3 input:checkbox:checked').map(function() {
                return this.value;
            }).get();
            var arrCounts = $('.item-3 input:checkbox:checked').map(function() {
                return $(this).attr('data-count');
            }).get();
            arr = arr.join('; ');
            $(".q3").val(arr);
            if ($(".q3").val() != "") {
                $('.item-3').hide();
                $('.item-4').show();
                $(".discount-inner").removeClass("hidden");

                function explode() {}
                setTimeout(explode, 2000);
                $(".screen-form-inner-3").addClass("hidden");
                $(".screen-form-inner-4").removeClass("hidden");
                //yaCounter40513390.reachGoal('Q2NEXT');
                $('.progress-wrapper').show();
                $('.progress-value').text("60%");
                $('.progress-line').animate({
                    'width': '60%'
                }, 500);
            } else {
                alert("Выберите один или несколько вариантов");
            }
        });
        // $(document).on('click', '.item-4-option', function() {
        //     $('.item-4-button .hidden-button').show();
        //     if ($(this).find('.item-circle').hasClass("hidden")) {
        //         $('.item-circle').addClass("hidden");
        //         $(this).find('.item-circle').removeClass("hidden");
        //         var optionText = $(this).find(".item-text").text();
        //         $(".q4").val(optionText);
        //         $(".discount-inner").removeClass("hidden");
        //     }
        // });
		$(document).on('click', '.item-4-option', function() {
            $('.item-4-button .hidden-button').show();
            if ($(this).find('.item-circle2').hasClass("hidden")) {
                $('.item-circle2').addClass("hidden");
                $(this).find('.item-circle2').removeClass("hidden");
                var optionText = $(this).find(".item-text").text();
                $(".q4").val(optionText);
                $(".discount-inner").removeClass("hidden");
            }
        });
        $(document).on('click', '.item-4-button .hidden-button', function() {
            $('.item-4').hide();
            $('.item-5').show();
            var width = $('.item-4').find('input[name="dlina_metrov"]').val();
            var sotok = $('.item-4').find('input[name="dlina_sotok"]').val();
            var visota;
            $('.item-4').find('.item-4-option').each(function(index, el) {
                if (!$(this).find('.item-circle2').hasClass('hidden')) {
                    visota = $(this).find('.item-text').text();
                }
            });


            $('.q4').val('Длинна: ( '+width+' )м.п или ( '+sotok+' )соток. Высота: '+visota);
            $(".screen-form-inner-4").addClass("hidden");
            $(".screen-form-inner-5").removeClass("hidden");
            //yaCounter40513390.reachGoal('Q4NEXT');
            $('.progress-wrapper').show();
            $('.progress-value').text("80%");
            $('.progress-line').animate({
                'width': '80%'
            }, 500);
        });
        $(document).on('click', '.item-5-option', function() {
            $('.item-5-button .hidden-button').show();
            if ($(this).find('.item-circle').hasClass("hidden")) {
                $('.item-circle').addClass("hidden");
                $(this).find('.item-circle').removeClass("hidden");
                var optionText = $(this).find(".item-text").text();
                $(".q5").val(optionText);
                $(".discount-inner").removeClass("hidden");
            }
        });
        $(document).on('click', '.item-5-button .hidden-button', function() {
            $('.item-5').hide();
            $(".screen-form-inner-5").addClass("hidden");
            $('.discount-inner').hide();
            $('.item-11').show();
            $('.final-form').show();
            $('.alpha_first-screen-left').hide();
            $('.alpha_first-screen.bottom').removeClass("hidden").show();
            //yaCounter40513390.reachGoal('Q5NEXT');
            var yourCount = $('.discount-total-count').text();
            yourCount = yourCount.replace(" руб.", "")
            $('input.yourCount').val(yourCount);
            // $('.item-11 .item-desc-1 strong').text(yourCount + " рублей");
            var sumQ2 = parseInt($('.sumQ2').val());
            var sumProcent = parseInt($('.sumProcent').val());
            sumFinal = (+sumQ2 * +sumProcent) / 100;
            sumFinal = sumQ2 + sumFinal;
            $('input.sumFinal').val(sumFinal);
            $('.progress-wrapper').show();
            $('.progress-value').text("100%");
            $('.progress-line').animate({
                'width': '100%'
            }, 500);
            $('.progress-wrapper').hide();
        });
        // var waypoint = new Waypoint({
        //     element: document.getElementsByClassName('first'),
        //     handler: function(dir) {
        //         if (dir === 'down') {
        //             $(".discount-and-form").addClass("fixed");
        //             $(".first").addClass("not-first");
        //         } else {
        //             $(".discount-and-form").removeClass("fixed");
        //             $(".first").removeClass("not-first");
        //         }
        //     },
        // });
    });

$('.call-form').submit(function(event){
    event.preventDefault()
    $.ajax({
        url: "mail.php",
        type: "post",
        data: $(this).serialize(),
        success: function (response) {              
            $('body').append('<style>.b-form__ok__wrap{display: none;position:fixed;width:100%;z-index:1000;top:0;height:100%;background-color:rgba(0,0,0,.7);text-align:center}.b-form__ok{background-color:#fff;background-color:rgba(255,255,255,.95);position:relative;margin-top:100px;display:inline-block;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;width:578px;height:263px;color:#333}.b-form__firstline{font-size:40px;text-transform:uppercase;margin:0 0 46px;padding-top:77px}.b-form__line{font-size:24px}</style><div class="b-form__ok__wrap"><div class="b-form__ok"><!--i class="icon i-close"></i--><p class="b-form__firstline">Спасибо!</p><p class="b-form__line">Мы вам перезвоним в ближайшее время.</p></div></div>');
            $('.b-form__ok__wrap').fadeIn(500);
            setTimeout(function() {$('.b-form__ok__wrap').fadeOut(500, function(){$('.b-form__ok__wrap').remove();});}, 4000);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
 });
$('.i-close').on('click', function(){
  $('.b-form__ok__wrap').fadeOut(500);
  $.fancybox.close();
});
$('.order-form').submit(function(event){
    event.preventDefault();
    $('input[name="yourCount"]').val($('.final-form').find('.form-part').find('.discount-total-count').text())
    $.ajax({
        url: "mail-order.php",
        type: "post",
        data: $(this).serialize(),
        success: function (response) {              
            $('body').append('<style>.b-form__ok__wrap{display: none;position:fixed;width:100%;z-index:1000;top:0;height:100%;background-color:rgba(0,0,0,.7);text-align:center}.b-form__ok{background-color:#fff;background-color:rgba(255,255,255,.95);position:relative;margin-top:100px;display:inline-block;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;width:578px;height:263px;color:#333}.b-form__firstline{font-size:40px;text-transform:uppercase;margin:0 0 46px;padding-top:77px}.b-form__line{font-size:24px}</style><div class="b-form__ok__wrap"><div class="b-form__ok"><!--i class="icon i-close"></i--><p class="b-form__firstline">Спасибо!</p><p class="b-form__line">Ваша заявка успешно отправлена.</p></div></div>');
            $('.b-form__ok__wrap').fadeIn(500);
            setTimeout(function() {$('.b-form__ok__wrap').fadeOut(500, function(){$('.b-form__ok__wrap').remove();});}, 4000);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
 });
$('.i-close').on('click', function(){
  $('.b-form__ok__wrap').fadeOut(500);
  $.fancybox.close();
});


})(jQuery);
