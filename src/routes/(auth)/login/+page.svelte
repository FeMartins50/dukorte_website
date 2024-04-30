<script>
    export let form;
</script>

<section>
    <form class="dataForm" method="POST" action="?/login">
        {#if form?.status == -1}
        <p id="errorMsg">Credenciais incorretas!</p>
        {/if}

        <label>Email:
            <input type="email" placeholder="Digite seu email..." name="email" required>
        </label>
        

        <label for="password">Senha:
            <input type="password" placeholder="Digite sua senha..." name="password" required>
        </label>

        <button class="submitButton" type="submit">Login</button>
        <p id="registerMsg">Não está registrado? <a href="/register">Crie uma conta!</a></p>
    </form>
</section>

<style>
    section {
        justify-content: center;
    }
    #errorMsg {
        width: 100%;
        text-align: center;
        color: red;
    }
    #registerMsg {
        margin: 1em;
    }
    #registerMsg a {
        color: green;
    }
</style>