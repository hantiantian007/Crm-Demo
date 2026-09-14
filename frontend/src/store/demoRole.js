import { reactive } from 'vue'

export const demoRoleState = reactive({
  role: 'CLIENT'
})

export const setDemoRole = (role) => {
  demoRoleState.role = role
}

