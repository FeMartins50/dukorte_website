<script>
    import { page } from "$app/stores";
    export let data;

    import util from "$lib/util.js";

    const cortes_precos = [
        ["Na máquina", "R$13.00"],
        ["Na tesoura", "+R$3.00"],
        ["Pézin na navalha", "+R$1.00"],
        ["Sobrancelha", "+R$3.00"]
    ];
</script>

<section>
    <div class="post">
        {#if !$page.data.user}
        <h3>NÃO CONECTADO</h3>
        <p>Sem informação de perfil.</p>
        <a class="linkButton" href="/login"><p>Fazer Login</p></a>
        {:else}
        <h3>Bem vindo {$page.data.user.name}!</h3>
        <a class="linkButton" href="/perfil">
            <p>Acessar Perfil</p>
        </a>

        <p>Você tem {data.pendingKortesQtd} pagamentos pendentes.</p>
        {#if data.pendingKortesQtd}
        <a class="linkButton" href="/agenda/pagamento">Verificar Pagamentos</a>
        {/if}

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

        {/if}
    </div>
</section>
<section>
    <div class="post">
        <h3>CABELO GRANDE?</h3>
        <br>
        <p><strong>Du Korte</strong> é a barbearia ideal para você, não importa qual for sua vontade. Seja na tesoura ou na máquina, navalhado e disfarçado, a Du Korte entrega.</p>
        <br>
        <a class="linkButton" href="/agenda"><p>Ver Agenda</p></a>
    </div>
    <div id="wrapper">
        <h3>Tabela de Preços</h3>
        <br><br>
        <div id="table">
            {#each cortes_precos as corte}
            <div class="item">
                <p>{corte[0]}</p>
                <p style="text-align: right">{corte[1]}</p>
            </div>
            {/each}
        </div>
    </div>
</section>

<style>
    /* white and gray divs */
    section {
        min-height: 40vh;
        width: 100%;
        padding: 7% 3%;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }
    section:nth-child(odd) {
        display: flex;
        flex-flow: row;
        background-color: rgba(255, 255, 255, 0.5);
    }
    section:nth-child(even) {
        display: flex;
        flex-flow: row wrap;
        background-color: rgba(230, 230, 230, 0.5);
    }
    .post {
        margin: 20px 0;
        max-width: 90%;
        width: 600px;

        display: flex;
        flex-flow: column;
        align-items: center;
        text-align: center;
    }
    .post p {
        text-align: justify;
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

    #wrapper {
        width: 600px;
        max-width: 100%;
        margin: 1em;
        padding: 2em;
        border-radius: 2em;

        background-color: rgb(134, 192, 177, 0.8);
        box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
    }
    #wrapper h3 {
        text-align: center;
    }
    #table {
        display: flex;
        flex-flow: column;
        justify-content: space-around;
    }
    .item {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }
    .item p {
        margin: 0.5em;
    }
</style>