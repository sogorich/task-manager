<template>
	<div class="notification" v-if="getIsActive">
		<div class="notification-header"> 
			<h3><slot name="header">Уведомление</slot></h3>
		</div>
		<div class="notification-content">
			<slot name="content">Какой-то текст уведомления...</slot>
		</div>
	</div>
</template>

<script setup>
	
	import { storeToRefs } from 'pinia'
	import { useNotification } from '@/stores/notification'
	
	const { getIsActive } = storeToRefs(useNotification())
 	
</script>

<style scoped>
.notification {
  position: fixed;
  z-index: 9999;
  
  top: 0;
  right: 0;
	
  width: 300px;
  height: auto;
  
  padding: 20px;
  margin-right: 20px;
  margin-top: 20px;
  
  background-color: #fefefe;  
  
  border-radius: 8px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
}

.notification-header > h3{ 
	padding: 0;
	margin: 0;
}

.notification-content{
	padding: 15px 0 15px 0;
}
</style>