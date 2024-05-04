<script>
    import { page } from '$app/stores';
</script>

<footer>
    <div>
        <p>Contatos</p>
        <a href="/contate-nos">
            <p>Deixe sua mensagem</p>
        </a>
        <a href="/contate-nos">
            <p>FAQ</p>
        </a>
    </div>
    <div>
        <p>Barbearia</p>
        <a href="/agenda">
            <p>Agenda</p>
        </a>
        {#if $page.data.user}
        <a href="/perfil">
            <p>Perfil</p>
        </a>
        {/if}
    </div>
    <div>
        <p>Dev: FeMartins</p>
        <a href="https://github.com/FeMartins50" target="_blank">
            <p>Dev</p>
        </a>
    </div>
</footer>

<style>
    @import url("https://fonts.googleapis.com/css?family=Commissioner");
    footer {
        min-height: 30vh;
        width: 100%;

        padding: 5vh 0;
        background-color: rgb(62, 62, 62);
        color: white;

        display: flex;
        flex-flow: row wrap;
        align-items: baseline;
    }
    div {
        height: 100%;
        min-width: 200px;
        flex-grow: 1;

        padding: 20px 8%;
        
        font-size: 14px;

        display: flex;
        flex-flow: column;
        text-align: left;
    }
    div p {
        line-height: 2em;
        font-weight: 800;
        font-family: "Commissioner";
    }
    div a p {
        line-height: 1.8em;
        font-weight: 400;
    }
    a:hover { text-decoration: underline; }
</style>