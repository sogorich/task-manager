<template>
	<Teleport to="body">
		<AppLoader v-if="isLoading" />
	</Teleport>
	<div class="all-tasks pt-2" v-if="getTasks.length">
		<div class="task" v-for="(task, idx) in getTasks" :key="idx">
			<TheTaskItem 
				:taskId="task.id"
				:type="task.type" 
				:text="task.text"
				:title="task.title"
				:date-deadline="task.dateDeadline"
			/>
		</div>
	</div> 
	<div class="pt-5 empty-tasks" v-else>
		👾 В данный момент активных задач нет. 
	</div>
</template> 

<script setup>
	
	import AppLoader from '@/components/AppLoader'
	import TheTaskItem from '@/components/TheTaskItem'
		
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	
	import { useTasks } from '@/stores/tasks'
	import { useLoader } from '@/stores/loader'
	
	const { getTasks } = storeToRefs(useTasks()) 
	const { isLoading } = storeToRefs(useLoader())	
	
	const { downloadTasks } = useTasks()
	
	onMounted(async () => {
		isLoading.value = true

		await downloadTasks()

		isLoading.value = false
	})
	
</script>

<style scoped>
.all-tasks {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.empty-tasks {
	font-size: 24px;
	font-weight: 500;
}

@media (max-width: 1080px) {
	.all-tasks {
		justify-content: center;
	}
}
</style>