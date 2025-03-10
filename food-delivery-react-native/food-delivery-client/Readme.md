# Food Delivery / Client

---

### Technologies:

- _[React Native](https://reactnative.dev/)_
- _[Expo](https://expo.dev/)_
- _[TypeScript](https://www.typescriptlang.org/)_
- _[React Native Navigation](https://reactnavigation.org/)_
- _[NativeWind](https://www.nativewind.dev/) ([Tailwind CSS](https://tailwindcss.com/))_
- _[TanStack React Query](https://tanstack.com/query/latest)_
- _[Axios HTTP Client](https://axios-http.com/docs/intro)_
- _[React Hook Form](https://react-hook-form.com/)_
- _[React Native Async Storage](https://react-native-async-storage.github.io/async-storage/), [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)_
- _[Prettier](https://prettier.io/) with plugins_

---

### Demo:

#### Home, Explorer, Search screens

<div style="display: flex; column-gap: 20px; padding: 15px; justify-content: center;">
<img src="./screenshots/home.jpg" width="250px" alt="Home" style="border-radius: 5px; overflow: hidden;"/>
<img src="./screenshots/explorer.jpg" width="250px" alt="Explorer screen" style="border-radius: 5px; overflow: hidden;"/>
<img src="./screenshots/search.jpg" width="250px" alt="Search screen" style="border-radius: 5px; overflow: hidden;"/>
</div>

#### Profile

<div style="display: flex; column-gap: 20px; padding: 15px; justify-content: space-between;">
<img src="./screenshots/profile.jpg" width="250px" alt="Profile screen" style="border-radius: 5px; overflow: hidden;"/>
</div>

#### Authorization

<div style="display: flex; column-gap: 20px; padding: 15px; justify-content: center;">
<img src="./screenshots/register.jpg" width="250px" alt="Registration screen" style="border-radius: 5px; overflow: hidden;"/>
<img src="./screenshots/login.jpg" width="250px" alt="Sign in screen" style="border-radius: 5px; overflow: hidden;"/>
</div>
---

### To run:

1. You need to install Android SDK inside [Android Studio](https://developer.android.com/studio)
2. Download [Expo Go](https://expo.dev/go) on your mobile (or you can use Virtual Device Emulator in Android Studio)
3. If you use local server, you need to [map ports](https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api)
   - `adb devices` - get number of device
   - `adb -s <NUMBER> reverse tcp:4200 tcp:4200`
4. Connect phone to PC, allow USB Debug Mode and transfering files
5. `npm run android`
