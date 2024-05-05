<script>
    export let data;
</script>

<section>
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

        <div class="overflowContainer">
            <div class="table">
                <div class="caption">
                    Total de usuários do clube: {data.clube.length}
                </div>
                {#if data.clube.length}
                <div class="thead">
                    <div class="row">
                        <p style="width: 50%;">Email</p>
                        <p style="width: 25%;">Quantidade</p>
                        <p style="width: 25%;">Sobrancelha?</p>
                    </div>
                </div>
                <div class="tbody">
                    {#each data.clube as user}
                    <div class="row">
                        <p style="width: 50%;">{user.email}</p>
                        <p style="width: 25%;">{user.qtdcortes}</p>
                        <p style="width: 25%;">{user.incluidosob}</p>
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
    h2 {
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