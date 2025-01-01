<template>
    <div>
        <FormKit type="form" :actions="false" class="p-4 mb-0 space-y-4 rounded-lg sm:p-6 lg:p-4">
            <label :for="id" class="block mb-1 text-sm font-medium text-gray-700">
                {{ label }}
                <span v-if="required" class="text-red-800">*</span>
            </label>
            <FormKit :id="id" :type="type" :placeholder="placeholder" v-model="internalValue" :validation="validation"
                :validation-label="label"
                class="w-full py-2 text-gray-800 transition duration-100 border rounded outline-none ring-indigo-300 focus:ring bg-gray-50" />
        </FormKit>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    },
    validation: {
        type: [Object, String],
        default: () => { }
    },
    required: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
</script>