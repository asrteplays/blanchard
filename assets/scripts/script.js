//Pulse
document.addEventListener("DOMContentLoaded", (event) => {
  $( function() {
    $( ".select-menu" ).selectmenu({
      position: { my : "bottom+97%", at: "bottom+100%" },
      width: false,
      open: function( event, ui ) {
        $('.select-menu').selectmenu('menuWidget').width('100%');
        document.querySelectorAll('.pulse').forEach(el => {
          el.remove();
        });
      },
      create: function(event, ui) {
        $('.select-menu').selectmenu();
        $('.select-menu').selectmenu('refresh', true);
        document.querySelectorAll('.ui-widget-content').forEach(el => {
          new SimpleBar(el)
        });
        $('.select-menu').selectmenu('menuWidget').width('100%');
        document.querySelectorAll('.ui-menu-item').forEach(el => {
        el.addEventListener('click', addElement);
        });
      },
      classes: {
        "ui-selectmenu-menu": "ui-selectmenu-menu--width"
      }
    });

    document.querySelectorAll('.ui-selectmenu-button').forEach(el => {
      el.addEventListener('click', addElement);
    });

    $( "#accordion" ).accordion({
      heightStyle: 'content',
      header: '.catalog-content__list-item',
      collapsible: true,
      icons: false,
      active: false
    });
  });

  let clickElements = document.getElementsByClassName('clickable'),
      forEach = Array.prototype.forEach;
  forEach.call(clickElements, function(c) {
    c.addEventListener('click', addElement);
  });

  document.querySelector('#btn-subscribe').addEventListener('click', function(event) {
    event.preventDefault();
    let sectionContacts = document.querySelector('#section-contacts');
    scrollTo(sectionContacts);
  });

  function scrollTo(element) {
    window.scroll({
      left: 0,
      top: element.offsetTop,
      behavior: 'smooth',
    })
  }

  //TABS
  document.querySelectorAll('.accordion-content__list-button').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click', function(event){
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.catalog-content__description').forEach(function(tabsContent){
        tabsContent.classList.remove('catalog-content__description-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('catalog-content__description-active')
    })
  })

  let btnEvents = document.querySelector('.events-button');
  btnEvents.addEventListener('click', function(){
    let eventsHidden = document.querySelector('.events-hidden');
    if (eventsHidden) {
      eventsHidden.classList.remove('events-hidden');
      this.classList.add('events-button--hidden');
    };
  })

  // choices
  const element = document.querySelector('#select-custom');
  const choices = new Choices(element, {
    renderSelectedChoices: 'always',
    searchEnabled: false,
    itemSelectText: ''
  });

  //swiper
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    spaceBetween: 50,
    slidesPerGroup: 3,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
    nextEl: '.swiper-button-custom--next',
    prevEl: '.swiper-button-custom--prev',
    },
  });

  var swiperCustom = new Swiper('.swiper-container-editions', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-custom--next',
      prevEl: '.swiper-button-custom--prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  });

  var swiperCustom = new Swiper('.swiper-container-partners', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: '.swiper-button-custom-partners--next',
      prevEl: '.swiper-button-custom-partners--prev',
    },
  });

  //yandex-map
  ymaps.ready(init);
  
  function init(){
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
          position: {
            top: '270px',
            right: '15px'
          },
          size: 'small'
      }
    }),

    geoLocation = new ymaps.control.GeolocationControl({
      options: {
        position: {
          top: '350px',
          right: '15px'
        }
      }
    }),

    myMap = new ymaps.Map("map", {
      center: [55.76055994608874,37.63985341189774],
      zoom: 14.2,
      controls: [zoomControl, geoLocation]
    });

    var myPlacemark = new ymaps.Placemark([55.75846306898368,37.601079499999905], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'assets/img/map-marker.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -15]
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('searchControl');
    myMap.controls.remove('rulerControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
  }

  // inputmask
  var selector = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(selector);

  // just-validate
  new JustValidate('.form', {
    colorWrong: '#7943A4',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      }
    },
    messages: {
      name: {
        required: 'Укажите ваше имя'
      },
      tel: {
        required: 'Укажите ваш телефон'
      }
    }
  })
});

function addElement(e) {
  let addDiv = document.createElement('span'),
        sDiv = addDiv.style;

  if(this.classList.contains('clickable--black')) {
    addDiv.classList.add('pulse--black');
  } else {
    addDiv.classList.add('pulse');
  }
//  sDiv.left = e.clientX - 10 + 'px';
//  sDiv.top = e.clientY - 10 + 'px';
  sDiv.left = e.offsetX - 10 + 'px';
  sDiv.top = e.offsetY - 10 + 'px';

  this.appendChild(addDiv);
  setTimeout(() => addDiv.remove(), 3000);
}

