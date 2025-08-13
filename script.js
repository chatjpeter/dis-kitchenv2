
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    once: true, 
    duration: 1000,
  });
});

  const navLinks = document.querySelectorAll('.nav-container a');
  const logo = document.querySelector('.logo-pic');


  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove active class from all links
      navLinks.forEach(nav => nav.classList.remove('active'));
      // Add active class to the clicked link
      this.classList.add('active');
    });
  });

   logo.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-container a[href="#home"]').classList.add('active');
  });

  document.addEventListener("DOMContentLoaded", function () {
  AOS.init({ once: true, duration: 1000 });

  const navLinks = document.querySelectorAll('.nav-container a');
  const sections = document.querySelectorAll("section");

  function setActiveLink() {
    let fromTop = window.scrollY + 150; // offset for sticky nav

    navLinks.forEach(link => {
      let section = document.querySelector(link.getAttribute("href"));
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }

  // Update active link on load & scroll
  setActiveLink();
  window.addEventListener("scroll", setActiveLink);
});


