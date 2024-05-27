<script>
    import { createSchedule } from "./schedule";
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
    
    import util from "$lib/util.js";
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
                <label for="day">Dia dos cortes:
                    <input bind:value={bookingPreview.day} type="date" name="day" required>
                </label>
                
                <label for="time">Primeiro horário:
                    <input bind:value={bookingPreview.time} type="time" name="time" required>
                </label>

                <label for="duration">Duração (min):
                    <input bind:value={bookingPreview.duration} type="number" name="duration" required>
                </label>

                <label for="pause">Pausa (min):
                    <input bind:value={bookingPreview.pause} type="number" name="pause" required>
                </label>

                <label for="quantity">Quantidade:
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
        max-height: 70vh;
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
</style>