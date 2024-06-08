<script>
    import { page } from '$app/stores'
    export let data;

    let day = data.params.date.split("-")[2].split("+")[0]+ "/" +data.params.date.split("-")[1]+ "/" +data.params.date.split("-")[0];
    let timeStart = data.params.date.split("+")[1];
    let timeEnd = data.params.date.split("+")[2]
    // (day-time, status, customer, corteJSON)
    // status = ["Disponível", "Pendente", "Reservado"]; 0 1 e 2
    // 2024-03-15+10:20+10:40, Reservado, FERNANDO-CVK, {tesoura <bool>, sobrancelha <bool>, pezinho <bool>, quarto <int>})
    // day-month-year-start-end
    let tes, sob, pez;
    let total = 0;
    let qtdcortes, incluidosob;
    if (data.clubeInfo) {
        qtdcortes = data.clubeInfo.qtdcortes;
        incluidosob = data.clubeInfo.incluidosob;
    }
    $: total = (qtdcortes ? 0 : 1300) + (tes ? 300 : 0) + (sob && (!incluidosob || !(qtdcortes > 0)) ? 300 : 0) + (pez && !(qtdcortes > 0) ? 100 : 0);

</script>

<section>
    <h1>Reservar Korte</h1>
    <h3>Dia: {day}</h3>
    <h3>Horário: {timeStart} a {timeEnd}</h3>
    <!-- Forms inicial (quarto do corte pra segundo ano, tipo de corte) -->
    
    <form class="dataForm" method="POST" action="?/reserve">
        <h2>Customize seu corte!</h2>
        <p>Corte padrão na máquina: R$13,00</p>
        
        <label class="container">Tesoura? (+R$3,00)
            <input bind:checked={tes} name="tesoura" type="checkbox">
            <span class="checkmark"></span>
        </label>
          
        <label class="container">Sobrancelha? (+R$3,00)
            <input bind:checked={sob} name="sobrancelha" type="checkbox">
            <span class="checkmark"></span>
        </label>
          
        <label class="container">Pezinho? (+R$1,00)
            <input bind:checked={pez} name="pezinho" type="checkbox">
            <span class="checkmark"></span>
        </label>

        {#if $page.data.user.squad != "CVK"}
        <label class="roomLabel" for="quarto">Quarto</label>
        <input class="roomInput" type="number" name="quarto" required>
        {/if}

        {#if data.clubeInfo}
        <p style="color: red">O clube pode cobrir mais {data.clubeInfo.qtdcortes} corte(s).</p>
        {#if data.clubeInfo.incluidosob}
        <p style="color: red; text-align: center">Se deseja sobrancelha, marque a opção "Sobrancelha?". Sua inscrição no clube te isenta de pagá-la.</p>
        {/if}
        {#if data.clubeInfo.qtdcortes > 0}
        <p style="color: red; text-align: center">Se deseja pezinho, marque a opção "Pezinho?". Sua inscrição no clube te isenta de pagá-la.</p>
        {/if}
        {/if}

        <h3>Valor total: R${total.toString().substring(0, total.toString().length - 2) + "," + total.toString().substring(total.toString().length - 2)}</h3>

        <button class="submitButton" type="submit">Reservar Korte</button>
    </form>
    <!-- Cálculo automático do preço -->
    <!-- Explicação do pix -->

    <!-- Deixar no pendente e criar DB de pendência -->

    <!-- Criar código pix pra pagamento, e página do código pix e tudo mais -->
    <!-- Criar área no perfil pro cara acessar o pagamento -->

    <!-- Se não pagar: deixar disponível dnv -->
    <!-- Pagando: reservar e enviar confirmação -->

</section>

<style>
    form label, form p {
        font-size: 18px;
    }
    form p, form h3 {
        margin: 14px 0;
    }
    form h2, h3 {
        margin: 0 0 .6em;
        text-align: center;
        width: 100%;
    }
    form .roomLabel {
        font-size: 22px;
        width: 60%;
        margin: 1em 0;
        padding-left: 5%;
        text-align: left;
    }
    form .roomInput {
        font-size: 22px;
        width: 30%;
        margin: 1em 0;
    }

/* Customize the label (the container) */
.container {
    text-align: left;
    width: 100%;
    position: relative;
    padding-right: 35px;
    margin: 12px 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border: solid 2px black;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>