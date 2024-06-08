<script>
    import { createSchedule } from "./schedule";
    import util from "$lib/util.js";

    export let data;
    let bookingPreview = {
        day: "",
        time: "00:00",
        duration: 0,
        pause: 0,
        quantity: 0
    };
    let processedPreview = [];
    $: processedPreview = createSchedule(bookingPreview.time, Number(bookingPreview.duration), Number(bookingPreview.pause), Number(bookingPreview.quantity))
    
    // Statistics Calculations
    function calcBookingsProfit (bookings) {
        let profit = 0;
        for (let i = 0; i < bookings.length; i++) {
            let qtdcortes = bookings[i].corteJSON.qtdcortes;
            profit += 13 + (qtdcortes > 0 ? 0 : 13) + (tesoura ? 3 : 0) + (sobrancelha && !incluidosob && !(qtdcortes > 0) ? 3 : 0) + (pezinho && !(qtdcortes > 0) ? 1 : 0)
        }

        return 0;
    }
    
    let date = new Date(new Date().getTime() - 3*60*60*1000);
    let monStr = date.toISOString().substring(0, 8);
    let profit = [];

    profit = data.bookings.filter(booking => (booking.date.substring(0, 8) >= monStr) && (booking.status));
    // valueStr.substring(0, valueStr.length - 2) + "," + valueStr.substring(valueStr.length - 2)
    let monthProfit = 0;
    profit.filter(booking => booking.date.startsWith(monStr)).forEach(booking => monthProfit += booking.value);
    let lifeProfit = 0;
    profit.forEach(booking => monthProfit += booking.value);
    let meanMonthProfit = 0;
    let clubeSigners = data.clube.length;
    let clubeProfit = 0;
    data.clube.forEach(user => { clubeProfit += user.incluidosob ? 37.99 : 32.99});
    let monthCortes = data.bookings.filter(booking => (booking.status == 2) && (booking.date.substring(0, 8) >= monStr)).length;
    let lifeCortes = data.bookings.filter(booking => booking.status == 2).length;
    let meanMonthCortes = 0;
    // End of Statistics calculations
</script>

