let take = document.querySelector('[aria-label="Take case"]');
let noTake = document.body.innerHTML.includes("Unassigned");
let currentTime = "";
let nameCustomer;
let siteCustomer;
let caseId;

function alterEmailMudPage() {
  const customer = document.querySelectorAll('[aria-expanded="false"]')[9];
  customer.click();
  const cliente = document.querySelectorAll("material-select-dropdown-item")[0];
  cliente.click();
}

function getEmailBody(nameCustomer, caseId, siteCustomer) {
  return `
    <br> Oi ${nameCustomer} <br><br> Muito obrigado por agendar uma consultoria com o Time de Soluções Técnicas do Google. <br><br> O seu Representante do Google solicitou esta chamada em seu nome e te auxiliaremos no caso ${caseId} <br><br> no seguinte dia:  ${currentTime}.  <br><br> Por favor, verifique a sua caixa de entrada e acesse o convite no seu calendário. Siga as instruções específicas nele e confirme a sua participação. Para se preparar para a nossa chamada, por favor, revise a lista de tarefas vinculada aqui e complete as solicitações.<br><br>Se tiver qualquer dúvida antes da chamada ou se quiser adicionar outros participantes à reunião, basta nos informar respondendo a esta mensagem ou entrando em contato com o Representante do Google. Estamos animados para trabalhar com você! <br> Muito obrigado!";
  `;
}

function sendEmail() {
  const novoEmail = document.querySelector('[aria-label="Create new email"]');
  novoEmail.click();
  const newEmail2 = document.querySelector('[aria-label="Create a write card"]');
  newEmail2.click();
  nameCustomer = document.querySelector('[debug-id="contact-info-name"]').innerText;
  caseId = document.querySelector(".case-id").innerText;
  siteCustomer = document.querySelectorAll('[href*="google"]')[4].innerHTML;
}

function getAppointmentTime() {
  const log = document.querySelector('[aria-label="Case log"]');
  log.click();
  setTimeout(() => {
    const containers = document.querySelectorAll(".case-log-container");
    containers.forEach((container) => {
      if (container.classList.contains("active-case-log-container")) {
        const messages = container.querySelectorAll("case-message-view");
        messages.forEach((message) => {
          if (message.innerHTML.includes("Review case in Connect Sales")) {
            message.querySelector("div > div").click();
            setTimeout(() => {
              const rows = message.querySelectorAll("table > tbody > tr");
              currentTime = [...rows].reduce((acc, row) => {
                return row.innerText.includes("Appointment Time")
                  ? row.querySelector("td:last-child").innerText
                  : acc == ""
                  ? "Without schedule"
                  : acc;
              }, "");
              sendEmail();
            }, 1000);
          }
        });
      }
    });
  }, 1000);
}

setTimeout(() => {
  if (noTake) {
    take.addEventListener("click", function () {});
    take.click();
  }
}, 2000);

setTimeout(alterEmailMudPage, 4000);

setTimeout(getAppointmentTime, 6000);

setTimeout(() => {
  document.querySelector("#email-body-content-top-content").innerHTML = getEmailBody(nameCustomer, caseId, siteCustomer);
}, 10000);