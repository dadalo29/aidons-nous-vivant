// Aidons Nous Vivant — interactions
(function(){
  'use strict';

  // Header ombré au scroll
  var hdr = document.getElementById('hdr');
  function onScroll(){ if(hdr){ hdr.classList.toggle('scrolled', window.scrollY > 10); } }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Menu mobile
  var burger = document.getElementById('burger');
  if(burger){
    burger.addEventListener('click', function(){
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    document.querySelectorAll('.mobile-menu a').forEach(function(a){
      a.addEventListener('click', function(){
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded','false');
      });
    });
  }

  // Révélation au défilement
  var items = document.querySelectorAll('.reveal');
  function showAll(){ items.forEach(function(el){ el.classList.add('in'); }); }
  if('IntersectionObserver' in window && items.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){ io.observe(el); });
    // Filet de sécurité : tout afficher après le chargement complet
    window.addEventListener('load', function(){
      setTimeout(function(){
        items.forEach(function(el){
          var r = el.getBoundingClientRect();
          if(r.top < window.innerHeight){ el.classList.add('in'); }
        });
      }, 400);
    });
  } else {
    showAll();
  }

  // Formulaire de contact -> mailto
  var cform = document.getElementById('cform');
  if(cform){
    cform.addEventListener('submit', function(ev){
      ev.preventDefault();
      var nom = (document.getElementById('cf-nom')||{}).value || '';
      var mail = (document.getElementById('cf-mail')||{}).value || '';
      var suj = (document.getElementById('cf-suj')||{}).value || 'Message depuis le site ANV';
      var msg = (document.getElementById('cf-msg')||{}).value || '';
      var body = 'Nom : ' + nom + '\nE-mail : ' + mail + '\n\n' + msg;
      window.location.href = 'mailto:contact@anv-asso.org'
        + '?subject=' + encodeURIComponent(suj)
        + '&body=' + encodeURIComponent(body);
    });
  }
})();
