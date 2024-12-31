'use strict';

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

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const scrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

scrollto.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//smooth scrolling from nav bar to respective location.

//we will add event lister funciton to event which is common and closest to dom
//reason no matter whether we are listing the event or not it will happen at that any point so if event happen at any point it will bubble up and bring the formtion or epicenter
// event heppen at a level all the level above it will get that even lister fuction by bubbling no matter wheather we are listning it or not

const nav = document.querySelector('.nav');

nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const target = document.querySelector(e.target.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// operation tab implemenation.

const operationContainer = document.querySelector('.operations__tab-container');

const opeartionTabs = document.querySelectorAll('.operations__tab');

const operationContents = document.querySelectorAll('.operations__content');

operationContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.operations__tab');
  if (!target) {
    return;
  }

  opeartionTabs.forEach(opeartionTab => {
    opeartionTab.classList.remove('operations__tab--active');
  });

  target.classList.add('operations__tab--active');

  operationContents.forEach(operationContent => {
    operationContent.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${target.dataset.tab}`)
    .classList.add('operations__content--active');
});

//hover Nav implementation

document.querySelector('.nav').addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.target.style.scale = 1.1;
    const navLinks = e.target.closest('.nav').querySelectorAll('.nav__link');
    for (const navLink of navLinks) {
      if (e.target != navLink) {
        navLink.style.opacity = 0.5;
      }
    }
    document.querySelector('.nav__logo').style.opacity = 0.5;
  }
});
//restoring orignal state.
document.querySelector('.nav').addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.target.style.scale = 1;

    const navLinks = e.target.closest('.nav').querySelectorAll('.nav__link');
    for (const navLink of navLinks) {
      if (e.target != navLink) {
        navLink.style.opacity = 1;
      }
    }
    document.querySelector('.nav__logo').style.opacity = 1;
  }
});

//sticking on nav bar content

const fxn = function (entries) {
  const [entry] = entries; //entries is array of information per threshold//console.log(entry);
  console.log(entry.isIntersecting);

  if (!entry.isIntersecting) {
    // console.log('entered');
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
//to apply event based on view port then we use the IntersectionObserver

//intersectionObserver has 2 part call back funtion and object which contain object
//dog who has 2 parameter when to do , what to do
const observer = new IntersectionObserver(fxn, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});

//on whom to observe
observer.observe(document.querySelector('.header'));
//--------------------------------------
//applying the animation loade to the section.
const sectionfxn = function (entries, observe) {
  // console.log(observe, entries[0]);
  // console.log(entries[0].target);

  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden');
    // entries[0].target.
  } else {
    entries[0].target.classList.add('section--hidden');
  }
};

const secObserver = new IntersectionObserver(sectionfxn, {
  root: null,
  threshold: 0.2,
});

const sections = document.querySelectorAll('.section');

sections.forEach(function (section) {
  secObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazyloading of image

const imgfxn = function (entries) {
  const entry = entries[0];
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
  }
};
const imgObserver = new IntersectionObserver(imgfxn, {
  root: null,
  threshold: 0,
});
const lazyimages = document
  .querySelectorAll('img[data-src]')
  .forEach(function (lazyimage) {
    imgObserver.observe(lazyimage);
  });

// slider
let currentslide = 0;
const slides = document.querySelectorAll('.slide');

const slider_left = document.querySelector('.slider__btn--left');

const slider_right = document.querySelector('.slider__btn--right');

slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${i * 100}%)`;
});

slider_left.addEventListener('click', function () {
  if (currentslide == 0) {
    currentslide = slides.length - 1;
  } else {
    currentslide--;
  }
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${(currentslide - i) * 100}%)`;
  });
});

slider_right.addEventListener('click', function () {
  if (currentslide == slides.length - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }

  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${(i - currentslide) * 100}%)`;
  });
});
