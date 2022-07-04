<template>
	<nav class="navbar">
		<div class="logotype">
			<router-link :to="{name: 'homePageUrl'}">TASK MANAGER</router-link>
		</div>
		<div class="menu">
			<div class="menu-item" v-if="getIsAuth">
				<span @click="logout" class="logout-btn">
					Выход&nbsp;({{ getUsername ? getUsername : 'Имя не установлено' }})
				</span>
				<img :src="getUserAvatar" class="user-avatar">
			</div>
		</div>
	</nav>
</template>

<script setup>

	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	
	import { getAuth, signOut } from 'firebase/auth'
	import { showNotification } from '@/composables/showNotification'
	
	import { useUsers } from '@/stores/users'
	
	const { getIsAuth, getUsername, getUserAvatar } = storeToRefs(useUsers())

	const router = useRouter()
	const auth = getAuth()
	
	function logout() {
		
		if (!localStorage.getItem('token')) {
			return window.alert(`Не найден токен.\nПросто перезарузите страницу!`)
		}
		
		signOut(auth).then(() => {
			
			router.push({name: 'loginUrl'})
			showNotification('Вы вышли из системы!')

		}).catch((error) => window.alert(error))
	}
		
</script>

<style scoped>	
.navbar {
	background-color: #fff;
	padding: 20px;
	
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.menu-item {
	display: flex;
	align-items: center;
}

.menu-item > span{
	margin-right: 10px;
}

.logout-btn {
	cursor: pointer;
}

.logout-btn:hover{
	opacity: 0.9;
}

.user-avatar {
	width: 30px;
	height: auto;
	
	border-radius: 50%;
}

@media (max-width: 770px) {
	.navbar {
		flex-direction: column;
	}
}
</style>