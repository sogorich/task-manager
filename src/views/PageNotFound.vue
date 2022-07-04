<template>
	<Teleport to="body">
		<div class="page-not-found">
			<h1>😭 404</h1>
		</div>
	</Teleport>
</template>

<script setup>
</script> 

<style scoped>
.page-not-found {
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;

	height: calc(100vh - 70px);
}
</style>