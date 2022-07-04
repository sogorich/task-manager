import { defineStore } from 'pinia'

export const useLoader = defineStore('loader', {
	state: () => ({
		isLoading: false,
	})
})