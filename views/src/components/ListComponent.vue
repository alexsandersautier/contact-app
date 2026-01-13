<script setup>
import { onMounted, ref } from 'vue';
import CardComponent from './CardComponent.vue';
import { useContactService } from '../services/contacts.service';
import axios from 'axios';
import { useRouter } from 'vue-router';

const serviceContact = useContactService()
const contacts = ref(null)
const showModal = ref(false)
const nameToDelete = ref('')
const idDelete = ref()
const router = useRouter()

async function getData() {
    const response = await serviceContact.getAll()
    contacts.value = response.data
}

function handleClickDelete(id, name) {
    showModal.value = !showModal.value
    nameToDelete.value = name
    idDelete.value = id
}

async function deleteContact() {
    const response = await axios.delete(import.meta.env.VITE_URL_API + 'contacts/' + idDelete.value, {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
    showModal.value = !showModal.value
    await getData()

}

onMounted(() => getData())
</script>

<template>
    <section class="flex gap-4 flex-wrap justify-center items-center">
        <CardComponent 
            v-for="contact in contacts" 
            :key="contact.id" 
            :id="contact.id"
            :contact="contact.contact"
            :name="contact.name" 
            :email="contact.email"
            :picture="contact.picture"
            @delete="handleClickDelete(contact.id, contact.name)"
        />
    </section>
    <dialog id="my_modal_1" class="modal" :class="{'modal-open': showModal}">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Delete</h3>
            <p class="py-4">Do you really want to delete the contact {{ nameToDelete }}?</p>
            <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary mr-2" @click="deleteContact">Confirm</button>
                <button class="btn btn-error" @click="showModal = false">Cancel</button>
            </form>
            </div>
        </div>
    </dialog>
</template>