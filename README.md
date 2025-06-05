# Paperstack

A document management system for construction companies.

## Build Instructions

There are two ways to build this project:

### Option 1: Using the build script

```bash
./build.sh
```

This script will create a temporary package.json with minimal dependencies, build the project, and then restore the original package.json.

### Option 2: Manual build

1. Make sure you have Node.js version 18.18.0 or higher installed.
2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

If you encounter build errors related to missing modules like `@heroui/react`, `@iconify/react`, `framer-motion`, or `react-intersection-observer`, you can:

1. Use the build script which uses stub implementations of these packages:
   ```bash
   ./build.sh
   ```

2. Create stubs for all missing dependencies:
   ```bash
   node create-stubs.js
   ```
   This script will create stub implementations for all missing dependencies and update the next.config.js file to use these stubs.

## License

This project is proprietary and confidential.
