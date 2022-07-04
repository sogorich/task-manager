<template>
	<TheHeader />
	
	<Teleport to="body">
		<Transition name="slide-fade">
			<AppNotification>
				<template #content>{{ getNotificationText }}</template>
			</AppNotification>
		</Transition>
	</Teleport>
	
	<Teleport to="body">
		<Transition>
			<AppModal v-if="getIsActive">
				<template #header>
					{{ 
						Object.is(currentComponent, 'createTask') ? 
							'💡 Добавить новую задачу' : '✍️ Редактирование задачи'
					}}
				</template>
				<template #content>
					<component :is="components[currentComponent]" v-if="isAdmin"></component>
					<strong v-else>У Вас недостаточно полномочий!</strong>
				</template>
			</AppModal>
		</Transition>
	</Teleport>	

	<div class="container">
		<router-view></router-view>
	</div>

</template>
 
<script setup>
	
	import AppNotification from '@/components/AppNotification'
	import TheHeader from '@/components/TheHeader'
	import TheAddTask from '@/components/TheAddTask'
	import TheChangeTask from '@/components/TheChangeTask'
	import AppModal from '@/components/AppModal'
	
	import axios from 'axios'
	import endpoint from '@/composables/endpoints'

	import { onMounted, shallowRef } from 'vue'
	import { storeToRefs } from 'pinia'
	import { getAuth } from 'firebase/auth'
	
	import { useNotification } from '@/stores/notification'
	import { useUsers } from '@/stores/users'
	import { useModal } from '@/stores/modal'

	import { useEventListener } from '@/composables/event'
	import { checkStateAndKey } from '@/composables/stateAndKey'
	
	const { getIsActive, currentComponent } = storeToRefs(useModal())
	const { createOrDestroy } = useModal()
	
	const components = shallowRef({
		createTask: TheAddTask,
		changeTask: TheChangeTask
	})

	const { getNotificationText } = storeToRefs(useNotification()) 
	const { isAdmin } = storeToRefs(useUsers())
	const { authWatcher } = useUsers()
	
	const auth = getAuth()
	
	authWatcher(auth)

	useEventListener(window, 'keydown', event => {	
		
		const openModalKey = 'N'
		
		if (Object.is(event.key, openModalKey)) {

			if (getIsActive.value) return false

			currentComponent.value = 'createTask'

			checkStateAndKey(getIsActive.value, event.key, openModalKey, createOrDestroy, true)
		}
	})

	onMounted(async () => {
		const { data } = await axios.get(endpoint('adminsList'))
		
		Object.keys(data).map(key => {			
			if (Object.is(data[key], localStorage.getItem('token'))) return isAdmin.value = true
		})
	})

</script> 

<style>
</style>