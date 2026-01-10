<script setup>
import { useNotification } from '@/composables/useNotification';
import { useAuthService } from '@/services/auth.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const notification = useNotification()
const auth = useAuthService()
const router = useRouter()

const formData = ref({
    username: '',
    password: ''
})

async function handleLoginClick() {
    if (!formData.value.username || !formData.value.password) {
        notification.error('username and password are requireds')
    }

    const response = await auth.login(formData.value.username, formData.value.password)
    if (response) {
        router.push({name: 'home'})
    }
}

async function handleLoginRegister() {
    router.push({name: 'register'})
}
</script>

<template>
    <section class="w-dvw h-full flex flex-col justify-center items-center">
        <div class="card w-96 bg-base-100 card-xl shadow-sm">
            <div class="card-body">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Username</legend>
                    <input type="text" class="input" placeholder="..." v-model="formData.username"/>
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Password</legend>
                    <input type="password" class="input" placeholder="..." v-model="formData.password"/>
                </fieldset>
                <div class="justify-end card-actions">
                    <button class="btn btn-primary" @click="handleLoginClick">Login</button>
                    <button class="btn btn-ghost" @click="handleLoginRegister">Register</button>
                </div>
            </div>
        </div>
    </section>
</template>