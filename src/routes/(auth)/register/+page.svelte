<script>
    import { onMount } from 'svelte';
    export let form;
    // form?.status
    // 1 = success
    // 0 = pending
    // -1 = error in db server
    // -2 = email not available
    // -3 = username not available

    let password, confirmPassword;
    function validatePassword(){
        if(password.value != confirmPassword.value) {
            confirmPassword.setCustomValidity("Senhas não podem ser diferentes!");
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
    onMount(async () => {
        password.onchange = validatePassword;
        confirmPassword.onkeyup = validatePassword;
    })
</script>

<section>
    <form class="dataForm" method="POST" action="?/register">
        {#if form?.status == 1}
        <p id="errorMsg">Registrado com sucesso!</p>
        <!--Provisório! No futuro o usuário deve já logar automaticamente com o registro, ou autenticar o email sla. -->
        {:else if form?.status == -1}
        <p id="errorMsg">Erro no banco de dados! Tente novamente.</p>
        {:else if form?.status == -2}
        <p id="errorMsg">E-mail não disponível</p>
        {:else if form?.status == -3}
        <p id="errorMsg">Nome de usuário não disponível</p>
        {/if}

        <label>Nome de Guerra:
            <input type="text" placeholder="Digite seu nome..." name="nome" required>
        </label>
        
        <label>Turma:
            <select name="turma" required>
                <option value="CVK">CVK</option>
                <option value="THB">THB</option>
            </select>
        </label>

        <label>Email:
            <input type="email" placeholder="Digite seu e-mail..." name="email" required>
        </label>

        <label>Senha:
            <input bind:this={password} type="password" placeholder="Crie sua senha..." name="password" minlength="8" required>
        </label>
        
        <label>Confirmar Senha:
            <input bind:this={confirmPassword} type="password" placeholder="Digite de novo sua senha..." name="confirmpassword" minlength="8" required>
        </label>
        
        <button class="submitButton" type="submit">Registrar</button>
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
</style>