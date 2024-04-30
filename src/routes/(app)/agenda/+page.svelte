<script>
    import { typewriter } from "./transition.js";
    import Appointment from "./Appointment.svelte";
    export let data;
    
    let dayIndex = 0;
    let selectedDay = data.week[dayIndex];
    function selectTheDayBefore() {
        dayIndex--;
        return selectedDay = data.week[dayIndex]; 
    }
    function selectTheDayAfter() {
        dayIndex++;
        return selectedDay = data.week[dayIndex]; 
    }
</script>

<section>
    <h2 id="mainTitle">Agenda de Kortes</h2> 
    <div class=wrapper>
        <div class="header">
            {#if dayIndex < 1}
            <button class="ESQUERDA stuck">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
            </button>
            {:else}
            <button on:click={selectTheDayBefore} class="ESQUERDA">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
            </button>
            {/if}
            <div class="day">
                {#key selectedDay}
                <h3 in:typewriter={{ speed: 1 }}>{selectedDay.date}</h3>
                <p>Horários vagos: {selectedDay.kortes.filter(item => item.status == "Disponível").length}</p>
                {/key}
            </div>
            {#if dayIndex >= data.week.length - 1}
            <button class="DIREITA stuck">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
            </button>
            {:else}
            <button on:click={selectTheDayAfter} class="DIREITA">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
            </button>
            {/if}
        </div>

        {#key selectedDay}
        <div class="kortes">
            {#if selectedDay.kortes.length == 0}
            <h3>Nenhum horário registrado!</h3>
            {:else}
            {#each selectedDay.kortes as corte}
            <Appointment corte={corte} loggedIn={data.loggedIn}/>
            {/each}
            {/if}
        </div>
        {/key}
    </div>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
    #mainTitle {
        margin: 0.4em;
        padding: 1em;
        text-align: center;
        border-image: repeating-linear-gradient(30deg, red 0 10px, white 10px 20px, blue 20px 30px, white 30px 40px) 10 / 10px;
    }
    .wrapper {
        margin: 1em 0;
        width: 100%;
        
        display: flex;
        flex-flow: column;
    }
    .header{
        width: 100%;
        padding: 1em;
        height: 5em;
        border-bottom: solid 3px black;
        background-color: rgb(230, 230, 230, 0.5);
        
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        align-items: center;
    }
    .day {
        width: 600px;
        max-width: 80%;
        text-align: center;
    }
    .kortes {
        width: 100%;
        min-height: 50vh;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }
    button {
        height: 3em;
        width: 3em;
        flex-shrink: 0;
        display: flex;
        align-items: center;

        border: 3px black solid;
        background: rgba(100, 100, 100, 0.2);
        border-radius: 3em;
    }
    button.ESQUERDA {
        justify-content: start;
    }
    button.DIREITA {
        justify-content: end;
    }
    button svg {
        height: 2.4em;
    }
    button.ESQUERDA svg {
        transform: rotate(180deg);
    }
    button.stuck {
        background: rgba(100, 100, 100, 0.4);
    }
</style>