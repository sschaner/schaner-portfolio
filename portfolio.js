const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const carouselImage1 = document.querySelector('#carousel-image-1');
const carouselImage2 = document.querySelector('#carousel-image-2');
const carouselImage3 = document.querySelector('#carousel-image-3');
const portfolioTitle = document.querySelector('.portfolio-info--title');
const portfolioContent = document.querySelector('.portfolio-info--content');
const portfolioLanguageList = document.querySelector('#languages-list');
const portfolioIconList = document.querySelector('#project-icon-list');

tabs.forEach((tabs) => {
  tabs.addEventListener('click', getProjectInformation);
});

tabList.addEventListener('keydown', changeTabFocus);

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
  const firstPortfolioButto = document.querySelector('#first-portfolio-button');
  firstPortfolioButto.setAttribute('aria-selected', false);
  removeElementsByClass('languages-list--language');
  removeElementsByClass('project-icon-list--icon');
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

      let iconIndex = 0;
      data.projects[targetTabIndex].outsideLinks.forEach((item) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = item;
        let i = document.createElement('i');
        li.classList.add('project-icon-list--icon');
        li.appendChild(a);
        a.classList.add('link-design');
        a.setAttribute('target', '_blank');
        a.appendChild(i);
        if (iconIndex == 0) {
          i.classList.add('fas');
          i.classList.add('fa-globe');
        } else if (iconIndex == 1) {
          i.classList.add('fab');
          i.classList.add('fa-github');
        }
        portfolioIconList.appendChild(li);
        iconIndex++;
      });
    });
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
