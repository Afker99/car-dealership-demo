const cols = document.querySelectorAll(".car-col");
const videos = [
  document.getElementById("vid1"),
  document.getElementById("vid2"),
  document.getElementById("vid3"),
];

// Init: play first video if it exists
if (videos[0]) {
  videos[0].play();
}

function setActive(index) {
  cols.forEach((col, i) => {
    col.classList.toggle("active", i === index);
    if (i === index) {
      if (videos[i]) videos[i].play();
    } else {
      if (videos[i]) videos[i].pause();
    }
  });
}

cols.forEach((col, i) => {
  col.addEventListener("mouseenter", () => setActive(i));
});

// Page Transitions
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");
  
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const hrefAttr = this.getAttribute("href");
      
      if (
        this.hostname === window.location.hostname && 
        this.href !== "" && 
        !this.hasAttribute("download") && 
        this.target !== "_blank" &&
        hrefAttr && 
        !hrefAttr.startsWith("#") &&
        !hrefAttr.startsWith("tel:") &&
        !hrefAttr.startsWith("mailto:")
      ) {
        e.preventDefault();
        const destination = this.href;
        
        document.body.classList.add("page-transition-out");
        
        setTimeout(() => {
          window.location.href = destination;
        }, 600); // 600ms corresponds to the animation duration
      }
    });
  });
});

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    document.body.classList.remove("page-transition-out");
  }
});