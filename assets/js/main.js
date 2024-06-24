document.addEventListener("DOMContentLoaded", function () {
  const menuHamburger = document.querySelector(".menu-hamburger");
  const body = document.body;
  const navigation = document.querySelector(".navigation");

  menuHamburger.addEventListener("click", function (e) {
    e.preventDefault();
    body.classList.toggle("menu-active");
    navigation.classList.toggle("active");
    menuHamburger.classList.toggle("close");
  });

  menuHamburger.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      body.classList.toggle("menu-active");
      navigation.classList.toggle("active");
      menuHamburger.classList.toggle("close");
    }
  });

  document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
  });

  const navItems = document.querySelectorAll("nav ul li");
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (window.innerWidth >= 768) {
        navItems.forEach(function (sibling) {
          sibling.classList.remove('active');
        });
        item.classList.toggle('active');
      }
    });
  });

  navItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 768) {
        navItems.forEach(function (sibling) {
          sibling.classList.remove('active');
        });
        item.classList.add('active');
      }
    });

    item.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 768) {
        item.classList.remove('active');
      }
    });
  });

  const aosScript = document.createElement('script');
  aosScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
  aosScript.onload = function () {
    AOS.init({ once: true });
  };
  document.head.appendChild(aosScript);
});
