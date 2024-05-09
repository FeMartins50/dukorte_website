<script>
    export let data;
    import * as util from "$lib/util.js";
</script>

<section>
    <a class="linkButton" href="/admin/gerenciar"><h2>GERENCIAR CORTES</h2></a>

    <h1>Kortes da Semana</h1>
    {#each data.week as day}
    <div class="table" id="loginTable">
        <div class="caption">
            {day.date} - Total de cortes: {day.kortes.length}
        </div>
        {#if day.kortes.length}
        <div class="thead">
            <div class="row">
                <p style="width: 30%">Data</p>
                <p style="width: 30%;">Nome</p>
                <p style="width: 15%;">Quarto</p>
                <p style="width: 25%;">TES - SOB - PÉ</p>
            </div>
        </div>
        <div class="tbody">
            {#each day.kortes as booking}
            <div class="row">
                <p style="width: 30%">{util.parseDate(booking.date)}</p>
                <p style="width: 30%;">{booking.customer.split("-")[0] ? booking.customer.split("-")[0] : "-"}</p>
                <p style="width: 15%;">{util.parseQuarto(booking.corteJSON)}</p>
                <p class="espec" style="width: 25%;">{@html util.parseEspec(booking.corteJSON)}</p>
            </div>
            {/each}
        </div>
        {/if}
    </div>
    {/each}

    <a class="linkButton" href="/admin/users"><h2>GERENCIAR USUÁRIOS</h2></a>
</section>

<style>
    /* Table Custom */
    .table {
        display: flex;
        min-height: min-content;
        width: 600px;
        max-width: 98vw;
        flex-flow: column;
        
        background-color: rgb(230,230,230);
        padding: .5em;
        margin: 1em;
        border-radius: .5em;
        text-align: center;
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
</style>