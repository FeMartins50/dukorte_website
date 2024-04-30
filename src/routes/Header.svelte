<script>
    import { fly } from 'svelte/transition';
    import { page, navigating } from '$app/stores';
    let isMenuOpen = false;
    $: {
        isMenuOpen = $navigating;
        isMenuOpen = false;
    };
</script>

<header>
    <a href="/" id="mainLogo">Di Lima <span style="color: yellow; font-family: inherit">DU KORTE</span></a>

    <nav id="nav_in_header">
        {#if !$page.data.user}
        <a href="/agenda">Agenda</a>
        <a href="/login">Entrar</a>
        {:else if $page.data.user.role == "Admin"}
        <a href="/agenda">Agenda</a>
        <a href="/admin">Admin</a>
        <a href="/perfil">Perfil</a>
        {:else if $page.data.user}
        <a href="/agenda">Agenda</a>
        <a href="/perfil">Perfil</a>
        {/if}
    </nav>
    <!-- Menu Icon -->
    <button on:click={() => {isMenuOpen = isMenuOpen ? false : true}}>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M8.01562 6.98193C7.46334 6.98193 7.01562 7.43285 7.01562 7.98513C7.01562 8.53742 7.46334 8.98833 8.01563 8.98833H15.9659C16.5182 8.98833 16.9659 8.53742 16.9659 7.98513C16.9659 7.43285 16.5182 6.98193 15.9659 6.98193H8.01562Z"
                fill="currentColor"
            />
            <path
                d="M7.01562 12C7.01562 11.4477 7.46334 10.9968 8.01562 10.9968H15.9659C16.5182 10.9968 16.9659 11.4477 16.9659 12C16.9659 12.5523 16.5182 13.0032 15.9659 13.0032H8.01563C7.46334 13.0032 7.01562 12.5523 7.01562 12Z"
                fill="currentColor"
            />
            <path
                d="M8.0249 15.0122C7.47262 15.0122 7.0249 15.4631 7.0249 16.0154C7.0249 16.5677 7.47262 17.0186 8.0249 17.0186H15.9752C16.5275 17.0186 16.9752 16.5677 16.9752 16.0154C16.9752 15.4631 16.5275 15.0122 15.9752 15.0122H8.0249Z"
                fill="currentColor"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z"
                fill="currentColor"
            />
        </svg>
    </button>
</header>

{#if isMenuOpen}
<div class="menu" in:fly|local={{ y: -700, duration: 300 }}>
    {#if !$page.data.user}
    <a href="/agenda">Agenda</a>
    <a href="/login">Entrar</a>
    {:else if $page.data.user.role == "Admin"}
    <a href="/agenda">Agenda</a>
    <a href="/admin">Admin</a>
    <a href="/perfil">Perfil</a>
    {:else if $page.data.user}
    <a href="/agenda">Agenda</a>
    <a href="/perfil">Perfil</a>
    {/if}
</div>
{/if}

<style>
    @import url("https://fonts.googleapis.com/css?family=Protest+Strike");
    header {
        z-index: 2;
        width: 100%;
        padding: 0 1em;
        background: rgb(114,164,114,1);
        
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
    }
    #mainLogo {
        margin: 0.4em;
        padding: 0.3em 0.6em;
        border-radius: 0.2em;
        background-color: rgb(94, 144, 94);

        font-size: 2em;
        font-family: "Protest Strike" !important;
    }
    @media (orientation: landscape) {
        .menu {display: none}
        button {display: none}
        nav {display: inline}
    }
    @media (orientation: portrait) {
        .menu {display: flex}
        button {display: inline}
        nav {display: none}
    }
    nav a {
        padding: 0.2em 0.2em;
        margin: 0 2em;
    }
    .menu {
        z-index: 1;
        position: absolute;
        width: 100vw;
        padding: 3.2em 0 0 0;

        flex-flow: column;
        font-size: 1.8em;
        text-align: center;
        background-color: rgb(149, 190, 149);
    }
    .menu a {
        border-radius: .5em;
        border-left: 2px solid yellow;
        border-right: 2px solid yellow;
        margin: 0.5em 1em;
        padding: 1em 0.5em;
        background: rgb(0, 0, 0, .1)
    }
    header button {
        margin: 1em;
    }
    header svg {
        background: rgb(114,164,114,1);
        transform: scale(2);
        border-radius: 0.2em;
    }
    a:hover { text-decoration: underline; }
</style>