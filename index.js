document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".educational-title");

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      if (content && content.classList.contains("educational-text")) {
        // Fecha todas as outras seções
        document
          .querySelectorAll(".educational-text.active")
          .forEach((activeContent) => {
            if (activeContent !== content) {
              activeContent.classList.remove("active");
              activeContent.previousElementSibling.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          });
        // Alterna a seção clicada
        content.classList.toggle("active");
        title.setAttribute(
          "aria-expanded",
          content.classList.contains("active")
        );
      }
    });
  });
});
