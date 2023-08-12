# CRA Environment Manager (`cra-env-manager`)

Easily manage environment variables in your Create React App projects without ejecting. This package provides a simplified way to set specific environment variables for your production builds.

## Features

- 🌍 Load environment variables dynamically for local or development builds.
- 🛠 Auto-generate an `environment.js` in the `.well-known` public folder during production builds.
- 📦 No need to mess with `react-app-rewired` directly; simplified integration!

## Installation

```
npm install cra-env-manager react-app-rewired --save-dev
```

## Usage

1. **Modify Your `package.json` Scripts**:
Replace `react-scripts` in your npm scripts with `cra-env-manager`:

```
{
  "scripts": {
    "start": "cra-env-manager start",
    "build": "cra-env-manager build",
    ...
  }
}
```

2. **Specify Environment Variables**:
In your `package.json`, specify the environment variables you want to be included in the `environment.js`:

```
{
  "craEnvManager": {
    "envs": ["REACT_APP_API_URL", "REACT_APP_SOME_OTHER_VAR"]
  }
}
```

3. **Accessing Environment Variables in Your Application**:
You can access the environment variables in your application as you would typically:

```
console.log(process.env.REACT_APP_API_URL);
```

For production builds, these values will be sourced from `environment.js`.

## How It Works

For local/development builds, `cra-env-manager` reads the environment variables from your `.env` files as usual. However, for production builds, it creates an `environment.js` file inside the `.well-known` public directory, containing the specified environment variables. This file is then read by your app to provide the environment values.

## Troubleshooting

If you face any issues:

- Ensure both `cra-env-manager` and `react-app-rewired` are installed.
- Make sure you've replaced `react-scripts` with `cra-env-manager` in your npm scripts.
- Ensure the environment variables you want to use are listed under `craEnvManager.envs` in your `package.json`.

## Contributing

We welcome contributions! If you have a feature request, bug report, or wish to contribute code, please open an issue on our [GitHub repo](#).
