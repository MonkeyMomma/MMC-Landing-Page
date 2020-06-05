/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
*/
var sections = document.querySelectorAll('section');
var menu_links = [];
var menu_container = document.getElementById('navbar__list');
for (var i = 0; i < sections.length; i++) {
  var section_el = sections[i];

  const a_tag = createMenuLink('#' + section_el.id, section_el.dataset.nav);
  menu_links.push(a_tag);

  var menu_item = document.createElement('li');
  menu_item.appendChild(a_tag);
  menu_container.appendChild(menu_item);
}

function createMenuLink(href, content) {
  const el = document.createElement('a');
  el.href = href;
  el.textContent = content;
  el.classList.add('menu__link');
  return el;
}

var isInViewport = function (el) {
  var bounding = el.getBoundingClientRect();
  return (
    // bounding.top >= 0 &&
    bounding.top <= (window.innerHeight || document.documentElement.clientHeight)/2
  );
};

let activeSectionIndex = null;
window.addEventListener('scroll', function (e) {
  let newActiveSectionIndex = null;
  for (var i = 0; i < sections.length; i++) {
    if (isInViewport(sections[i])) {
      newActiveSectionIndex = i;
    }
  }
  if (newActiveSectionIndex != activeSectionIndex) {
    if (activeSectionIndex != null) {
      sections[activeSectionIndex].classList.remove('active');
      menu_links[activeSectionIndex].classList.remove('menu__link_scrolled');
    }
    sections[newActiveSectionIndex].classList.add('active');
    menu_links[newActiveSectionIndex].classList.add('menu__link_scrolled');

    activeSectionIndex = newActiveSectionIndex;
  }
}, false);
