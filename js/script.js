// Script simples para duas funcoes:
// 1) Abrir/fechar menu no mobile
// 2) Enviar formulario para o WhatsApp com mensagem pronta

(function () {
  const menuButton = document.getElementById("menu-button");
  const menuList = document.getElementById("menu-principal");

  if (menuButton && menuList) {
    menuButton.addEventListener("click", function () {
      const aberto = menuList.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(aberto));
    });

    // Fecha o menu mobile quando a pessoa clica em um link
    menuList.addEventListener("click", function (event) {
      const alvo = event.target;
      if (!(alvo instanceof HTMLElement)) return;
      if (alvo.tagName !== "A") return;

      menuList.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  }

  const anoAtual = document.getElementById("ano-atual");
  if (anoAtual) {
    anoAtual.textContent = String(new Date().getFullYear());
  }

  const form = document.getElementById("form-reserva");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const pessoasInput = document.getElementById("pessoas");

    if (
      !(nomeInput instanceof HTMLInputElement) ||
      !(checkinInput instanceof HTMLInputElement) ||
      !(checkoutInput instanceof HTMLInputElement) ||
      !(pessoasInput instanceof HTMLInputElement)
    ) {
      alert("Nao foi possivel ler os campos do formulario.");
      return;
    }

    const nome = nomeInput.value.trim();
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const pessoas = pessoasInput.value;

    // Validacao simples para evitar data de saida menor que entrada
    if (checkin && checkout && checkout < checkin) {
      alert("A data de volta precisa ser igual ou maior que a data de ida.");
      return;
    }

    if (!nome) {
      alert("Preencha seu nome para continuar.");
      return;
    }

    const mensagem = [
      "Ola! Quero fazer uma reserva no Refugio Castelhanos.",
      "",
      "Nome: " + nome,
      "Dia de ida: " + checkin,
      "Dia de volta: " + checkout,
      "Pessoas: " + pessoas
    ].join("\n");

    const numero = "5512992090876";
    const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

    window.open(url, "_blank", "noopener,noreferrer");
  });
})();
