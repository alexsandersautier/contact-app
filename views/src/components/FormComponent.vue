<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'

const notification = useNotification()
const router = useRouter()
const route = useRoute()
const editing = ref(false)

const props = defineProps({
  contact: String,
  name: String,
  email: String,
  picture: String,
})

const formData = ref({
  contact: '',
  name: '',
  email: '',
  picture: null
})

const currentID = ref(null)

function handleFile(e) {
  const file = event.target.files[0]
  formData.value.picture = file
}

async function handleSubmit() {
  const data = new FormData()
  data.append('contact', formData.value.contact)
  data.append('name', formData.value.name)
  data.append('email', formData.value.email)
  data.append('image', formData.value.picture)
  if (!editing.value) {
    await axios.post(import.meta.env.VITE_URL_API + 'api/v1/contacts', data, {
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('token') }
    })
  } else {
    if (!formData.value.picture) formData.delete('image')

    await axios.put(import.meta.env.VITE_URL_API + 'api/v1/contacts/' + currentID, data, {
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('token') }
    })
  }

  notification.success('Contact created successfully!')
  router.push({ name: 'home' })
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    editing.value = true
    currentID.value = id
    const response = await axios.get(import.meta.env.VITE_URL_API + `api/v1/contacts/${id}`, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
    formData.value = { ...response.data }
  } else {
    editing.value = false
  }
})
</script>

<template>
  <div class="w-full h-full">

    <div class="max-w-md mx-auto p-4 rounded shadow">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">

        <input v-model="formData.name" minlength="5" type="text" placeholder="Name" class="input input-bordered w-full" required />
        
        <input v-model="formData.contact" type="text" placeholder="Phone (9 digits)" maxlength="9" pattern="\d{9}"
          inputmode="numeric" class="input input-bordered w-full" required />


        <input v-model="formData.email" type="email" placeholder="Email" class="input input-bordered w-full" required />
        <figure class="h-48 w-full overflow-hidden" v-if="editing">
          <img :src="`data:image/png;base64,${formData.picture}`" :alt="name" class="h-full w-full object-cover" />
        </figure>
        <input type="file" accept="image/*" @change="handleFile" class="file-input file-input-bordered w-full" />

        <button type="submit" class="btn btn-primary mt-2">
          Save Contact
        </button>
      </form>
    </div>
  </div>
</template>
