<script>
    export let data;
    import { onMount } from 'svelte';
    import * as util from "$lib/util.js";

    let time = new Date().getTime();

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date().getTime();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
    // (pixQRCodeId, value, date, email, status, timeout)
</script>

<section>
    <h2>Lista de Pagamentos Pendentes</h2>
    {#each data.debts as debt}
    <div class="debtInfo">
        <h3>{util.parseDate(debt.date)}</h3>
        <div class="listItem">
            <p>Tempo restante:</p>
            <p>{Math.floor((debt.timeout - time)/(60*1000))} minutos</p>
        </div>
        <div class="listItem">
            <p>Valor:</p>
            <p>R${debt.value},00</p>
        </div>
        <form class="dataForm" encType="multipart/form-data" method="POST" action="?/saveVoucher">
            <input type="hidden" value={debt.date} name="date">
            <input type="hidden" value={debt.value} name="value">
            <input type="hidden" value={debt.pixId} name="pixId">
            <!-- Pra poder acessar de qual forms que é o envio.-->
            
            <label class="custom-file-upload" accept="pdf">
                <input type="file" name="voucher" required/>
                Enviar Comprovante (.pdf)
            </label>

            <button class="submitButton" type="submit">Enviar</button>
        </form>
    </div>
    {/each}
</section>

<style>
    .debtInfo {
        display: flex;
        flex-flow: column;
        align-items: center;
        margin: 10px 0;
        padding: 20px 40px;
        width: 600px;
        max-width: 90%;

        background-color: rgb(230, 230, 230);
        border-radius: 14px;
    }
    .listItem {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        width: 100%;
        margin: 8px 0;
    }

    input[type="file"] {
        display: none;
    }
    .custom-file-upload {
        border: 2px solid black;
        border-radius: 8px;
        display: inline-block;
        padding: 6px 12px;
        margin: 20px;
        background-color: rgb(230, 200, 200);
        text-align: center;
        cursor: pointer;
    }
</style>