<script>
    import { page } from '$app/stores';
    export let data;

    import * as util from "$lib/util.js";
</script>

<section>
    <h2>Bem vindo {$page.data.user.name}!</h2>
    <br>
    <h3>Informações</h3>
    <div class="box">
        <div class="boxItem">
            <p>Nome:</p>
            <p>{$page.data.user.name}</p>
        </div>
        <div class="boxItem">
            <p>Turma:</p>
            <p>{$page.data.user.squad}</p>
        </div>
        <div class="boxItem">
            <p>Clube:</p>
            {#if data.clube}
            <p style="color:green">{data.clube.qtdcortes} CORTES</p>
            {:else}
            <p style="color:red">NÃO ASSINANTE</p>
            {/if}
        </div>
    </div>
    <br>
    <a href="/agenda/pagamento"class="linkButton"><h2 style="text-align: center">Verificar Pagamentos Pendentes</h2></a>
    <br>
    <div class="table">
        <div class="caption">
            Cortes Marcados - Total: {data.futureKortes.length}
        </div>
        {#if data.futureKortes.length}
        <div class="thead">
            <div class="row">
                <p style="width: 40%;">Data</p>
                <p style="width: 60%;">Especificações</p>
            </div>
        </div>
        <div class="tbody">
            {#each data.futureKortes as booking}
            <div class="row">
                <p style="width: 40%;">{util.parseDate(booking.date)}</p>
                <p class="espec" style="width: 60%;">{@html util.parseEspec(booking.corteJSON)}</p>
            </div>
            {/each}
        </div>
        {/if}
    </div>


    <div class="table">
        <div class="caption">
            Cortes Passados - Total: {data.pastKortes.length}
        </div>
        {#if data.pastKortes.length}
        <div class="thead">
            <div class="row">
                <p style="width: 40%;">Data</p>
                <p style="width: 60%;">Especificações</p>
            </div>
        </div>
        <div class="tbody">
            {#each data.pastKortes as booking}
            <div class="row">
                <p style="width: 40%;">{util.parseDate(booking.date)}</p>
                <p class="espec" style="width: 60%;">{@html util.parseEspec(booking.corteJSON)}</p>
            </div>
            {/each}
        </div>
        {/if}
    </div>
    <br>
    <br>
    <form action="/logout?/logout" method="POST">
        <button class="submitButton" type="submit">Logout</button>
    </form>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        padding: 3em 0;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    .linkButton {
        display: flex;
        justify-content: center;
        width: 600px;
        max-width: 80vw;
        padding: .5em;

        border-radius: .8em;
        border: solid 3px black;
        background-color: rgb(230, 230, 230);
        transition: all .1s;
    }
    .linkButton:hover {
        text-decoration: underline;
        transform: scale(1.05);
        background-color: rgb(200, 200, 200);
    }
    .linkButton h2 {
        color: black;
    }
    /* white and gray divs */
    .box {
        width: 80%;
        max-width: 600px;
        margin: 0.5em;
        padding: 1em;
        border-radius: 1em;
        background-color: rgb(230, 230, 230);
        display: flex;
        flex-flow: column;
    }
    .boxItem {
        width: 100%;
        padding: 0.1em;

        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }
    form {
        width: 40%;
        max-width: 400px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    
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