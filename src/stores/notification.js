import { defineStore } from 'pinia'

export const useNotification = defineStore('notification', {
	state: () => ({
		isActive: false,
		destoryTimeout: 3000,
		notificationText: ''
	}),
	getters: {
		getDestroyTimeout(state) {
			return state.destoryTimeout
		},
		getIsActive(state) {
			return state.isActive
		},
		getNotificationText(state) {
			return state.notificationText
		}
	},
	actions: { 
		createOrDestroy() {
			this.isActive = !this.isActive
		}
	}
})