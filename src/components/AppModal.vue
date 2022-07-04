<template>
	<div class="modal-overlay">
		<div class="modal">
			<div class="modal-header">
				<h2><slot name="header">Header</slot></h2>
				<span class="close-btn" @click="closeModal">&Cross;</span>
			</div>
			<div class="modal-content">
				<slot name="content">Lorem ipsum dolor sit amet.</slot>
			</div>
		</div>
	</div>
</template>

<script setup>
		
	import { storeToRefs } from 'pinia'
	
	import { useModal } from '@/stores/modal'
	import { useEventListener } from '@/composables/event'
	import { checkStateAndKey } from '@/composables/stateAndKey'
	import { clearDataTaskStore } from '@/composables/reusable'

	const { getIsActive } = storeToRefs(useModal())
	const { createOrDestroy } = useModal()
	
	function closeModal() {
		createOrDestroy()
		clearDataTaskStore()
	}

	useEventListener(window, 'keydown', event => {
		checkStateAndKey(getIsActive.value, event.key, 'Escape', createOrDestroy, false)

		if (Object.is(event.key, 'Escape')) {
			clearDataTaskStore()
		}
	})	
</script>

<style scoped>
.close-btn {
	cursor: pointer;
	transform: scale(1.2);
}

.modal-overlay {
	background-color: rgba(0, 0, 0, 0.6);

	left: 0;
	top: 0;
	
	height: 100vh;
	width: 100%;
	
	position: fixed;
		
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.modal {
	background-color: #f8f8f8;
	padding: 20px;
	
	width: 700px;
	
	border-radius: 4px;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	
	margin-bottom: 2rem;
}

@media (max-width: 430px) {
  .modal {
	width: 350px;	  
  }
  .modal-header > h2 {
	  font-size: 20px;
  }
}

@media (max-width: 380px) {
  .modal {
    width: 300px;
  }
  .modal-header > h2 {
	  font-size: 18px;
  }
}

@media (max-width: 350px) {
  .modal {
    width: 280px;
  }
  .modal-header > h2 {
	  font-size: 16px;
  }
}
</style>
