# HRM Management System

A modern, full-stack Human Resource Management system built with Next.js, TypeScript, and Tailwind CSS. This system provides comprehensive tools for managing staff, departments, roles, and assignments with robust authentication and permission management.

## 🚀 Features

- **Authentication System**: Secure login with JWT tokens and automatic refresh
- **Staff Management**: Complete CRUD operations for employee profiles
- **Department Management**: Organizational structure management
- **Role Management**: User role and permission definitions
- **Assignment Management**: Bulk and individual role/department assignments
- **Responsive Design**: Modern UI that works on all devices
- **Permission-based Access Control**: Role-based routing and access management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: Zustand, React Query (TanStack Query)
- **Authentication**: JWT tokens, HTTP-only cookies
- **UI Components**: Custom component library with shadcn/ui
- **HTTP Client**: Axios with interceptors
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fe_test_hololab
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes
│   ├── staffs/            # Staff management pages
│   ├── departments/        # Department management pages
│   ├── roles/             # Role management pages
│   └── assignments/       # Assignment management pages
├── components/             # Reusable UI components
│   ├── auth/              # Authentication components
│   ├── ui/                # Base UI components
│   ├── staff/             # Staff-related components
│   ├── departments/        # Department components
│   └── roles/             # Role components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries and configurations
├── providers/              # React context providers
├── services/               # API service layer
├── stores/                 # State management (Zustand)
├── types/                  # TypeScript type definitions
└── zods/                   # Zod validation schemas
```

## 🔐 Authentication Flow

The system implements a robust authentication flow:

1. **Login**: User provides credentials, receives JWT tokens
2. **Token Storage**: Access token and refresh token stored in HTTP-only cookies
3. **Automatic Refresh**: System automatically refreshes expired tokens
4. **Route Protection**: Protected routes check authentication status
5. **Permission Check**: Role-based access control for different modules

### Key Components:

- **AuthProvider**: Global authentication state management
- **ProtectedRoute**: Route-level authentication wrapper
- **useAuth**: Custom hooks for authentication logic
- **Token Refresh**: Automatic token renewal system

## 🎨 Design Choices & Architecture

### 1. **Component Architecture**

- **Atomic Design**: Components built from smallest units (atoms) to complex pages
- **Composition over Inheritance**: Flexible component composition patterns
- **Custom Hooks**: Business logic separated into reusable hooks
- **Type Safety**: Full TypeScript implementation for better development experience

### 2. **State Management Strategy**

- **Zustand**: Lightweight state management for global app state
- **React Query**: Server state management with caching and synchronization
- **Local State**: Component-level state for UI interactions
- **Context**: Authentication and theme context providers

### 3. **API Layer Design**

- **Service Pattern**: Organized API calls into service modules
- **Axios Interceptors**: Centralized request/response handling
- **Error Handling**: Consistent error handling across all API calls
- **Type Safety**: Full TypeScript interfaces for API responses

### 4. **Security Considerations**

- **HTTP-only Cookies**: Secure token storage preventing XSS attacks
- **JWT Tokens**: Stateless authentication with automatic refresh
- **Route Protection**: Client and server-side route protection
- **Permission-based Access**: Role-based routing and component rendering

### 5. **Performance Optimizations**

- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Next.js built-in image optimization
- **Caching Strategy**: React Query caching for API responses
- **Lazy Loading**: Component lazy loading for better initial load times

### 6. **User Experience**

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Consistent loading indicators across the app
- **Error Boundaries**: Graceful error handling and user feedback
- **Toast Notifications**: Non-intrusive user feedback system

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Single column layout with touch-friendly interactions
- **Tablet**: Two-column grid layouts for better space utilization
- **Desktop**: Full three-column grid with hover effects and advanced interactions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: XSS-resistant token storage
- **Route Protection**: Client-side route guards
- **Permission-based Access**: Role-based component rendering
- **CSRF Protection**: Built-in Next.js CSRF protection

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Future Enhancements

- [ ] Advanced reporting and analytics
- [ ] Email notifications system
- [ ] File upload and document management
- [ ] Advanced search and filtering
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] PWA capabilities
- [ ] Advanced permission system with dynamic roles

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
