const nav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const carouselImage1 = document.querySelector('#carousel-image-1');
const carouselImage2 = document.querySelector('#carousel-image-2');
const carouselImage3 = document.querySelector('#carousel-image-3');
const portfolioTitle = document.querySelector('.portfolio-info--title');
const portfolioContent = document.querySelector('.portfolio-info--content');

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
    });
  // console.log(targetTabIndex);
  // const targetPanel = targetTab.getAttribute('aria-controls');
  // console.log(targetPanel);
  // const targetImage = targetTab.getAttribute('data-image');
  // console.log(targetImage);

  // const tabContainer = targetTab.parentNode;
  // const mainContainer = tabContainer.parentNode;

  // tabContainer
  //   .querySelector('[aria-selected="true"]')
  //   .setAttribute('aria-selected', false);

  // targetTab.setAttribute('aria-selected', true);

  // hideContent(mainContainer, '[role="tabpanel"]');
  // showContent(mainContainer, [`#${targetPanel}`]);

  // hideContent(mainContainer, '[role="carouselImage"]');
  // showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden');
}
