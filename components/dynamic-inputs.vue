<template>
    <div>
        <label :for="id" class="block mb-1 text-sm font-medium text-gray-700">
            {{ label }}
            <span v-if="required" class="text-red-800">*</span>
        </label>
        <FormKit :id="id" :type="type" :placeholder="placeholder" v-model="internalValue" :validation="validation"
            :validation-label="label" :options="options"
            class="w-full py-2 text-gray-800 transition duration-100 border rounded outline-none ring-indigo-300 focus:ring bg-gray-50" />
        <p v-if="validationMessage" class="text-sm text-red-600">{{ validationMessage }}</p>
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
    },
    options: {
        type: Array,
        // default: false
    }
});

const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const validationMessage = ref('');

const validate = () => {
    if (props.required && !internalValue.value) {
        validationMessage.value = `${props.label} is required`;
        return false;
    }
    if (props.validation) {
        const rules = props.validation.split('|');
        for (let rule of rules) {
            const [ruleName, ruleValue] = rule.split(':');
            if (ruleName === 'length' && internalValue.value.length < parseInt(ruleValue.split(',')[0])) {
                validationMessage.value = `${props.label} must be at least ${ruleValue.split(',')[0]} characters long.`;
                return false;
            }
        }
    }
    validationMessage.value = '';
    return true;
};

watch(internalValue, () => validate());

const emit = defineEmits(['update:modelValue']);
</script>