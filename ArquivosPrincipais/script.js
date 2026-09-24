(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const links = [...document.querySelectorAll(".navbar .nav-link[href^='#']")];
  const menu = $("#menu");
  const buttonTop = $("#btnTopo");
  const themeButton = $("#btnDarkMode");
  const themeIcon = $("#btnDarkMode i");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(dark, save = false) {
    document.body.classList.toggle("dark-mode", dark);
    themeButton?.setAttribute("aria-pressed", String(dark));
    themeButton?.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
    themeIcon?.classList.toggle("bi-moon-stars-fill", !dark);
    themeIcon?.classList.toggle("bi-sun-fill", dark);
    if (save) localStorage.setItem("tema-portfolio", dark ? "dark" : "light");
  }

  const savedTheme = localStorage.getItem("tema-portfolio");
  applyTheme(savedTheme ? savedTheme === "dark" : systemTheme.matches);
  themeButton?.addEventListener("click", () => applyTheme(!document.body.classList.contains("dark-mode"), true));
  systemTheme.addEventListener?.("change", event => {
    if (localStorage.getItem("tema-portfolio") === null) applyTheme(event.matches);
  });

  function updatePageState() {
    buttonTop?.classList.toggle("visivel", window.scrollY > 450);
    const current = [...document.querySelectorAll("main section[id]")]
      .find(section => section.getBoundingClientRect().top <= 150 && section.getBoundingClientRect().bottom > 150);
    links.forEach(link => {
      const active = link.hash === `#${current?.id || "inicio"}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", updatePageState, { passive: true });
  updatePageState();
  buttonTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const target = $(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (menu?.classList.contains("show") && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  $("#formContato")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const dados = new FormData(form);
    const assunto = String(dados.get("Assunto") || "Contato pelo portfólio");
    const corpo = [
      `Nome: ${dados.get("Nome") || ""}`,
      `E-mail para resposta: ${dados.get("E-mail") || ""}`,
      "",
      String(dados.get("Mensagem") || "")
    ].join("\n");
    const url = `mailto:joaopereitdf@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = url;
  });
})();
