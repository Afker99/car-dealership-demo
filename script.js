const cols = document.querySelectorAll(".car-col");
const videos = [
  document.getElementById("vid1"),
  document.getElementById("vid2"),
  document.getElementById("vid3"),
];

// Init function to handle layout based on screen size
function initVideos() {
  if (window.innerWidth <= 768) {
    // Mobile/Tablet: all active, all play
    cols.forEach((col) => col.classList.add("active"));
    videos.forEach((vid) => {
      if (vid) vid.play();
    });
  } else {
    // Desktop: only first active by default
    cols.forEach((col, i) => col.classList.toggle("active", i === 0));
    videos.forEach((vid, i) => {
      if (vid) {
        if (i === 0) vid.play();
        else vid.pause();
      }
    });
  }
}

// Run on load
initVideos();

// Update on resize
window.addEventListener("resize", initVideos);

function setActive(index) {
  if (window.innerWidth <= 768) return; // Disable hover effect on mobile
  
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
