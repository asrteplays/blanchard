document.addEventListener("DOMContentLoaded", (event) => {
  let burgerMenu = document.querySelector('.burger-menu');
  const mediaQuery = window.matchMedia('(min-width: 594px)');
  let swiperContainerEditions = document.querySelector('.swiper-container-editions');
  let swiperContainerEvents = document.querySelector('.swiper-container-events');
  let wrapperEditions = document.querySelector('.swiper-wrapper-editions');
  let slidesEditions = document.querySelectorAll('.swiper-slide--editions');
  let swiperEvents;
  let swiperEditions;
  swiperEventsInit();
  swiperEditionsInit();

  $( function() {
    $( ".select-menu" ).selectmenu({
      position: { my : "left bottom+96%", at: "left bottom+100%" },
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
      // header: '.catalog-content__list-item',
      header: '.catalog-content__item-top',
      collapsible: true,
      icons: false,
      active: false
    });
  });

  document.querySelectorAll('.header-subinner__link').forEach(el => {
    el.addEventListener('click', function() {
      toggleDropDown(this)
    })
  })

  function toggleDropDown (subinnerLink) {
    document.querySelectorAll('.header-subinner__link').forEach(function(el) {
      if(el !== subinnerLink) {
        el.classList.remove('open');
      }
    });

    subinnerLink.classList.toggle('open');
  };

  document.addEventListener('click', function(e) {
    dropDownActive = document.querySelector('.header-subinner__link.open');
    if (dropDownActive !== null) {
      const target = e.target;
      const itsDropDownActive = target == dropDownActive;
      const itsDropDown = target.classList.contains('drop-down') || target.closest('.drop-down') !== null;
      if (itsDropDown == false && !itsDropDownActive && !target.classList.contains('open')) {
        toggleDropDown(dropDownActive)
      }
    }
  });

  document.querySelectorAll('.clickable').forEach(el => {
    el.addEventListener('click', addElement)
  })

  // burgerMenu
  document.querySelector('.burger-btn').addEventListener('click', function(event) {
    event.preventDefault();
    burgerMenu.classList.add('show');
  })
  document.querySelector('#burgerBtnClose').addEventListener('click', function(event) {
    event.preventDefault();
    burgerMenu.classList.remove('show');
  })

  document.querySelector('#btn-subscribe').addEventListener('click', function(event) {
    event.preventDefault();
    let sectionContacts = document.querySelector('#section-contacts');
    scrollTo(sectionContacts);
  });

  document.querySelector('.search-btn').addEventListener('click', function(event) {
    event.preventDefault();
    if (this.dataset.search == 'false') {
      inputSearch = document.querySelector('.input-search')
      inputSearch.classList.remove('input-search--hidden');
      inputSearch.removeAttribute('placeholder');
      
      document.querySelector('.header-subinner__item--reverse').classList.remove('header-subinner__item--reverse');

      this.dataset.search = 'true';
    }
  })

  function scrollTo(element) {
    window.scroll({
      left: 0,
      top: element.offsetTop,
      behavior: 'smooth',
    })
  }

  // Modal-popup
  let modalPopup = document.querySelector('.modal-popup');

  document.querySelectorAll('.swiper-slide-modal').forEach(function(gallerySlide) {
    gallerySlide.addEventListener('click', function(el) {
      let modalPath = this.dataset.modalPath;
      if (modalPath != null || modalPath != undefined) {
        modalTarget = document.querySelector(`[data-modal-target="${modalPath}"]`);
        swiperImg = gallerySlide.querySelector('.swiper-img');
        // swiperModalImg = modalTarget.querySelector('.img');
        swiperModalImg = modalPopup.querySelector('.modal-popup__img');

        swiperModalImg.src = swiperImg.src;
        modalPopup.classList.toggle('open');
        modalTarget.classList.toggle('active');
      }
    })
  })

  document.querySelectorAll('.modal-popup__btn').forEach(function(modalBtn) {
    modalBtn.addEventListener('click', function(event) {
      modalPopup.classList.toggle('open');
      modalTarget.classList.toggle('active');    
    })
  })

  // document.querySelector('#modalBtnClose').addEventListener('click', function(event) {
  //   modalPopup.classList.toggle('open');
  //   modalTarget.classList.toggle('active');
  // })

  //TABS
  document.querySelectorAll('.accordion-content__list-button').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click', function(event){
      const path = event.currentTarget.dataset.path;
      const pathCentury = event.currentTarget.closest(".accordion__content").dataset.artistsCentury;
      const pathCountry = event.currentTarget.closest(".accordion-content__list").dataset.artistsCountry;

      changeArtist(path,pathCountry,pathCentury);
    })
  })

  // changeArtist
  function changeArtist(path,pathCountry,pathCentury) {  
    target = document.querySelector(`[data-target="${path}"][data-target-country="${pathCountry}"][data-target-century="${pathCentury}"]`);
    if(target !== null) {
      document.querySelectorAll('.catalog-content__description').forEach(function(tabsContent){
        tabsContent.classList.remove('catalog-content__description-active')
      });
      target.classList.add('catalog-content__description-active');
    }
  }

  // Tabs-lang
  document.querySelectorAll('.tabs__btn').forEach(function(langBtn){
    langBtn.addEventListener('click', function(event){
      const lang = event.currentTarget.dataset.tabsLang;

      document.querySelectorAll('.accordion-content__list').forEach(function(langContent){
        langContent.classList.remove('active');
      });

      document.querySelectorAll(`[data-artists-country="${lang}"]`).forEach(function(el){
        el.classList.add('active');
      });
      changeArtist('one',lang,'15');
    })
  })

  // Events
  let btnEvents = document.querySelector('.events-button');
  btnEvents.addEventListener('click', function(){
    let eventsHidden = document.querySelectorAll('.events-hidden');
    let articleHidden = document.querySelector('.article-hidden');
    if (eventsHidden) {
      eventsHidden.forEach(function(el) {
        el.classList.remove('events-hidden');
      })
      articleHidden.classList.remove('article-hidden');
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

  // SWIPER
  var swiper = new Swiper('.swiper-container-gallery', {
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination-gallery',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-gallery--next',
      prevEl: '.swiper-button-gallery--prev',
    },
    breakpoints: {
      594: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        slidesPerColumn: 2,
        spaceBetween: 34,
      },
      1361: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        slidesPerColumn: 2,
        spaceBetween: 50,
      },
    }
  });  

  function swiperEventsInit() {
    if(!mediaQuery.matches) {
      swiperEvents = new Swiper(swiperContainerEvents, {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination-events',
          clickable: 'true',
          bulletClass: 'swiper-pagination-bullet-events',
          bulletActiveClass: 'swiper-pagination-bullet-events-active',
        },
      });
      swiperContainerEvents.dataset.mobile = 'true'
    }
  }

  function swiperEditionsInit() {
    if(mediaQuery.matches) {
      swiperEditions = new Swiper(swiperContainerEditions, {
        a11y: {
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
          slideLabelMessage: 'Слайд',
        },
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-editions--next',
          prevEl: '.swiper-button-editions--prev',
        },
        pagination: {
          el: '.swiper-pagination-editions',
          type: 'fraction',
        },
        breakpoints: {
          594: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
          },
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50,
          },
          1361: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50
          }
        }  
      });
      swiperContainerEditions.dataset.mobile = 'false'
    }
  }

  var swiperPartners = new Swiper('.swiper-container-partners', {
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      slideLabelMessage: 'Слайд',
    },
    slidesPerView: 1,
    spaceBetween: 21,
    navigation: {
      nextEl: '.swiper-button-partners--next',
      prevEl: '.swiper-button-partners--prev',
    },
    breakpoints: {
      594: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      1361: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    }  
  });


  //yandex-map
  // let coordiantes = [55.76055994608874,37.63985341189774];
  let coordiantes = [55.75846306898368,37.601079499999905];

  ymaps.ready(init);
  
  function init(){

    if (!mediaQuery.matches) {
      var zoomControl = new ymaps.control.ZoomControl({
        options: {
          position: {
            top: '70px',
            right: '15px'
          },
          size: 'small'
        }
      }),
  
      geoLocation = new ymaps.control.GeolocationControl({
        options: {
          position: {
            top: '150px',
            right: '15px'
          }
        }
      })
    } else {
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
      })
    }
  
    var myMap = new ymaps.Map("map", {
      center: coordiantes,

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


  window.addEventListener('resize', function(event) {
    if(mediaQuery.matches) {
      document.querySelector('.swiper-container-gallery').classList.add('swiper-container-multirow-column');
      if(swiperContainerEditions.dataset.mobile == 'true') {
        swiperEditionsInit();
      }

      if(swiperContainerEvents.dataset.mobile == 'true') {
        swiperEvents.destroy();
        swiperContainerEvents.dataset.mobile = 'false';
      }
    } else {
      if(swiperContainerEditions.dataset.mobile == 'false') {
        swiperEditions.destroy();
        swiperContainerEditions.dataset.mobile = 'true';
      }

      if(swiperContainerEvents.dataset.mobile == 'false') {
        swiperEventsInit();
      }

      document.querySelector('.swiper-container-gallery').classList.remove('swiper-container-multirow-column');
      document.querySelectorAll('.swiper-container-gallery .swiper-slide').forEach(function(el){
        el.style.marginTop = '0'
      });
    }
  })

});

// Pulse
function addElement(e) {
  let addDiv = document.createElement('span'),
        sDiv = addDiv.style;

  if(this.classList.contains('clickable--black')) {
    addDiv.classList.add('pulse--black');
  } else {
    addDiv.classList.add('pulse');
  }
  sDiv.left = e.offsetX - 10 + 'px';
  sDiv.top = e.offsetY - 10 + 'px';

  this.appendChild(addDiv);
  setTimeout(() => addDiv.remove(), 3000);
}

