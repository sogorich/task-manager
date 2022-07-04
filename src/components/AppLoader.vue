<template>
	<div class="loader">
		<span>🛸 Загрузка...</span>
	</div>
</template>

<style scoped>
.loader {
	left: 0;
	top: 0;
	
	width: 100%;
	height: 100%;
	
	position: fixed;
	background: #f8f8f8;
}

.loader > span {
	font-size: 40px;
	font-weight: 600;
	
	width: 100%;
	height: 100%;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	flex-direction: column;
}
</style>