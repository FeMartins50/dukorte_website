<script>
    export let data;

    let selectedMembers = [];
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
    <h2>Clube</h2>
    <div class="container">
        <h3>Adicionar Membro</h3>
        <form class="dataForm" method="POST" action="?/addToClube">
            <label>Email:
                <input type="text" name="email" required>
            </label>

            <label>Quantidade:
                <input type="text" name="qtdcortes" value=4 required>
            </label>

            <label>Sobrancelha?:
                <select name="sobrancelha" required>
                    <option value="true">SIM</option>
                    <option value="false">NÃO</option>
                </select>
            </label>

            <button class="submitButton" type="submit">Adicionar</button>
        </form>

        <form method="POST">
            <div class="overflowWrapper">
                <div class="table">
                    <div class="caption">
                        Total de usuários do clube: {data.clube.length}
                    </div>
                    {#if data.clube.length}
                    <div class="tableContent" id="clubeTable">
                        <p class="head">{selectedMembers.length}</p>
                        <p class="head">Email</p>
                        <p class="head">Quantidade</p>
                        <p class="head">Sobrancelha?</p>

                        {#each data.clube as user, i}
                        <label class="labelContainer {i % 2 ? "odd" : "even"}">
                            <input name={user.email} type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                        <p class={i % 2 ? "odd" : "even"}>{user.email}</p>
                        <p class={i % 2 ? "odd" : "even"}>{user.qtdcortes}</p>
                        <p class={i % 2 ? "odd" : "even"}>{user.incluidosob ? "SIM" : "NAO"}</p>
                        {/each}
                    </div>
                    {/if}
                </div>
            </div>

            <div class="buttonWrapper">
                <button formaction="?/reset" class="submitButton" type="submit">Resetar</button>
                <button formaction="?/delete" style="background: rgb(200, 100, 100)" class="submitButton" type="submit">Deletar</button>
            </div>
        </form>
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
        margin: 1em 0 0;
        text-align: center;
    }
    h3 {
        margin: 1em 0 0;
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
    #clubeTable { grid-template-columns: 36px 50% 20% auto; }
    /* Color Code */
    .tableContent .head { background-color: rgb(100, 140, 100); }
    .tableContent .odd { background-color: rgb(230,230,230); }
    .tableContent .even { background-color: rgb(210,210,210); }

    .buttonWrapper {
        display:flex;
        flex-flow: row;
        justify-content: space-evenly;
    }

    /* Selection Style */
    .table label {
        padding: 0.4em;
        border: 2px solid black;
    }

    /* Customize the label (the container) */
.labelContainer {
    position: relative;
    
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.labelContainer input {
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 10%;
  right: 10%;
  height: 80%;
  width: 80%;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.labelContainer:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.labelContainer input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.labelContainer input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.labelContainer .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>