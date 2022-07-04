import axios from 'axios'
import endpoint from '@/composables/endpoints'

import { useTasks } from '@/stores/tasks'
import { useModal } from '@/stores/modal'

import { showNotification } from '@/composables/showNotification'

export async function requestOnGetTasks() {
    const { data } = await axios.get(endpoint('tasksList'))

    return data
}

export function emptyItem(item) {
    
    const clearArray = Object.values(item)
    clearArray.shift()

    for (const i of clearArray) {
        if (Object.is(i, '')) {
            showNotification('Вы заполнили не все данные!')   
            return false
        }
    }
    return true
}

export async function fillStore(id) {

    const storeTasks = useTasks()

    const data = await requestOnGetTasks()

    Object.keys(data).map(key => {
        if (Object.is(id, key)) {				
            Object.assign(storeTasks.taskFormData, {...data[key], id: key})
        }
    })
}

export async function decoratorMaster(func) {
    
    const storeTasks = useTasks()

    storeTasks.toggleSendingRequest()

    await func() 
    
    storeTasks.toggleSendingRequest()
}

export function clearDataTaskStore() {

    const storeTasks = useTasks()

    Object.keys(storeTasks.taskFormData).map(key => {
        Object.is(key, 'dateDeadline') ? 
            storeTasks.taskFormData[key] = dateNow() : storeTasks.taskFormData[key] = ''
    })
}

export function changeFlagComponent(flag) {

    const storeModal = useModal()

    storeModal.$patch((state) => {
        state.currentComponent = flag
    })

    storeModal.createOrDestroy()
}

export function dateNow() {
    return new Date().toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric'}).split('.').reverse().join('-')
}