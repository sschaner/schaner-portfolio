const nav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

navToggle.addEventListener('click', navigationToggle);

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tabs) => {
  tabs.addEventListener('click', changeTabPanel);
});

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

function changeTabPanel(e) {
  const targetTab = e.target;
  console.log(targetTab);
  const targetPanel = targetTab.getAttribute('aria-controls');
  console.log(targetPanel);
  const targetImage = targetTab.getAttribute('data-image');
  console.log(targetImage);

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false);

  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainContainer, '[role="carouselImage"]');
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute('hidden', true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden');
}
