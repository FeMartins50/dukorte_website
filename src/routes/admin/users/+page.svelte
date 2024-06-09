<script>
    export let data;
</script>

<section>
    <h2>Usuários</h2>
    <div class="container">
        <div class="overflowWrapper">
            <div class="table">
                <div class="caption">
                    Total de usuários registrados: {data.users.length}
                </div>
                {#if data.users.length}
                <div class="tableContent" id="loginTable">
                    <p class="head">Nome</p>
                    <p class="head">Turma</p>
                    <p class="head">Cargo</p>
                    <p class="head">E-mail</p>

                    {#each data.users as user, i}
                    <p class={i % 2 ? "odd" : "even"}>{user.nome}</p>
                    <p class={i % 2 ? "odd" : "even"}>{user.turma}</p>
                    <p class={i % 2 ? "odd" : "even"}>{user.role}</p>
                    <p class={i % 2 ? "odd" : "even"}>{user.email}</p>
                    {/each}
                </div>
                {/if}
            </div>
        </div>
    </div>
    <div class="container">
        <h2>Adicionar ao clube</h2>
        <form class="dataForm" method="POST" action="?/addClube">
            <label>Email:
                <input type="text" name="email" required>
            </label>

            <label>Sobrancelha?:
                <select name="sobrancelha" required>
                    <option value="true">SIM</option>
                    <option value="false">NÃO</option>
                </select>
            </label>

            <button class="submitButton" type="submit">Adicionar</button>
        </form>

        <div class="overflowWrapper">
            <div class="table">
                <div class="caption">
                    Total de usuários do clube: {data.clube.length}
                </div>
                {#if data.clube.length}
                <div class="tableContent" id="clubeTable">
                    <p class="head">Email</p>
                    <p class="head">Quantidade</p>
                    <p class="head">Sobrancelha?</p>

                    {#each data.clube as user, i}
                    <p class={i % 2 ? "odd" : "even"}>{user.email}</p>
                    <p class={i % 2 ? "odd" : "even"}>{user.qtdcortes}</p>
                    <p class={i % 2 ? "odd" : "even"}>{user.incluidosob}</p>
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
    h2 {
        margin: 1em;
        text-align: center;
    }

    /* Table Custom */
    .overflowWrapper {
        max-height: 40vh;
        max-width: 95vw;
        overflow: auto;
        padding: .5em;
        
        border-radius: .5em;
        background: rgb(230, 230, 230);
    }
    .table {
        min-width: 600px;
        min-height: min-content;
        padding: .5em;

        display: flex;
        flex-flow: column;

        text-align: center;
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
    }
    #loginTable { grid-template-columns: 25% 12.5% 12.5% 50%; }
    #clubeTable { grid-template-columns: 50% 20% 30%; }
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