# Terra Major Admin Portal

Welcome to the web admin portal for Terra Major.

## Getting Started

### Run Database Locally

1. Create a `.env` file in the root directory with the following content:

    ```bash
    VITE_API_BASE_URL=http://localhost:8000
    ```

### Run App in Development Mode

To build and run the app in release mode, use the following command:

```bash
docker compose up --build dev
```

This will run the app locally on [http://localhost:5173](http://localhost:5173)

## Run app in Release Mode locally

To build the release:

```bash
docker compose up --build release
```

The app will be accessible at [http://localhost](http://localhost). 