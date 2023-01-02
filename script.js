'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll(".operations__content");
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', openModal);
});


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////
// PAGE NAVIGATION
// document.querySelectorAll(".nav__link").forEach(function(el) {
//  el.addEventListener('click', function (e)  {
//    e.preventDefault();
//    const id = this.getAttribute('href');
//    document.querySelector(id).scrollIntoView({behavior:'smooth'});
//  })
// });
// Using Event Delegation
document.querySelector(".nav__links").addEventListener('click', function (e) {
  e.preventDefault();
  //Matching Strategy to ignore clicks that did not happen on one of those links
  if (!e.target.classList.contains('nav__link')) return;
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
});



// BUTTON SCROLLING
btnScrollTo.addEventListener('click',function(e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});


// TABBED COMPONENT
tabsContainer.addEventListener('click', (e) => {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  //Guard Clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach( c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Active Content Area
 document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});



// MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el === link) return;
      el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover',  handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// STICKY NAVIGATION: with the scroll event
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
// window.scrollY > initialCoords.top ? nav.classList.add('sticky') : nav.classList.remove('sticky');
// });

// STICKY NAVIGATION: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  // we don't need to loop over the entries since we have only one threshold
  const [entry] = entries;
    entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');
};

const headerObserverOptions = {
  threshold: 0,
  rootMargin: `-${navHeight}px`,

};

const headerObserver = new IntersectionObserver(stickyNav, headerObserverOptions);

headerObserver.observe(header);


// REVEALING SECTIONS ON SCROLL
const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  // just destructuring the array instead of looping because we have only one threshold
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const section1Options = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, section1Options);

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);

});


// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //Replace src with data-src
  const targetImg = entry.target;
  targetImg.src = targetImg.dataset.src;
  targetImg.addEventListener('load', () => {
    targetImg.classList.remove('lazy-img');
  });
  //Stop observing to stop the function from continuously running even when not needed
  observer.unobserve(targetImg);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));



// Inserting and Deleting Elements from the DOM
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = "We use cookies to improve functionality and analytics.";
// message.innerHTML =  "We use cookies to improve functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button> "

// header.prepend(message);
// header.append(message);
// insert element as a sibling
// header.before(message);
// header.after(message);
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // message.parentElement.removeChild(message);
  // message.remove(); // new method for deleting dom elements
// })

// Styles
// const {style: msgStyle} = message;
// msgStyle.backgroundColor = "#37383d";
// msgStyle.width = '120%';
// msgStyle.height = Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// document.documentElement.style.setProperty('--color-primary', "red")

// const  logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('developer'));

//Data Attributes - if you're using kebab-case in the html always transform the data name to camelCase here
// console.log(logo.dataset.versionNumber);

// Working on Smooth Scrolling
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
//
// btnScrollTo.addEventListener('click',function(e) {
//   // const s1coords = section1.getBoundingClientRect();
//   // console.log(btnScrollTo.getBoundingClientRect());
//
//   //scrolling
//   // window.scrollTo({ left: s1coords.left + window.scrollX, top:s1coords.top + window.scrollY, behavior: 'smooth' } );
//   section1.scrollIntoView({behavior: 'smooth'});
// });
//

// Events and Event Handlers
// const h1 = document.querySelector('h1');
//
// const alertH1 = () => {
//   alert("Event: You are moving over an H1 tag");
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1 );


// Capturing, Tagrget and Bubbling Phase
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Link:", e.target, e.currentTarget)
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container:", e.target, e.currentTarget)
// });
// document.querySelector('.nav').addEventListener('click',  function(e)  {
//   this.style.backgroundColor = randomColor();
//   console.log("Nav:", e.target, e.currentTarget, this)
//   // console.log(e.currentTarget === this);
// });


// DOM TRAVERSING
// const h1 = document.querySelector('h1');
//
// // Going Downwards: child
// // console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
//
// // Going upwards: Parents
// // console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
//
//
// // Going Sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.nextSibling);
//  //if you need all the sibling elements, you can go to the parentElement and get it
// console.log(h1.parentElement.children);


// Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry)
//   });
// };
//
// const obsOptions = {
//   root: null,
//   threshold: ,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);
