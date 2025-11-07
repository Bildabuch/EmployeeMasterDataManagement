# 🧑‍💼 Employee Master Data Management

This is a small web application for managing employee master data, developed with Kotlin and Spring Boot.
The application supports the following functions:

- 🆕 **Create** new employees
- ✏️ **Edit** existing employees
- 🗑️ **Delete** employees

During editing, the **history of an employee** is expanded so that it is possible to trace at any time
**when a data record had which status**.

Changes are only possible if they are based on the most recent data record
(**optimistic locking**). This behaviour can be easily tested by opening two browser tabs with
the same editing mask and saving them one after the other — only the first save should be successful.

Input **validation** is fully implemented in Kotlin, making it the single source of truth: the same validation logic is
used in both the frontend and backend.

---

### About the Project

* [/backend](./backend/src/main/kotlin) is for the Ktor server application.

* [/shared](./shared/src) is for the code that will be shared between all targets in the project.
  It contains the validation logic for employees and all necessary Dtos.

* [/webApp](./webApp) contains web React application. It uses the Kotlin/JS library produced
  by the [shared](./shared) module.

### Build and Run Server

To build and run the development version of the server, use the run configuration from the run widget
in your IDE’s toolbar or run it directly from the terminal:

- on macOS/Linux
  ```shell
  ./gradlew :backend:bootRun
  ```
- on Windows
  ```shell
  .\gradlew.bat :backend:bootRun
  ```

### Build and Run Web Application

To build and run the development version of the web app, use the run configuration from the run widget
in your IDE’s toolbar or run it directly from the terminal:

1. Install [Node.js](https://nodejs.org/en/download) (which includes `npm`)
2. Build Kotlin/JS shared code:
    - on macOS/Linux
      ```shell
      ./gradlew :shared:jsBrowserDevelopmentLibraryDistribution
      ```
    - on Windows
      ```shell
      .\gradlew.bat :shared:jsBrowserDevelopmentLibraryDistribution
      ```
3. Build and run the web application
   ```shell
   npm install
   npm run start
   ```

---
