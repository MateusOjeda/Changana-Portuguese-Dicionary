# Changana-Portuguese Dictionary

This app helps young people in Mozambique learn Portuguese more easily, especially in villages with limited education. It is designed as a unique educational tool, providing value where no other Shangana-Portuguese dictionary app exists.

The app does **not** collect, store, or share any personal information. There are no analytics, ads, login, or in-app purchases.

## Dedicatory

Dictionary data courtesy of Bento Sitoé:
[Dicionário Changana-Português](https://books.google.com.br/books/about/Dicion%C3%A1rio_Changana_Portugu%C3%AAs.html?id=HacaAQAAIAAJ&redir_esc=y)

## Features

-   Full dictionary functionality for Shangana-Portuguese translations
-   Simple, fast, and responsive interface
-   Educational tool for young people in remote areas
-   Offline usage, no backend required

## 🔗 Download the App

https://play.google.com/store/apps/details?id=com.mateusojeda.DicionarioChangana

> ⚠️ Available in Mozambique, Zimbabwe, South Africa and Brazil

## Video Demo

Check out the video demo of the app here:
https://youtube.com/shorts/ftK2KEskyl0

## 🖼️ App Screenshots

<img src="https://i.ibb.co/ZpSxHBrG/Screenshots.png" width="1000">


## Running Locally with Expo Go

1. Initialize the basic Expo application:

```bash
npx create-expo-app@latest
```

2. Login to Expo:

```bash
npx expo login
```

3. Start the application with Fast Refresh:

```bash
npx expo start -c
```

You can open the app directly on your phone using **Expo Go**.

## 💻 Run Locally

To run using **Expo Go** with tunnel (so others can access):

```bash
npx expo start --tunnel
```

---

## 📦 Android Builds

-   **APK for testing:**

```bash
eas build -p android --profile preview
```

-   **File for Play Store (AAB):**

```bash
eas build --platform android
```

---

## 🚀 Publish for Portfolio

To update the project and generate a public link for your portfolio:

```bash
eas update --branch preview --message "First publication"
```

---

## 🛠️ Technologies Used

-   **React Native**
-   **Expo / Expo Router**
-   **EAS Build / EAS Update**

## Maintainer

This project is maintained by the author.

## License

This project is free to use and open-source for educational purposes.
