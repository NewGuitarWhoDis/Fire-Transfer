import { reactive } from 'vue'

export const store = reactive({
  recieveEnabled: false,
  uploadedFile: [],
  file: [],
  fileName: '',
  fileType: '',
  ProgressMax: 0,
  sendProgressValue: 0,
  isSelected: false,
  recievedFileName: 0,
  recievedFileType: "",
  recievedFileSize: 0,
})