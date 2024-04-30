<script>
	import { page } from '$app/stores';
</script>

<h1>Erro no servidor!</h1>
<p>{$page.error.message}</p>

<style>
	h1, p {
		width: 100vw;
		text-align: center;
	}
</style>