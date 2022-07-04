<template>
	<the-card :taskId="taskId">
		<template #header-text>{{ title }}</template>
		<template #type>
			<span class="card-badge" :class="
				{'card-badge-purple': Object.is(type, 'backend'), 
				'card-badge-orange': Object.is(type, 'frontend'), 
				'card-badge-green': Object.is(type, 'layout')
				}">{{ type }}</span>
		</template>
		<template #content>{{ text }}</template>
		<template #date-deadline>{{ dateDeadline.split('-').reverse().join('.') }}</template>
		<template #delete-btn>Удалить</template>
	</the-card>	
</template>

<script setup>
	
	import TheCard from '@/components/TheCard' 
	
	const props = defineProps({
		type: String,
		text: String,
		title: String,
		dateDeadline: String,
		taskId: String,
	})

</script>

<style scoped>
.card-badge {
  background: rgba(104, 104, 104, 0.4);
  color: rbg(51, 51, 51);
  
  padding: 8px;
  border-radius: 4px;
}

.card-badge-purple {
  color: rgb(102, 0, 102) !important;
  background: rgba(204, 51, 204, 0.4) !important;
}

.card-badge-orange {
  color: rgb(153, 51, 0) !important;
  background: rgba(255, 102, 0, 0.4) !important;
}

.card-badge-green {
  color: rgb(51, 102, 0) !important;
  background: rgba(0, 255, 0, 0.4) !important;
}
</style>