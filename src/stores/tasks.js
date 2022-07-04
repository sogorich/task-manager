import axios from 'axios'

import { defineStore } from 'pinia'

import endpoint from '@/composables/endpoints'

import { showNotification } from '@/composables/showNotification'
import { emptyItem, fillStore, clearDataTaskStore, decoratorMaster, dateNow, requestOnGetTasks } from '@/composables/reusable'

export const useTasks = defineStore('tasks', {	
	state: () => ({
		tasks: [],
		taskFormData: {
			id: '',
			title: '',
			text: '',
			dateDeadline: dateNow(),
			type: ''
		},
		sendingRequest: false
	}),
	getters: {
		getTasks(state) {
			return state.tasks
		},
	},
	actions: {
		toggleSendingRequest() {
			this.sendingRequest = !this.sendingRequest
		},
		findObjectBeforeDelete(objId) {
			const indexFound = this.tasks.findIndex(el => el.id === objId)
			
			if (indexFound !== -1) this.tasks.splice(indexFound, 1)
		},
		async addNewTask() {

			if (!emptyItem(this.taskFormData)) return false

			await decoratorMaster(async () => {
				await this.createNewTask(this.taskFormData)

				clearDataTaskStore()
			})
		},
		async changeTask() {
			
			if (!emptyItem(this.taskFormData)) return false

			await decoratorMaster(async () => {
				await axios.put(endpoint('changeOrDeleteTask', this.taskFormData.id), this.taskFormData)
				await this.downloadTasks()

				await fillStore(this.taskFormData.id)

				showNotification('Данные задачи были обновлены!')	
			})			
		},
		async downloadTasks() {
			
			const data = await requestOnGetTasks()
			
			if (Boolean(data)) {
				Object.keys(data).map(key => {
		
					Object.assign(data[key], {id: key})
					
					this.findObjectBeforeDelete(key)

					this.tasks.push(data[key])			
				}) 
			}
		},
		async createNewTask(dataObject) {
			await axios.post(endpoint('tasksList'), dataObject)
			await this.downloadTasks()
			
			showNotification('Новая задача была добавлена!')
		},
		async removeTask(taskId) {			
			await axios.delete(endpoint('changeOrDeleteTask', taskId))
			
			showNotification('Задача была успешно удалена!')
			
			this.findObjectBeforeDelete(taskId)
		}
	}
})