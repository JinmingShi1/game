This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

For test convenience, I already put a packaged version of android application file app-release.apk in root directory.

Backend server is supposed to run on http://localhost:9000 by default. If service started at another port/address, please change the configuration under utils/api.tsx,

```bash
# change this line (http://10.0.2.2 is meant http://localhost)
const PREFIX = 'http://10.0.2.2:9000';
```

## Start your Application

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.
