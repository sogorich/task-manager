import { storeToRefs } from 'pinia'
import { useNotification } from '@/stores/notification'

export function showNotification(text) {
	
	const { getDestroyTimeout, notificationText } = storeToRefs(useNotification())
	const { createOrDestroy } = useNotification()	
	
	notificationText.value = text
	
	createOrDestroy()
	
	setTimeout(() => createOrDestroy(), getDestroyTimeout.value)
}