<section>
    <h1>Painel do <strong style="color: red">ADMIN</strong></h1>
    <h2>Horários</h2>
    <div class="container">
        <div class="overflowWrapper">
            <div class="table" id="bookingsTable">
                <div class="caption">
                    Total de cortes registrados: {data.bookings.length}
                </div>
                {#if data.bookings.length}
                <div class="tableContent">
                    <p class="head">Data</p>
                    <p class="head">Status</p>
                    <p class="head">Cliente</p>
                    <p class="head">TES - SOB - PÉ</p>
                    
                    {#each data.bookings as row, i}
                    <p class={i % 2 ? "odd" : "even"}>{util.parseDate(row.date)}</p>
                    <p class={i % 2 ? "odd" : "even"}>{row.status}</p>
                    <p class={i % 2 ? "odd" : "even"}>{row.customer.split("-")[0] ? row.customer.split("-")[0] : "-"}</p>
                    <div class="espec {i % 2 ? "odd" : "even"}">{@html util.parseEspec(row.corteJSON)}</div>
                    {/each}
                </div>
                {/if}
            </div>
        </div>
        <div id="bookingsCreate">
            <form class="dataForm" method="POST" action="?/create">
                <label>Dia dos cortes:
                    <input bind:value={bookingPreview.day} type="date" name="day" required>
                </label>
                
                <label>Primeiro horário:
                    <input bind:value={bookingPreview.time} type="time" name="time" required>
                </label>

                <label>Duração (min):
                    <input bind:value={bookingPreview.duration} type="number" name="duration" required>
                </label>

                <label>Pausa (min):
                    <input bind:value={bookingPreview.pause} type="number" name="pause" required>
                </label>

                <label>Quantidade:
                    <input bind:value={bookingPreview.quantity} type="number" name="quantity" required>
                </label>

                <button class="submitButton" type="submit">Marcar Horários</button>
            </form>
            <div class="table" id="previewTable">
                <div class="caption">
                    Cortes previstos: {processedPreview.length}
                </div>
                {#if processedPreview.length}
                <div class="thead">
                    <div class="row">
                        <p style="width: 50%;">Início</p>
                        <p style="width: 50%;">Fim</p>
                    </div>
                </div>
                <div class="tbody">
                    {#each processedPreview as row}
                    <div class="row">
                        <p style="width: 50%;">{row.start}</p>
                        <p style="width: 50%;">{row.end}</p>
                    </div>
                    {/each}
                </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<section>
    <h1>Estatísticas</h1>
    <div class="infoTable">
        <h3 class="infoSubtitle">Apenas cortes (sem contar clube)</h3>
        <div class="box">
            <p>Lucro do mês</p>
            <p><strong>R${monthProfit}</strong></p>
        </div>
        <div class="box">
            <p>Lucro vitalício</p>
            <p><strong>R${lifeProfit}</strong></p>
        </div>
        <div class="box">
            <p>Lucro mensal médio</p>
            <p><strong>R${meanMonthProfit}</strong></p>
        </div>
        <h3 class="infoSubtitle">Info do Clube</h3>
        <div class="box">
            <p>Assinantes</p>
            <p><strong>{clubeSigners} assinante(s)</strong></p>
        </div>
        <div class="box">
            <p>Lucro do clube</p>
            <p><strong>R${clubeProfit}</strong></p>
        </div>
        <h3 class="infoSubtitle">Quantidade total de cortes</h3>
        <div class="box">
            <p>Cortes do mês</p>
            <p><strong>{monthCortes} corte(s)</strong></p>
        </div>
        <div class="box">
            <p>Cortes vitalício</p>
            <p><strong>{lifeCortes} corte(s)</strong></p>
        </div>
        <div class="box">
            <p>Quantidade mensal média</p>
            <p><strong>{meanMonthCortes} c/mês</strong></p>
        </div>
    </div>
</section>

<style>
    .container {
        width: 100%;
        margin: 1em 0;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }
    #bookingsCreate {
        max-width: 100%;

        display: flex;
        align-items: center;
        flex-flow: column;
    }
    h1,h2 {
        margin: 1em;
        text-align: center;
    }

    /* Table Custom */
    .overflowWrapper {
        max-height: 40vh;
        max-width: 95vw;
        overflow: auto;
        padding: .5em;
        border-radius: .5em;
        
        background-color: rgb(230,230,230);
    }
    .table {
        min-width: 600px;
        min-height: min-content;
        padding: .5em;

        display: flex;
        flex-flow: column;
        
        text-align: center;
    }
    #previewTable {
        min-width: 300px;
    }
    .table .caption {
        max-width: 100%;
        margin: .5em 0;
    }
    .table p, .table div {
        padding: 0.4em;
        border: 2px solid black;
    }
    .tableContent {
        display: grid;
        grid-template-columns: 30% 10% 30% 30%;
    }
    .espec {
        display: flex;
        flex-flow: row;
        justify-content: space-around;
    }
    /* Color Code */
    .tableContent .head { background-color: rgb(100, 140, 100); }
    .tableContent .odd { background-color: rgb(230,230,230); }
    .tableContent .even { background-color: rgb(210,210,210); }

    form label {
        width: 100%;
    }
    form input {
        width: 100%;
    }
    form input, form label {
        margin-bottom: 1em;
    }

    /* Second Section */
    .infoTable {
        width: 100%;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: .5em;
        column-gap: 1%;
    }
    .infoSubtitle {
        grid-column: 1 / 4;
    }
    .infoTable .box {
        max-width: 300px;
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        
        justify-self: center;
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        background-color: rgba(130, 190, 250, 0.5);
        box-shadow: 0 2px 2px rgba(80, 110, 150, 0.4);
        text-align: center;
    }
</style>