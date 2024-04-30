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
    
    import * as util from "$lib/util.js";
</script>

<section>
    <h1>Painel do <strong style="color: red">ADMIN</strong></h1>
    <h2>Horários</h2>
    <div class="wrapper">
        <div class="overflowContainer">
            <div class="table" id="bookingsTable">
                <div class="caption">
                    Total de cortes registrados: {data.bookings.length}
                </div>
                {#if data.bookings.length}
                <div class="thead">
                    <div class="row">
                        <p style="width: 30%;">Data</p>
                        <p style="width: 10%;">Status</p>
                        <p style="width: 30%;">Cliente</p>
                        <p style="width: 30%;">TES - SOB - PÉ</p>
                    </div>
                </div>
                <div class="tbody">
                    {#each data.bookings as row}
                    <div class="row">
                        <p style="width: 30%;">{util.parseDate(row.date)}</p>
                        <p style="width: 10%;">{row.status}</p>
                        <p style="width: 30%;">{row.customer.split("-")[0] ? row.customer.split("-")[0] : "-"}</p>
                        <p class="espec" style="width: 30%;">{@html util.parseEspec(row.corteJSON)}</p>
                    </div>
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
    <br><br><br>
    <h2>Usuários</h2>
    <div class="wrapper">
        <div class="overflowContainer">
            <div class="table" id="loginTable">
                <div class="caption">
                    Total de usuários registrados: {data.users.length}
                </div>
                {#if data.users.length}
                <div class="thead">
                    <div class="row">
                        <p style="width: 25%;">Nome</p>
                        <p style="width: 12.5%;">Turma</p>
                        <p style="width: 12.5%;">Cargo</p>
                        <p style="width: 50%;">E-mail</p>
                    </div>
                </div>
                <div class="tbody">
                    {#each data.users as user}
                    <div class="row">
                        <p style="width: 25%;">{user.nome}</p>
                        <p style="width: 12.5%;">{user.turma}</p>
                        <p style="width: 12.5%;">{user.role}</p>
                        <p style="width: 50%;">{user.email}</p>
                    </div>
                    {/each}
                </div>
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    .wrapper {
        margin: 1em 0;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }
    #bookingsCreate {
        display: flex;
        align-items: center;
        flex-flow: column;

        max-width: 100%;
    }
    h1,h2 {
        margin: 1em;
        text-align: center;
    }

    /* Table Custom */
    .overflowContainer {
        display: flex;
        overflow: auto;

        padding: .5em;
        max-width: 95vw;
        max-height: 70vh;
    }
    .table {
        display: flex;
        min-height: min-content;
        min-width: 600px;
        flex-flow: column;
        
        background-color: rgb(230,230,230);
        padding: .5em;
        border-radius: .5em;
        text-align: center;
    }
    #previewTable {
        min-width: 300px;
    }
    .table .caption {
        max-width: 100%;
        margin: .5em 0;
    }
    .table p {
        padding: 0.4em;
        border: 2px solid black;
    }
    .row {
        display: flex;
        flex-flow: row;
    }
    .espec {
        display: flex;
        flex-flow: row;
        justify-content: space-around;
    }
    /* Color Code */
    .thead { background-color: rgb(100, 140, 100); }
    .tbody .row:nth-child(odd) { background-color: rgb(230,230,230); }
    .tbody .row:nth-child(even) { background-color: rgb(210,210,210); }

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