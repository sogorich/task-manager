<template>
	<div class="card">
		<div class="card-header">
			<h2>
				<slot name="header-text">Default header</slot>
			</h2>
			<slot name="type">
				<span>🤕 Ooops..</span>
			</slot>
		</div>  
		<div class="card-content">
			<slot name="content">Some super cool text...</slot>
		</div>
		<div class="card-footer">
			<div class="card-deadline">
				<img src="@/assets/calendar-icon.svg" alt="calendar" class="calendar-icon">&nbsp;<span class="card-deadline-date"><slot name="date-deadline"></slot></span>
			</div>
			<div class="card-btns" v-if="storeUsers.isAdmin">
				<button class="btn" @click.prevent="deleteTask">
					<slot name="delete-btn"></slot>
				</button>
				<button class="btn" @click.prevent="changeTask">
					<slot name="change-btn">Изменить</slot>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>	
	
	import { useTasks } from '@/stores/tasks'
	import { useUsers } from '@/stores/users'
	
	import { fillStore, decoratorMaster, changeFlagComponent } from '@/composables/reusable'
	
	const { removeTask } = useTasks()

	const storeUsers = useUsers()

	const props = defineProps({
		taskId: String
	})	

	async function deleteTask() {
		if (window.confirm('Вы действительно хотите удалить?')) {	
			await removeTask(props.taskId)
		}
	}	

	async function changeTask() {
		await decoratorMaster(async () => {
			changeFlagComponent('changeTask')
			
			await fillStore(props.taskId)
		})
	}
</script>

<style scoped>
.card {	
  width: 500px;
  height: auto;
  
  padding: 20px;
  margin-bottom: 50px;
  
  background-color: #fefefe;
  
  border-radius: 8px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center; 
}

.card-header > h2 {
  text-transform: uppercase;
  margin-bottom: 0;
}

.card-deadline {
  display: flex;
  align-items: center;
}

.card-deadline-date {
  font-weight: 500;
}

.card-content {
  line-height: 1.6;

  margin-bottom: 2rem; 
  margin-top: 2rem;
}

.calendar-icon {
	width: 30px;
	height: 30px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-btns{ 
	display: flex;
}

.card-btns > button:first-child {
	margin-right: 20px;
}

@media (max-width: 430px) {
	.card {
		width: 350px;
	}
	.card-footer {
		flex-direction: column;
	}
	.card-deadline {
		margin-bottom: 2rem; 
	}
}

@media (max-width: 380px) {
	.card {
		width: 270px;
	}
	.card-header {
		flex-direction: column-reverse;
	}
	.calendar-icon {
		width: 25px;
		height: 25px;
	}
	.card-btns > button:first-child {
		margin-right: 10px;
	}
}

@media (max-width: 350px) {
	.card-btns > button:first-child {
		margin-right: 10px;
	}
}
</style>