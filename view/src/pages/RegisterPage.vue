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
    router.push({ name: 'login' })
}

async function handleSaveClick() {
    if (!formData.value.username || !formData.value.password) {
        notification.error('username and password are requireds')
    }

    const response = await auth.createUser(formData.value.username, formData.value.password)
    if (response) {
        router.push({name: 'home'})
    }
}
</script>

<template>
    <section class="w-dvw h-full flex flex-col justify-center items-center">
        <div class="card w-96 bg-base-100 card-xl shadow-sm">
            <div class="card-body">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Username</legend>
                    <input type="text" class="input" placeholder="..." v-model="formData.username" />
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Password</legend>
                    <input type="password" class="input" placeholder="..." v-model="formData.password" />
                </fieldset>
                <div class="justify-end card-actions">
                    <button class="btn btn-ghost" @click="handleLoginClick">Login</button>
                    <button class="btn btn-primary" @click="handleSaveClick">Save</button>
                </div>
            </div>
        </div>
    </section>
</template>