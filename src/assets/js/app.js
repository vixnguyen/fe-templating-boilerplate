/**
 * jQuery and Bootstrap loading
 */
import 'bootstrap'

/**
 * Axios loading
 */
import axios from 'axios'

/**
 * Vue Init
 */
import Vue from 'vue'
import 'babel-polyfill'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

/**
 * Frontend plugins loading
 */
import 'slick-carousel'
import swal from 'sweetalert2'

window.axios = axios

Vue.use(BootstrapVue)

new Vue().$mount('#app');

(function ($) {
  /**
   * Bind all bootstrap tooltips
   */
  $('[data-toggle="tooltip"]').tooltip()

  /**
   * Bind all bootstrap popovers
   */
  $('[data-toggle="popover"]').popover()

  $('.slider').not('.slick-initialized').removeAttr('hidden').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1
  })

  $('button.sweet').click(() => {
    swal({
      title: 'Yo!',
      text: 'Yeaaah!',
      type: 'success',
      confirmButtonText: 'Cool'
    })
  })

  $('.menu > li:has( > ul)').addClass('menu__item--has-child')

  $('.menu > li > ul:not(:has(ul))').addClass('normal-sub')

  $('.menu').before('<a href=\'#\' class=\'menu__icon\'>Navigation</a>')

  $('.menu > li').hover(
    (e) => {
      if ($(window).width() > 943) {
        $(this).children('ul').fadeIn(150)
        e.preventDefault()
      }
    }, (e) => {
      if ($(window).width() > 943) {
        $(this).children('ul').fadeOut(150)
        e.preventDefault()
      }
    }
  )

  $(document).on('click', (e) => {
    if ($(e.target).parents('.menu-container').length === 0) {
      $('.menu').removeClass('menu--mobile')
    }
  })

  $('.menu__item--has-child').click((elm) => {
    var thisMenu = $(elm.target).children('ul')
    var prevState = thisMenu.css('display')
    $('.menu__item--has-child > ul').fadeOut()
    if ($(window).width() < 943) {
      if (prevState !== 'block') {
        thisMenu.fadeIn(150)
      }
    }
  })

  $('.menu__icon').click((e) => {
    $('.menu').toggleClass('menu--mobile')
    e.preventDefault()
  })

  $('#js-slicknav > li').click((elm) => {
    $(elm.target).toggleClass('in')
  })

  $(window).scroll(() => {
    if ($(window).scrollTop() >= 80) {
      $('.js-header').addClass('header--sticky')
    } else {
      $('.js-header').removeClass('header--sticky')
    }
  })
})(window.jQuery)
