<template>
	<div class="header-and-button">
		<AppSuperTitle>
			<template #super-title>📋 Задачи на выполнение</template>
		</AppSuperTitle>
		
		<button class="btn" @click.prevent="addTask" :disabled="getIsActive" v-if="usersStore.isAdmin">
			Создать задачу
		</button>
	</div>
	
	<TheTasks />

	<footer class="footer">
		<div class="footer-logo">
			<img src="@/assets/footer-logo.png" alt="studio logotypo" class="footer-logo-img">
		</div>
		<div class="developer-info">
			<span><strong>Воплощаем идеи в реальность</strong></span>
			<span><a href="mail:commercial.offers@internet.ru">commercial.offers@internet.ru</a></span>
		</div>
	</footer>
</template>

<script setup>
	
	import TheTasks from '@/components/TheTasks'
	import AppSuperTitle from '@/components/AppSuperTitle'
	
	import { storeToRefs } from 'pinia'

	import { changeFlagComponent } from '@/composables/reusable'
	
	import { useUsers } from '@/stores/users'
	import { useModal } from '@/stores/modal'

	const usersStore = useUsers()
	const { getIsActive } = storeToRefs(useModal())

	function addTask() {
		changeFlagComponent('createTask')
	}
	
</script>

<style scoped>
.header-and-button {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-and-button > button {
	width: 200px;
	margin-top: 2rem;
}

.not-auth{ 
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
}

.footer {
	margin: 3rem 0 3rem 0;
	padding: 20px 20px 40px 20px;

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer-logo-img {
	width: 100px;
	height: auto;
}

.developer-info {
	padding: 10px;
	border-right: 4px solid #3366CC;

	display: flex;
	flex-direction: column;
}

@media (max-width: 770px) {
	.footer{ 
		flex-direction: column;
	}

	.developer-info {
		border-right: 0;
		border-bottom: 4px solid #3366CC;

		align-items: center;
	}
}

@media (max-width: 380px) {
	.developer-info{ 
		font-size: 14px;
	}
}

@media (max-width: 1080px) {
	.header-and-button {
		flex-direction: column-reverse;
	}
}

@media (max-width: 770px) {
	.header-and-button {
		flex-direction: column-reverse;
	}

	.header-and-button > h1 {
		font-size: 30px;
	}
}

@media (max-width: 770px) {
	.header-and-button {
		flex-direction: column-reverse;
	}

	.header-and-button > h1 {
		font-size: 24px;
	}
}

@media (max-width: 350px) {
	.header-and-button > h1 {
		font-size: 20px;
	}
}
</style>