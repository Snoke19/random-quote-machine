# Random Quote Machine

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Created with Create React App](https://img.shields.io/badge/Created%20with-CRA-blue)](https://create-react-app.dev/)

A sleek, responsive Random Quote Machine built with **React 18**. This pet project serves as my learning playground for mastering React fundamentals, hooks, state management, and modern frontend practices.

---

## 📸 Preview

| Desktop Preview | Mobile Preview |
|----------------|----------------|
| ![Desktop Preview](https://placehold.co/600x400/1a1a2e/ffffff?text=Quote+Machine+Desktop) | ![Mobile Preview](https://placehold.co/300x600/1a1a2e/ffffff?text=Quote+Machine+Mobile) |

> _Note: Replace placeholder images with actual screenshots from `/public/` folder_

---

## ✨ Features

- ✅ **Random Quote Generation** - Fetch and display random quotes
- ✅ **Category Filtering** - Filter quotes by different categories
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Modern UI** - Clean, intuitive user interface with smooth animations
- ✅ **Performance Monitoring** - Optional react-scan integration for debugging
- ✅ **Accessibility** - Built with a11y best practices in mind

---

## 🛠 Tech Stack

### Core Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| [React](https://react.dev/) | Frontend Framework | 18.3.1 |
| [React DOM](https://react.dev/reference/react-dom) | DOM Manipulation | 18.3.1 |
| [Create React App](https://create-react-app.dev/) | Project Bootstrap | 5.0.1 |

### Libraries & Dependencies
| Library | Purpose |
|---------|---------|
| [Axios](https://axios-http.com/) | HTTP Requests |
| [Font Awesome](https://fontawesome.com/) | Icons |
| [Prop Types](https://www.npmjs.com/package/prop-types) | Runtime Type Checking |
| [react-scan](https://www.npmjs.com/package/react-scan) | Performance Monitoring (Optional) |

### Development Tools
- **Testing**: `@testing-library/react`, `@testing-library/jest-dom`
- **Code Quality**: ESLint (react-app configuration)
- **Styling**: Vanilla CSS with CSS Modules approach

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18.0.0
- [npm](https://www.npmjs.com/) ≥ 9.0.0 (or [yarn](https://yarnpkg.com/))
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/random-quote-machine.git
   cd random-quote-machine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

   This will open [http://localhost:3000](http://localhost:3000) in your default browser.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App (one-way operation) |
| `npm run start:scan` | Starts with react-scan performance monitoring enabled |
| `npm run start:no-scan` | Starts with react-scan disabled |

---

## 📂 Project Structure

```
random-quote-machine/
├── public/                    # Static files
│   ├── index.html             # HTML template
│   ├── favicon.ico            # Favicon
│   └── manifest.json         # PWA manifest
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── App.js             # Main App component
│   │   ├── CategoryList.js    # Category selection component
│   │   ├── QuoteCard.js       # Quote display component
│   │   └── ...
│   ├── services/              # API and business logic
│   │   ├── QuoteService.js    # Quote-related API calls
│   │   └── CategoryService.js # Category management
│   ├── utils/                 # Utility functions
│   │   └── errorUtils.js      # Error handling utilities
│   ├── index.js               # Application entry point
│   ├── index.css              # Global styles
│   └── App.css                # App-specific styles
├── package.json               # Project configuration
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules
```

---

## 🎯 Learning Objectives

This project was created to learn and practice:

### React Fundamentals
- ⚛️ Component-based architecture
- 📡 Props and state management
- 🔄 React hooks (useState, useEffect, useCallback, etc.)
- 🎨 Conditional rendering
- 📦 Component composition

### Advanced Concepts
- 🏗️ Custom hooks with `@uidotdev/usehooks`
- ✅ PropTypes for type checking
- 🌐 API integration with Axios
- ⚙️ Error handling and loading states
- 🎯 Performance optimization

### Best Practices
- ✨ Clean code principles
- 📁 Project organization
- 🔍 Performance monitoring with react-scan
- ♿ Accessibility (a11y) considerations
- 📝 Proper documentation

---

## 🎨 Design & UI

### Color Scheme
- **Primary**: `#1a1a2e` (Dark Blue)
- **Secondary**: `#16213e` (Navy)
- **Accent**: `#e94560` (Red)
- **Text**: `#ffffff` (White)
- **Background**: `#0f0f1a` (Almost Black)

### Typography
- **Headings**: [Merriweather](https://fonts.google.com/specimen/Merriweather) - Elegant serif
- **Body**: [Lora](https://fonts.google.com/specimen/Lora) - Clean and readable

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root for configuration:

```env
# Enable performance monitoring (default: false)
REACT_APP_SCAN_ENABLED=true

# API base URL (if using a custom quote API)
REACT_APP_API_BASE_URL=https://api.example.com
```

---

## 🤝 Contributing

While this is primarily a personal learning project, contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📜 License

This project is **open source** and available under the [MIT License](LICENSE).

---

## 📬 Contact

Alex - [Your Email](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/random-quote-machine](https://github.com/your-username/random-quote-machine)

---

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) - For the excellent boilerplate
- [React Documentation](https://react.dev/) - For comprehensive guides
- [Font Awesome](https://fontawesome.com/) - For beautiful icons
- [All contributors](https://github.com/your-username/random-quote-machine/graphs/contributors) - For their valuable input

---

<div align="center">
  <sub>Built with ❤️ using React | © 2026 Alex</sub>
</div>