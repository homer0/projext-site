/**
 * @projext
 * type: browser
 */

import 'normalize.css';
import './assets/scss/styles.scss';

const installBox = {
  showNPM: false,
  selectors: {
    toggle: '.install-box-toggle',
    copy: '.install-box-copy',
  },
  icons: {},
  codes: {},
  copyDelay: 800,
  enabled: true,
  ready: false,
};

const show = (el) => {
  // eslint-disable-next-line no-param-reassign
  el.style.display = 'block';
};

const hide = (el) => {
  // eslint-disable-next-line no-param-reassign
  el.style.display = 'none';
};

const getButton = (e) => (
  e.target.nodeName === 'BUTTON' ?
    e.target :
    e.target.parentElement
);

const installBoxSetup = () => {
  if (!installBox.ready) {
    ['yarn', 'npm', 'copied'].forEach((type) => {
      installBox.icons[type] = document.querySelector(
        `${installBox.selectors.toggle} .-${type}`
      );
      installBox.codes[type] = document.querySelector(
        `${installBox.selectors.copy} .-${type}`
      );
    });
    installBox.ready = true;
  }
};

document.querySelector(installBox.selectors.toggle)
.addEventListener('click', (e) => {
  installBoxSetup();
  if (installBox.enabled) {
    installBox.showNPM = !installBox.showNPM;
    const button = getButton(e);
    button.blur();
    if (installBox.showNPM) {
      show(installBox.icons.npm);
      show(installBox.codes.npm);
      hide(installBox.icons.yarn);
      hide(installBox.codes.yarn);
    } else {
      hide(installBox.icons.npm);
      hide(installBox.codes.npm);
      show(installBox.icons.yarn);
      show(installBox.codes.yarn);
    }
  }
});

document.querySelector(installBox.selectors.copy)
.addEventListener('click', (e) => {
  installBoxSetup();
  if (installBox.enabled) {
    installBox.enabled = false;
    const button = getButton(e);
    button.blur();
    const activeCode = installBox.showNPM ?
      installBox.codes.npm :
      installBox.codes.yarn;
    hide(activeCode);
    show(installBox.codes.copied);
    const text = activeCode.innerText.replace(/[^\w\s]/g, '').trim();
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      installBox.enabled = true;
      hide(installBox.codes.copied);
      show(activeCode);
    }, installBox.copyDelay);
  }
});

const burgerMenu = {
  selectors: {
    button: '.burger',
    nav: '.nav',
    links: '.nav-links',
  },
  button: null,
  nav: null,
  activeClass: '-active',
  active: false,
  ready: false,
};

const burgerMenuSetup = (button) => {
  if (!burgerMenu.ready) {
    burgerMenu.nav = document.querySelector(burgerMenu.selectors.nav);
    burgerMenu.button = button;
    installBox.ready = true;
  }
};

const toggleBurgerMenu = (button) => {
  burgerMenuSetup(button);
  burgerMenu.active = button.classList.toggle(burgerMenu.activeClass);
  burgerMenu.nav.classList.toggle(burgerMenu.activeClass);
};

document.querySelector(burgerMenu.selectors.button)
.addEventListener('click', (e) => {
  const button = e.target.nodeName === 'BUTTON' ?
    e.target :
    e.target.parentElement;
  toggleBurgerMenu(button);
});

Array.from(document.querySelectorAll(burgerMenu.selectors.links))
.forEach((link) => {
  link.addEventListener('click', () => {
    if (burgerMenu.active) {
      toggleBurgerMenu(burgerMenu.button);
    }
  });
});
