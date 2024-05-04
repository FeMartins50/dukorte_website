<script>
    import './styles.css';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Du Korte</title>
</svelte:head>

<div class="app">
    <Header />

    <main>
        <slot></slot>
    </main>

    <Footer />
</div>

<style>
.app {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    background: white;
}

main {
    display: flex;
    flex-flow: column;
    align-items: center;

    flex-grow: 1;
    width: 100vw;
    max-width: 100%;
    min-height: 90vh;
}
</style>