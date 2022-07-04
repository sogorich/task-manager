<template>
	<div class="login-container">
		<div class="login-container-text">
			<h1 class="pt-5">Войдите в аккаунт</h1>
			<p>Для работы в системе Вам необходимо пройти авторизацию, для этого предварительно у Вас должен быть зарегистрированный аккаунт на <a href="https://github.com/" target="_blank">github.com</a>.</p>
			<button type="submit" class="btn" @click.prevent="login">Авторизоваться</button>
		</div>
	</div>	
</template>

<script setup>
			
	import { useRouter } from 'vue-router'
	import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
	import { showNotification } from '@/composables/showNotification'
	
	const router = useRouter()
	
	const auth = getAuth()
	const provider = new GithubAuthProvider()
	
	function login() {
		signInWithPopup(auth, provider).then(result => {
			
			router.push({name: 'homePageUrl'})
			showNotification('Вы вошли в систему!')
			
		}).catch(error => window.alert(error))
	}
</script>
 
<style scoped>
.login-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.login-container-text{
	display: flex;
	flex-direction: column;
	
	max-width: 550px;
}
</style>