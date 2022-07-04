<template>	
	<the-task-form 
        :callback="Object.is(callbackKey, 'create') ? addNewTask : changeTask" 
        :btnText="text">
    </the-task-form>
</template>

<script setup>	

	import TheTaskForm from '@/components/TheTaskForm'

	import { useTasks } from '@/stores/tasks'

    const props = defineProps({
        callbackKey: String,
        text: String
    })

	const { addNewTask, changeTask } = useTasks()
		
</script>