<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    id: Number,
    name: String,
    email: String,
    picture: String
})

const emit = defineEmits(['delete'])
const router = useRouter()

async function handleDetails() {
  router.push({name: 'details', params: {id: props.id}})  
}

</script>

<template>
  <div class="card bg-base-100 w-96 shadow-sm">
    <figure class="h-48 w-full overflow-hidden">
      <img
        :src="`data:image/png;base64,${picture}`"
        :alt="name"
        class="h-full w-full object-cover"
      />
    </figure>

    <div class="card-body">
      <h2 class="card-title">{{ name }}</h2>
      <p>{{ email }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="handleDetails">See Details</button>
        <button class="btn btn-error" @click="emit('delete')">Delete</button>
      </div>
    </div>
  </div>
</template>
