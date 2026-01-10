import { ref } from "vue"

const message = ref('')
const show = ref(false)
const timeout = ref(5000)
const color = ref('success')
export function useNotification () {
    const success = (msg, duration = 5000) => {
        message.value = msg
        show.value = true
        timeout.value = duration
        color.value = 'success'
    }
    
    const warning = (msg, duration = 5000) => {
        message.value = msg
        show.value = true
        timeout.value = duration
        color.value = 'warning'
    }

    const error = (msg, duration = 5000) => {
        message.value = msg
        show.value = true
        timeout.value = duration
        color.value = 'error'
    }

    const info = (msg, duration = 5000) => {
        message.value = msg
        show.value = true
        timeout.value = duration
        color.value = 'info'
    }

    return {
        success,
        error,
        warning,
        info,
        message,
        show,
        timeout,
        color
    }
}