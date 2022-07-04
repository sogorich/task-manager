<template>
  <form @submit.prevent="callback" v-if="!storeTasks.sendingRequest">
    <input
      v-model.trim="taskData.title"
      type="text"
      placeholder="Введите название задачи"
      class="form-input"
      required
    />
    <textarea
      v-model.trim="taskData.text"
      class="form-input"
      placeholder="Подробное пояснение задачи"
      required
    ></textarea>
    <div class="form-group">
      <div class="select-wrapper">
        <input
        type="date"
        v-model="taskData.dateDeadline"
        class="form-input"
        required
      />
      </div>
      <div class="select-wrapper">
        <select class="form-input" v-model="taskData.type" required>
          <option disabled value="">Выберите категорию</option>
          <option value="backend">⚔️ Backend</option>
          <option value="frontend">🎯 ️Frontend</option>
          <option value="layout">🎲 Вёрстка</option>
        </select>
      </div>
      <button type="submit" class="btn">{{ btnText }}</button>
    </div>
  </form>
  <div class="unactive-form" v-else>Подождите...</div>
</template>

<script setup>

    import { reactive } from 'vue'
    import { useTasks } from "@/stores/tasks"

    const storeTasks = useTasks()
    const taskData = reactive(storeTasks.taskFormData)

    const props = defineProps({
        callback: Function,
        btnText: String
    })

</script>

<style scoped>
textarea {
	min-height: 200px;
}

.unactive-form {
	margin-bottom: 20px;
}

.form-group {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.form-group > input[type="date"] {
	flex: 33.33333%;
}

.form-group > .select-wrapper { 
	margin-right: 10px;
	margin-left: 10px;
	flex: 33.33333%;
}

.form-group > button {
	flex: 33.33333%;
}

@media (max-width: 430px) {
  .form-group {
    flex-direction: column;
  }

  .form-group > .select-wrapper { 
    width: 100%;
  }
  
  .form-group > button {
    margin-top: 10px;
  }
}
</style>
