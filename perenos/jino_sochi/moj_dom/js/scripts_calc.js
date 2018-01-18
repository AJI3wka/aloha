///////////////////
//Исходные данные//
///////////////////

  //Курс Евро
  var euro = 77.6;

  //Отапливаемая площадь, м2
  var sqr1 = 0;

  //в т.ч. Площадь теплого пола, м2
  var sqr2 = 0;

  //Стены
  var borders = 1;

  //Сумма по радиаторам
  var sum_radiators = 0;

  //Сумма теплого пола
  var sum_floor = 0;

  //Сумма трубопровода
  var sum_pipes = 0;

  //Сумма котельной
  var sum_heater = 0;

  //Средняя сумма
  var sum_sqr = 0;

  //Сумма за кв. метр
  var sum_sqr_m = 0;

  //Минимальная сумма после уточнения
  var sum_min = 0;

  //Максимальная сумма после уточнения
  var sum_max = 0;

  // //DOM - Тип теплого пола
  // var $type_floor = null;

  //DOM - Тип котельной
  var $type_heater = null;

  // //DOM - Сумма радиаторов
  // var $sum_radiators = null;

  // //DOM - Сумма теплого пола
  // var $sum_floor = null;

  // //DOM - Сумма трубопровода
  // var $sum_pipes = null;

  // //DOM - Сумма котельной
  // var $sum_heater = null;

  //DOM - Усредненная сумма
  var $sum_sqr = null;

  //DOM - Сумма за 1 м
  var $sum_sqr_m = null;

  // //DOM - Минимальная сумма после просчета
  // var $sum_min = null;

  // //DOM - Максимальная сумма после просчета
  // var $sum_max = null;

  //DOM - Ошибка просчета
  var $calc_reason = null;

///////////////////////////////
//Исходные данные - окончание//
///////////////////////////////

