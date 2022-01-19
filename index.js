const nav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const carouselImage1 = document.querySelector('#carousel-image-1');
const carouselImage2 = document.querySelector('#carousel-image-2');
const carouselImage3 = document.querySelector('#carousel-image-3');
const portfolioTitle = document.querySelector('.portfolio-info--title');
const portfolioContent = document.querySelector('.portfolio-info--content');
const portfolioLanguageList = document.querySelector('#languages-list');
const portfolioLanguageItem = document.querySelector(
  '.languages-list--language'
);

navToggle.addEventListener('click', navigationToggle);

tabs.forEach((tabs) => {
  tabs.addEventListener('click', getProjectInformation);
});

tabList.addEventListener('keydown', changeTabFocus);

function navigationToggle() {
  const visibility = nav.getAttribute('data-visible');
  if (visibility === 'false') {
    nav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);
  } else {
    nav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  }
}
let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute('tabindex', 0);
    tabs[tabFocus].focus();
  }
}

function getProjectInformation(e) {
  removeElementsByClass('languages-list--language');
  const targetTab = e.target;
  const targetTabIndex = targetTab.getAttribute('tabindex');
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      portfolioTitle.innerHTML = data.projects[targetTabIndex].title;
      portfolioContent.innerHTML = data.projects[targetTabIndex].description;
      carouselImage1.src = data.projects[targetTabIndex].images[0];
      carouselImage2.src = data.projects[targetTabIndex].images[1];
      carouselImage3.src = data.projects[targetTabIndex].images[2];

      data.projects[targetTabIndex].languages.forEach((item) => {
        let li = document.createElement('li');
        li.classList.add('languages-list--language');
        li.innerText = item;
        portfolioLanguageList.appendChild(li);
      });
    });
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
