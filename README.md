# Petto

## 架構
- petto-api (後端)
- petto-page (前端)

## Start Project
### After Clone
1. 建立資料庫 **petto**
2. 複製 `petto-api/.env.example` 為 `petto-api/.env`
3. 修改 `petto-api/.env` 內容
4. 安裝依賴
5. 啟動各自 Server

### After Pull
1. 檢查是否有新的依賴，有的話就再 Install Dependentcies
2. 啟動各自 Server

## Install Dependentcies
- petto-api (By CLI or IDE)
    ```
    # CLI
    cd petto-api
    mvn clean install
    ```
- petto-page 
    ```
    cd petto-page
    npm install --legacy-peer-deps
    ```

## Run Server
- 啟動 Spring Boot server (By CLI or IDE)
    ```
    # CLI
    cd petto-api
    mvn spring-boot:run
    ```
- 啟動 React server
    ```
    cd petto-page
    npm start
    ```

## LICENSE
- GPL-3.0