///////////
//Функции//
///////////

  //Инициализация
  function init() {
    //console.log('init start');

    // //Тип теплого пола
    // $type_floor = $('#type-floor');

    //Тип котельной
    $type_heater = $('#type-heater');

    // //DOM - Сумма радиаторов
    // $sum_radiators = $('#sum-radiators');

    // //DOM - Сумма теплого пола
    // $sum_floor = $('#sum-floor');

    // //DOM - Сумма трубопровода
    // $sum_pipes = $('#sum-pipes');

    // //DOM - Сумма котельной
    // $sum_heater = $('#sum-heater');

    //DOM - Усредненная сумма
    $sum_sqr = $('#sum-sqr');

    //DOM - Сумма за 1 м
    $sum_sqr_m = $('#sum-sqr-m');

    // //DOM - Минимальная сумма после просчета
    // $sum_min = $('#sum-min');

    // //DOM - Максимальная сумма после просчета
    // $sum_max = $('#sum-max');

    //DOM - Ошибка просчета
    $calc_reason = $('#calc-reason');

    //console.log('init end');

    //calc();
  }

  //Расчет
  function calc() {
    console.log('calc start');

    sqr1 = parseInt($('#sqr1').val());
    sqr2 = parseInt($('#sqr2').val());
    if( sqr2 < 5 || sqr2 == undefined || isNaN(sqr2) ) sqr2 = 5;
    //borders = $('form input[name="borders"]:checked').val() * 1;

    //console.log('Обрабатываемые данные: ' + ' общая площадь (sqr1) - ' + sqr1 + ', площадь теплых полов (sqr2) - ' + sqr2 + ', вариант стен - ' + borders);

    ///////////////////////////////
    //Определяем тип теплых полов//
    ///////////////////////////////

      // ЕСЛИ( G4 < 5; "До 5м2 от обратки радиатора";
      //   ЕСЛИ( G4 < 8; "До 8м2 с отдельным подключением от системы отопления с Unibox";
      //     ЕСЛИ( G4 < 50; "До 50м2 с малым гидравлическим разделителем в котельной по зависимой схеме управления";"Свыше 50м2 с большим гидравлическим разделителем в котельной по независимой схеме")
      //   )
      // )

      // if (sqr2 < 5) {
      //   $type_floor.text('До 5м2 от обратки радиатора');
      // } else if (sqr2 < 8) {
      //   $type_floor.text('До 8м2 с отдельным подключением от системы отопления с Unibox');
      // } else if (sqr2 < 50) {
      //   $type_floor.text('До 50м2 с малым гидравлическим разделителем в котельной по зависимой схеме управления');
      // } else {
      //   $type_floor.text('Свыше 50м2 с большим гидравлическим разделителем в котельной по независимой схеме');
      // }

    ///////////////////////////////////////////
    //Определяем тип теплых полов - окончание//
    ///////////////////////////////////////////

    ////////////////////////////
    //Определяем тип котельной//
    ////////////////////////////

      // ЕСЛИ( G2 * ЕСЛИ( G8 = 1; 75; ЕСЛИ( G8 = 2; 100; 130) ) < 25000; "Котел газ наст 2к турбо 25кВт Fondital Antea (Италия)";
      //   ЕСЛИ( G2 * ЕСЛИ( G8 = 1; 75; ЕСЛИ( G8 = 2; 100; 130) ) < 33000; "Котел газ наст 2к турбо 33,0кВт Fondital FORMENTERA (Италия)";
      //     ЕСЛИ( G2 * ЕСЛИ( G8 = 1; 75;ЕСЛИ( G8 = 2; 100; 130) ) < 41000; "Котел газ нап  41кВт Wolf (Германия) c бойлером Wolf (Германия)200л "; "Котел газ нап  57кВт Wolf (Германия) c бойлером Wolf (Германия)300л ")
      //   )
      // )

      var borders_koef = 0;
      switch(borders){
        case 1:
          borders_koef = 75;
        break;
        case 2:
          borders_koef = 100;
        break;
        case 3:
          borders_koef = 130;
        break;
      }
      if (sqr1 * borders_koef < 25000) {
        $type_heater.val('Котел газ наст 2к турбо 25кВт Fondital Antea (Италия)');
      } else if (sqr1 * borders_koef < 33000) {
        $type_heater.val('Котел газ наст 2к турбо 33,0кВт Fondital FORMENTERA (Италия)');
      } else if (sqr1 * borders_koef < 41000) {
        $type_heater.val('Котел газ нап 41кВт Wolf (Германия) c бойлером Wolf (Германия)200л');
      } else {
        $type_heater.val('Котел газ нап 57кВт Wolf (Германия) c бойлером Wolf (Германия) 300л');
      }

    ////////////////////////////////////////
    //Определяем тип котельной - окончание//
    ////////////////////////////////////////

    //////////////////////////////////
    //Определяем сумму по радиаторам//
    //////////////////////////////////

      // ЕСЛИ ( ИЛИ (G4 > G2; G2 < 40; G2 > 500; G4 < 5) = ИСТИНА; "Ошибка";
      //   G2 * 12 * ЕСЛИ(G8 = 1; 0,9; ЕСЛИ( G8 = 2; 1; 1,3))
      //      * G6 -
      //         ( G2 * 12 * ЕСЛИ(G8 = 1; 0,9; ЕСЛИ( G8 = 2; 1; 1,3))
      //              * G6 * ( 1 - ЕСЛИ(G8 = 1; 0,2; ЕСЛИ(G8 = 2; 0,5; 0,7)) )
      //                   * ЕСЛИ(G4 > 0; G4 / G2; 0)
      //         )
      //      )

      var borders_koef_1 = 0;
      var borders_koef_2 = 0;
      switch(borders){
        case 1:
          borders_koef_1 = 0.9;
          borders_koef_2 = 0.2;
        break;
        case 2:
          borders_koef_1 = 1;
          borders_koef_2 = 0.5;
        break;
        case 3:
          borders_koef_1 = 1.3;
          borders_koef_2 = 0.7;
        break;
      }
      var sqr_koef = 0;
      if(sqr2 > 0){
        sqr_koef = sqr2 / sqr1;
      }
      if ( sqr2 > sqr1 || sqr1 < 40 || sqr1 > 500 || sqr2 < 5 ) {
        //$sum_radiators.text('Ошибка!');
        var reason = 'Один из параметров недопустим';
        if(sqr2 > sqr1) {
          reason = 'Площадь теплого пола не может быть больше общей площади!';
        } else if (sqr1 < 40) {
          reason = 'Общая площадь не может быть менее 40 кв. м.';
        } else if (sqr1 > 500) {
          reason = 'Общая площадь не может быть более 500 кв. м.';
        } else if (sqr2 < 5) {
          reason = 'Площадь теплого пола не может быть менее 5 кв. м.';
        }
        $calc_reason.removeClass('hidden');
        $calc_reason.text(reason);
      } else {
        $calc_reason.text('');
        $calc_reason.addClass('hidden');
        sum_radiators = Math.round(sqr1 * 12 * borders_koef_1 * euro - ( sqr1 * 12 * borders_koef_1 * euro * ( 1 - borders_koef_2 ) * sqr_koef ));
        //$sum_radiators.text(number_format(sum_radiators, {decimals: 0, thousands_sep: " "}) + ' р.');
      }

    //////////////////////////////////////////////
    //Определяем сумму по радиаторам - окончание//
    //////////////////////////////////////////////

    ////////////////////////////////////
    //Определяем сумму по теплому полу//
    ////////////////////////////////////

      // ЕСЛИ( ИЛИ(G4>G2;G2<40;G2>500;G4<5)=ИСТИНА;"Ошибка";
      //   ЕСЛИ(G4 < 5; 11;
      //     ЕСЛИ(G4 < 8; 20;
      //       ЕСЛИ(G4 < 50; 30; 35)))
      //   * G4 * G6)

      var sqr_koef = 35;
      if(sqr2 < 5){
        sqr_koef = 11;
      } else if (sqr2 < 8) {
        sqr_koef = 20;
      } else if (sqr2 < 50) {
        sqr_koef = 30;
      }
      if ( sqr2 > sqr1 || sqr1 < 40 || sqr1 > 500 || sqr2 < 5 ) {
        //$sum_floor.text('Ошибка!');
        var reason = 'Один из параметров недопустим';
        if(sqr2 > sqr1) {
          reason = 'Площадь теплого пола не может быть больше общей площади!';
        } else if (sqr1 < 40) {
          reason = 'Общая площадь не может быть менее 40 кв. м.';
        } else if (sqr1 > 500) {
          reason = 'Общая площадь не может быть более 500 кв. м.';
        } else if (sqr2 < 5) {
          reason = 'Площадь теплого пола не может быть менее 5 кв. м.';
        }
        $calc_reason.removeClass('hidden');
        $calc_reason.text(reason);
      } else {
        $calc_reason.text('');
        $calc_reason.addClass('hidden');
        sum_floor = Math.round(sqr_koef * sqr2 * euro);
        //$sum_floor.text(number_format(sum_floor, {decimals: 0, thousands_sep: " "}) + ' р.');
      }

    ////////////////////////////////////////////////
    //Определяем сумму по теплому полу - окончание//
    ////////////////////////////////////////////////

    /////////////////////////////////////
    //Определяем сумму по трубопроводам//
    /////////////////////////////////////

      // ЕСЛИ( ИЛИ(G4>G2;G2<40;G2>500;G4<5)=ИСТИНА;"Ошибка";
      //   13 * ЕСЛИ(G8=1;0,9;ЕСЛИ(G8=2;1;1,3))
      //      * G2 * G6 -
      //       (
      //         G2 * 13 * ЕСЛИ(G8=1;0,9;ЕСЛИ(G8=2;1;1,3)) * G6 * (1-ЕСЛИ(G8=1;0,2;ЕСЛИ(G8=2;0,5;0,7))) * ЕСЛИ(G4>0;G4/G2;0)
      //       )
      // )

      var borders_koef_1 = 0;
      var borders_koef_2 = 0;
      switch(borders){
        case 1:
          borders_koef_1 = 0.9;
          borders_koef_2 = 0.2;
        break;
        case 2:
          borders_koef_1 = 1;
          borders_koef_2 = 0.5;
        break;
        case 3:
          borders_koef_1 = 1.3;
          borders_koef_2 = 0.7;
        break;
      }
      var sqr_koef = 0;
      if(sqr2 > 0){
        sqr_koef = sqr2 / sqr1;
      }
      if ( sqr2 > sqr1 || sqr1 < 40 || sqr1 > 500 || sqr2 < 5 ) {
        //$sum_pipes.text('Ошибка!');
        var reason = 'Один из параметров недопустим';
        if(sqr2 > sqr1) {
          reason = 'Площадь теплого пола не может быть больше общей площади!';
        } else if (sqr1 < 40) {
          reason = 'Общая площадь не может быть менее 40 кв. м.';
        } else if (sqr1 > 500) {
          reason = 'Общая площадь не может быть более 500 кв. м.';
        } else if (sqr2 < 5) {
          reason = 'Площадь теплого пола не может быть менее 5 кв. м.';
        }
        $calc_reason.removeClass('hidden');
        $calc_reason.text(reason);
      } else {
        $calc_reason.text('');
        $calc_reason.addClass('hidden');
        sum_pipes = Math.round(13 * borders_koef_1 * sqr1 * euro - ( sqr1 * 13 * borders_koef_1 * euro * ( 1 - borders_koef_2 ) * sqr_koef ));
        //$sum_pipes.text(number_format(sum_pipes, {decimals: 0, thousands_sep: " "}) + ' р.');
      }

    /////////////////////////////////////////////////
    //Определяем сумму по трубопроводам - окончание//
    /////////////////////////////////////////////////

    /////////////////////////////////////
    //Определяем сумму по котельной//////
    /////////////////////////////////////

      // ЕСЛИ( ИЛИ(G4>G2;G2<40;G2>500;G4<5)=ИСТИНА;"Ошибка";
      //   ЕСЛИ( G2 * ЕСЛИ(G8=1;75;ЕСЛИ(G8=2;100;130)) < 25000; 1115; ЕСЛИ( G2 * ЕСЛИ(G8=1;75;ЕСЛИ(G8=2;100;130)) < 33000; 1350; ЕСЛИ( G2 * ЕСЛИ(G8=1;75;ЕСЛИ(G8=2;100;130)) < 41000; 3657; 4900))) * G6 )

      var borders_koef = 0;
      switch(borders){
        case 1:
          borders_koef = 75;
        break;
        case 2:
          borders_koef = 100;
        break;
        case 3:
          borders_koef = 130;
        break;
      }
      var sqr_koef = 4900;
      if(sqr1 * borders_koef < 25000){
        sqr_koef = 1115;
      } else if (sqr1 * borders_koef < 33000) {
        sqr_koef = 1350;
      } else if (sqr1 * borders_koef < 41000) {
        sqr_koef = 3657;
      }
      if ( sqr2 > sqr1 || sqr1 < 40 || sqr1 > 500 || sqr2 < 5 ) {
        //$sum_heater.text('Ошибка!');
        var reason = 'Один из параметров недопустим';
        if(sqr2 > sqr1) {
          reason = 'Площадь теплого пола не может быть больше общей площади!';
        } else if (sqr1 < 40) {
          reason = 'Общая площадь не может быть менее 40 кв. м.';
        } else if (sqr1 > 500) {
          reason = 'Общая площадь не может быть более 500 кв. м.';
        } else if (sqr2 < 5) {
          reason = 'Площадь теплого пола не может быть менее 5 кв. м.';
        }
        $calc_reason.removeClass('hidden');
        $calc_reason.text(reason);
      } else {
        $calc_reason.text('');
        $calc_reason.addClass('hidden');
        sum_heater = Math.round(sqr_koef * euro);
        //$sum_heater.text(number_format(sum_heater, {decimals: 0, thousands_sep: " "}) + ' р.');
      }

    /////////////////////////////////////////////////
    //Определяем сумму по котельной - окончание//////
    /////////////////////////////////////////////////

    ////////////////////////////////////
    //Определяем усредненную стоимость//
    ////////////////////////////////////

      sum_sqr = Math.round(sum_radiators + sum_floor + sum_pipes + sum_heater);
      //console.log(sum_sqr);
      sum_sqr = Math.round(sum_sqr - (sum_sqr/100)*45);
      //console.log(sum_sqr);
      $sum_sqr.val(number_format(sum_sqr, {decimals: 0, thousands_sep: " "}) + ' р.');

    ////////////////////////////////////////////////
    //Определяем усредненную стоимость - окончание//
    ////////////////////////////////////////////////

    ////////////////////////////////////////////
    //Определяем среднюю стоимость за кв. метр//
    ////////////////////////////////////////////

      sum_sqr_m = Math.round(sum_sqr / sqr1);
      $sum_sqr_m.val(number_format(sum_sqr_m, {decimals: 0, thousands_sep: " "}) + ' р.');

    ////////////////////////////////////////////////////////
    //Определяем среднюю стоимость за кв. метр - окончание//
    ////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////
    //Определяем минимальную стоимость после просчета//
    ///////////////////////////////////////////////////

      // sum_min = Math.round(sum_sqr * 0.85);
      // $sum_min.text(number_format(sum_min, {decimals: 0, thousands_sep: " "}) + ' р.');

    ///////////////////////////////////////////////////////////////
    //Определяем минимальную стоимость после просчета - окончание//
    ///////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    //Определяем максимальную стоимость после просчета//
    ////////////////////////////////////////////////////

      // sum_max = Math.round(sum_sqr * 1.15);
      // $sum_max.text(number_format(sum_max, {decimals: 0, thousands_sep: " "}) + ' р.');

    ////////////////////////////////////////////////////////////////
    //Определяем максимальную стоимость после просчета - окончание//
    ////////////////////////////////////////////////////////////////

    console.log('calc end');
  }

  //Только целые числа
  function checkNumberFields(e, k){

    var str = jQuery(e).val();
    var new_str = s = "";

    for(var i=0; i < str.length; i++){

      s = str.substr(i,1);

      //Если цифра
      if(s!=" " && isNaN(s) == false){
        new_str += s;
      }
    }

    if(eval(new_str) == 0){ new_str = ""; }

    jQuery(e).val(new_str);

  }

  //Формат чисел
  function number_format(_number, _cfg){
    function obj_merge(obj_first, obj_second){
    var obj_return = {};
    for (key in obj_first){
      if (typeof obj_second[key] !== 'undefined') obj_return[key] = obj_second[key];
      else obj_return[key] = obj_first[key];
      }
    return obj_return;
    }
    function thousands_sep(_num, _sep){
    if (_num.length <= 3) return _num;
    var _count = _num.length;
    var _num_parser = '';
    var _count_digits = 0;
    for (var _p = (_count - 1); _p >= 0; _p--){
      var _num_digit = _num.substr(_p, 1);
      if (_count_digits % 3 == 0 && _count_digits != 0 && !isNaN(parseFloat(_num_digit))) _num_parser = _sep + _num_parser;
      _num_parser = _num_digit + _num_parser;
      _count_digits++;
      }
    return _num_parser;
    }
    if (typeof _number !== 'number'){
    _number = parseFloat(_number);
    if (isNaN(_number)) return false;
    }
    var _cfg_default = {before: '', after: '', decimals: 2, dec_point: '.', thousands_sep: ','};
    if (_cfg && typeof _cfg === 'object'){
    _cfg = obj_merge(_cfg_default, _cfg);
    }
    else _cfg = _cfg_default;
    _number = _number.toFixed(_cfg.decimals);
    if(_number.indexOf('.') != -1){
    var _number_arr = _number.split('.');
    var _number = thousands_sep(_number_arr[0], _cfg.thousands_sep) + _cfg.dec_point + _number_arr[1];
    }
    else var _number = thousands_sep(_number, _cfg.thousands_sep);
    return _cfg.before + _number + _cfg.after;
  }

///////////////////////
//Функции - окончание//
///////////////////////

///////////
//События//
///////////

  $(document).ready(function(){

    //Инициализация
    init();

    //Поле ввода с цифрами
    var inputNum = $('#sqr1, #sqr2');

    //Расчет форы
    $('.scr5_form my_form button[type="submit"]').on('click', function(e){
      //e.preventDefault();
      calc();
    });
    $('#sqr1, #sqr2').on('keyup', function(e){
      //e.preventDefault();
      calc();
    });
    // $('input[name="borders"]').on('change', function(e){
    //   e.preventDefault();
    //   calc();
    // });

    //Вводить только цифры
    inputNum
      //Пользователь отпускает клавишу клавиатуры
      .keyup(function(event){
        checkNumberFields(this, event);
      })
      //Пользователь нажимает клавишу клавиатуры и удерживает её в нажатом состоянии
      .keypress(function(event){
        checkNumberFields(this, event);
      })
      //Поле теряет фокус
      .change(function(event){
        checkNumberFields(this, event);
      })
      .click(function(){
        this.select();
      });

  });

///////////////////////
//События - окончание//
///////////////////////