// Standard imports
import axios from 'axios'

// Project imports
import { DEFAULT_HEADERS, dj_urls } from "../../../store/utils"

class AxiosUploadAdapter {
  constructor( loader ) {
    this.loader = loader
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('image', file, file.name)

        let url = dj_urls['image-upload']()

        return axios
          .post(url, data, {...DEFAULT_HEADERS, headers: {'Content-Type': 'multipart/form-data'}})
          .then(response => {
            resolve({
              default: response.data.url
            })
          })
          .catch(error => {
            reject(error)
          })
      }))
  }

  abort = () => {
    // Reject promise returned from upload() method.
  }
}

export const CustomUploadAdapter = (editor) => {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
    return new AxiosUploadAdapter( loader )
  }
}