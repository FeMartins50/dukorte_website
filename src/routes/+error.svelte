<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.error.message}</h1>
<p>ErrorId: {$page.error.id}</p>
<p>Status Code: {$page.error.status}</p>
<p>Por gentileza, mande print dessa tela para o Al Fernando, assim erros futuros podem ser consertados e evitados.</p>

<style>
	h1, p {
		width: 100vw;
		text-align: center;
	}
</style>