(() => {
  "use strict";

  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];

  document.addEventListener("DOMContentLoaded", () => {
    const navbar = $(".navbar");
    const botaoTopo = $("#btnTopo");
    const barra = document.createElement("div");
    barra.id = "barraProgresso";
    barra.setAttribute("aria-hidden", "true");
    document.body.appendChild(barra);

    function atualizarScroll() {
      const posicao = window.scrollY;
      navbar?.classList.toggle("navbar-scroll", posicao > 50);
      botaoTopo?.classList.toggle("visivel", posicao > 400);
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.width = `${altura > 0 ? Math.min(100, (posicao / altura) * 100) : 0}%`;
      destacarMenu();
    }

    function destacarMenu() {
      const secoes = $$("main section[id]");
      const ativo = secoes.find(secao => secao.getBoundingClientRect().top <= 140 && secao.getBoundingClientRect().bottom > 140);
      $$(".navbar .nav-link").forEach(link => {
        const selecionado = link.getAttribute("href") === (ativo ? `#${ativo.id}` : "#inicio");
        link.classList.toggle("active", selecionado);
        if (selecionado) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }

    window.addEventListener("scroll", atualizarScroll, { passive: true });
    atualizarScroll();

    $$('a[href^="#"]').forEach(link => {
      link.addEventListener("click", evento => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const destino = $(href);
        if (!destino) return;
        evento.preventDefault();
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
        const menu = $("#menu");
        if (menu?.classList.contains("show") && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });

    botaoTopo?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    const temaBotao = $("#btnDarkMode");
    const iconeTema = $("#btnDarkMode i");
    const preferenciaSistema = window.matchMedia("(prefers-color-scheme: dark)");

    function aplicarTema(escuro, salvar = false) {
      document.body.classList.toggle("dark-mode", escuro);
      temaBotao?.setAttribute("aria-pressed", String(escuro));
      temaBotao?.setAttribute("aria-label", escuro ? "Ativar modo claro" : "Ativar modo escuro");
      iconeTema?.classList.toggle("bi-moon-stars-fill", escuro);
      iconeTema?.classList.toggle("bi-sun-fill", !escuro);
      if (salvar) localStorage.setItem("tema", escuro ? "dark" : "light");
    }

    aplicarTema(localStorage.getItem("tema") ? localStorage.getItem("tema") === "dark" : preferenciaSistema.matches);
    temaBotao?.addEventListener("click", () => aplicarTema(!document.body.classList.contains("dark-mode"), true));
    preferenciaSistema.addEventListener?.("change", evento => {
      if (localStorage.getItem("tema") === null) aplicarTema(evento.matches);
    });

    const animar = (elemento, classe, limite = 0.15) => {
      if (!("IntersectionObserver" in window)) {
        elemento.classList.add(classe);
        return;
      }
      const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add(classe);
            observer.unobserve(entrada.target);
          }
        });
      }, { threshold: limite });
      observador.observe(elemento);
    };

    $$(".reveal").forEach(el => animar(el, "active"));
    $$(".reveal-left").forEach(el => animar(el, "active-left"));
    $$(".reveal-right").forEach(el => animar(el, "active-right"));
    $$(".zoom").forEach(el => animar(el, "zoom-active", 0.2));

    const contadores = $$(".counter[data-target]");
    const iniciarContadores = () => contadores.forEach(contador => {
      const destino = Number(contador.dataset.target);
      if (!Number.isFinite(destino) || destino < 0) return;
      const inicio = performance.now();
      const duracao = 1400;
      const atualizar = agora => {
        const progresso = Math.min((agora - inicio) / duracao, 1);
        contador.textContent = String(Math.floor(destino * progresso));
        if (progresso < 1) requestAnimationFrame(atualizar);
      };
      requestAnimationFrame(atualizar);
    });
    const secaoEstatisticas = $(".counter")?.closest("section");
    if (secaoEstatisticas && "IntersectionObserver" in window) {
      const observadorContadores = new IntersectionObserver((entradas, observer) => {
        if (entradas.some(entrada => entrada.isIntersecting)) {
          iniciarContadores();
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      observadorContadores.observe(secaoEstatisticas);
    } else if (contadores.length) iniciarContadores();

    window.addEventListener("load", () => {
      const loader = $("#loader");
      if (loader) window.setTimeout(() => loader.classList.add("loader-hide"), 300);
    }, { once: true });

    function mostrarToast(titulo, mensagem, tipo = "success") {
      const toast = document.createElement("div");
      toast.className = `toast-personalizado ${tipo}`;
      toast.setAttribute("role", tipo === "erro" ? "alert" : "status");
      const tituloElemento = document.createElement("strong");
      tituloElemento.textContent = titulo;
      const mensagemElemento = document.createElement("span");
      mensagemElemento.textContent = mensagem;
      toast.append(tituloElemento, document.createElement("br"), mensagemElemento);
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add("mostrar"));
      window.setTimeout(() => {
        toast.classList.remove("mostrar");
        window.setTimeout(() => toast.remove(), 500);
      }, 3500);
    }

    const formulario = $("#formContato");
    formulario?.addEventListener("submit", evento => {
      evento.preventDefault();
      const nome = $("input[name='nome']", formulario);
      const email = $("input[name='email']", formulario);
      const assunto = $("input[name='assunto']", formulario);
      const mensagem = $("textarea[name='mensagem']", formulario);
      const campos = [nome, email, assunto, mensagem].filter(Boolean);
      campos.forEach(campo => campo.classList.remove("is-invalid"));
      let valido = true;
      const marcarInvalido = campo => { campo?.classList.add("is-invalid"); valido = false; };
      if (!nome || nome.value.trim().length < 3) marcarInvalido(nome);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) marcarInvalido(email);
      if (!assunto || assunto.value.trim().length < 5) marcarInvalido(assunto);
      if (!mensagem || mensagem.value.trim().length < 10) marcarInvalido(mensagem);
      if (!valido) {
        mostrarToast("Verifique o formulário", "Preencha corretamente os campos destacados.", "erro");
        campos.find(campo => campo.classList.contains("is-invalid"))?.focus();
        return;
      }
      mostrarToast("Sucesso", "Mensagem validada. O formulário de demonstração não envia dados.");
      formulario.reset();
    });

    const tituloOriginal = document.title;
    document.addEventListener("visibilitychange", () => {
      document.title = document.hidden ? "Volte em breve! | Tech Solutions" : tituloOriginal;
    });
  });
})();
