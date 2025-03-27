# Markdown to PDF Converter

This project is a tool for converting files from one format to another format (not all one are implemented). It is designed to be simple to use and customizable for various use cases.

## Features
- Convert files with ease.
- Support for custom styles and templates.
- Lightweight and fast.

## Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or whatever you use.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/md-to-pdf-converter.git
   cd md-to-pdf-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables
The project requires the following environment variables to be set:

- `VITE_API_URI`: The Api URL that communicates with [backend](https://github.com/PVP-ORG-PER/file-converter).

Create a `.env` file in the root of the project and add the variables:
```env
VITE_API_URI=http://localhost:3000 # for example
```

## Running the Project Locally
Start the application:
```bash
npm run dev
# or
yarn dev
```

## Contributing
Feel free to fork the repository and submit pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
