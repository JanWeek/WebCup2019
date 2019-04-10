import axios from "axios"
import qs from 'qs'
import SETTINGS from "../../settings"

export default {
  getAuthToken(code) {
    return new Promise((resolve, reject) => {
      const data = {
        grant_type: 'authorization_code',
        code: code,
        client_id: SETTINGS.CLIENT_ID,
        client_secret: SETTINGS.CLIENT_SECRET         
      }
      const options = {
        method: "POST",
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: SETTINGS.AUTH_URL + "token"
      }
      axios(options)
      .then(response => {
        resolve(response)
      })
      .catch(e => {
        reject(e)
      })
    })
  },

  getUserMeta(token) {
    return new Promise((resolve, reject) => {
      //  невозможно передать токен в заголовке,
      //  т.к. API яндекса принимает только запросы GET, POST и HEAD,
      //  а наличие заголовка Authorization вызывает префлайт-запрос OPTIONS,
      //  который блокируется яндексом
      /*const data = {
        format: "json",
        oauth_token: token
      }
      const options = {
        method: "GET",
        data: qs.stringify(data),
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: SETTINGS.USER_INFO_URL
      }
      axios(options)*/
      axios.get("https://login.yandex.ru/info?format=json&oauth_token=" + token)
        .then(response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },

  getImagesFromDisk({ show, skip }) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "GET",
        url: SETTINGS.DISK_BASE_URL + "resources?public_key=" + SETTINGS.DISK_PUBLIC_URL + "&preview_size=XXXL&fields=_embedded.items.name,_embedded.items.custom_properties,_embedded.items.file,_embedded.items.preview,_embedded.items.path,_embedded.total,_embedded.limit&limit=" + show + "&offset=" + skip
      }
      axios(options)
        .then(response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  //  по какой-то причине яндекс не может прочитать значение public_key,
  //  поэтому функционал добавления файла пользователю на Я.Диск не рализован

  /*saveResourceToDisk({ path, token }) {
    return new Promise((resolve, reject) => {
      const options = {
        method: "POST",
        url: "https://cloud-api.yandex.net:443/v1/disk/public/resources/save-to-disk",//?public_key=" + SETTINGS.DISK_PUBLIC_URL + "&path=" + path,
        data: { 
          public_key: SETTINGS.DISK_PUBLIC_URL, 
          path: path 
        },
        headers: {
          'Authorization': 'OAuth ' + token,
          'Content-Type': 'application/json'
        }
      }
      axios(options)
        .then(response => {
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  }*/
}