import { reactive } from 'vue'

export const store = reactive({
  file: [],
  fileName: '',
  fileType: '',
  uploadProgressValue: 0,
  uploadProgressMax: 0,
  isSelected: false,
})