import { defineStore } from 'pinia'

export const useModal = defineStore('modal', {
	state: () => ({
		isActive: false,
		currentComponent: 'createTask',
	}),
	getters: {
		getIsActive(state) {
			return state.isActive
		},
	},
	actions: {
		createOrDestroy() {
			this.isActive = !this.isActive
		}
	}
})