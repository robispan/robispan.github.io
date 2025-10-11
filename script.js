document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  const viewProjectBtn = document.querySelector(".btn");
  if (viewProjectBtn) {
    viewProjectBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const projectSection = document.getElementById("project");
      if (projectSection) {
        projectSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});
