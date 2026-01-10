<script setup>
import { watch } from 'vue'

const props = defineProps({
    type: String,
    message: String,
    show: Boolean
})
const emit = defineEmits(['update:show'])

watch(() => props.show, (newValue) => {
    if (newValue) {
        setTimeout(() => {
            emit('update:show', false)
        }, 3000)
    }
})
</script>


<template>
    <div v-if="show" class="toast custom-toast">
        <div class="alert" :class="type">
            <span>{{ message }}</span>
        </div>
    </div>
</template>

<style scoped>
.custom-toast {
    top: 1rem;
    left: 1rem;
}

@media (min-width: 1024px) {
    .custom-toast {
        top: unset;
        left: unset;
        bottom: 1rem;
        right: 1rem;
    }
}
</style>