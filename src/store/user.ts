import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface UserInfo {
  name: string
  sex: string
  phone: string
  [key: string]: any
}

export const useUser = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    name: '',
    sex: '',
    phone: ''
  })

  return { userInfo }
})
