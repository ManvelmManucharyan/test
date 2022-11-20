# NODE JS project

1. Run npm install
2. Project work in MySQL Database
3. Ceate .env file by example .env.example and set configurations
4. Use Postman (in files available postman configuration file)
5. Project work by Bearer tokens, but no need put token in postman, it will be automatically(by cookies).
6. In every authorization tokens updated

## API Reference 

### /signup: [POST]
          take: name, email, phone number, password
          return: authToken and refreshToken
### /signin: [POST]
          take: id(email or phone number) and password
          return: authToken and refreshToken
### /info: [GET]
          return: user id(if token not expired, and if expired just need to signin)
### /new_token: [POST]
          return: answer about tokens change(token updated by refresh token in cookies)
### /logout: [GET]
          return: new authToken and refreshToken, and deletes previous ones from cookies
### /file/upload: [POST]
          take: file by key name "file"
          return: answer about process
### /file/id: [GET]
          take: file id in params
          return: information about file from database
### /file/download/id: [GET]
          take: file id in params
          return: dowload file from local storage
### /file/list?list_size&page: [GET]
          take: query list_size(default: 10) and page(default:1)
          return: files by pagination, where list_size is files count(only files created by current user)
### /file/update/id: [PUT]
          take: file id in params
          return: updates file in local storage, info in database and answers about process success
### /file/delete/id: [DELETE]
          take: file id in params
          return: delete file from local storage, info from database and answers about process success
