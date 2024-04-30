<script>
    export let corte = {
        date: "0000-00-00+00:00+00:00",
        status: "loadError"
    };
    export let loggedIn = false;
    let timeStart = corte.date.split("+")[1];
    let timeEnd = corte.date.split("+")[2]
</script>

{#if corte.status == "Disponível" && loggedIn}
<a href="/agenda/buy-{corte.date}" class="{corte.status}">
    <h3>{timeStart} - {timeEnd}</h3>
    <p>{corte.status}</p>
</a>
{:else}
<div class="{corte.status}">
    <h3>{timeStart} - {timeEnd}</h3>
    <p>{corte.status}</p>
</div>
{/if}

<style>
    @import url("https://fonts.googleapis.com/css?family=Lato");
    * {
        font-family: "Lato";
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    div, a {
        margin: .6em;
        padding: 1em;
        border-radius: 1em;
        border: 2px solid black;

        display: inline-flex;
        flex-flow: column;
        align-items: center;
    }
    div h3, a h3 {
        font-size: 20px;
        text-align: center;
    }
    div p, a p {
        font-size: 16px;
        text-align: center;
    }
    /* korte status color code */
    .Reservado {
        background: rgba(180, 100, 100, 0.6);
    }
    .Pendente {
        background: rgba(160, 180, 100, 0.6);
    }
    .Disponível {
        background: rgba(100, 180, 150, 0.6);
        transition: ease-in-out .1s;
    }
    .Disponível:hover {
        transform: scale(1.2);
    }
</style>