# Sistema Enigma - PDF Generator with Payment Verification

## Overview

This is a dual-architecture PDF generation system that provides both free and premium document generation services. The system features a Flask backend for server-side rendering and a React frontend for enhanced user experience, integrated with MercadoPago for payment processing and a sophisticated daily code verification system called "Enigma."

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python) with Jinja2 templating
- **Session Management**: Flask sessions with configurable secret key
- **API Structure**: Simple REST endpoints with health checks
- **Static Assets**: Traditional static file serving for CSS, JavaScript, and templates
- **Deployment**: WSGI-compatible with configurable host/port

### Frontend Architecture (Dual Implementation)
- **Modern Stack**: React 18 with TypeScript, Vite build system
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Legacy Support**: Traditional HTML/CSS/JS implementation for broader compatibility

### Key Components

#### 1. PDF Generation System
- **Library**: jsPDF for client-side PDF generation
- **Free Tier**: Includes watermark and basic formatting
- **Premium Tier**: Watermark-free with enhanced features
- **Content Structure**: Professional document templates with dynamic content injection

#### 2. Enigma Verification System
- **Daily Codes**: 4-digit codes generated using date-based hash algorithm
- **Algorithm**: UTC date string → hash calculation → 4-digit code (1000-9999 range)
- **Admin Override**: Universal code "1984" for administrative access
- **Code Persistence**: URL parameter passing for seamless user experience

#### 3. Payment Integration
- **Provider**: MercadoPago payment gateway
- **Flow**: External redirect → payment completion → code generation → verification
- **Verification Logic**: URL parameter detection for successful payments
- **Code Distribution**: Automatic code display on payment success

#### 4. User Interface Design
- **Styling**: Custom SEMP color scheme with glassmorphism effects
- **Responsiveness**: Bootstrap 5 grid system with mobile-first approach
- **Animations**: CSS keyframe animations for enhanced user experience
- **Notifications**: Toast-style alerts with auto-dismiss functionality

## Data Flow

1. **Initial Access**: User lands on home page with code verification interface
2. **Code Entry**: 4-digit input system with auto-focus and paste support
3. **Verification Process**: Client-side validation against daily code or admin code
4. **Premium Unlock**: Successful verification enables watermark-free PDF generation
5. **Payment Flow**: MercadoPago integration → redirect → code generation → unlock
6. **PDF Generation**: Client-side jsPDF processing with conditional watermark logic

## External Dependencies

### Frontend Libraries
- **jsPDF**: PDF generation and manipulation
- **Bootstrap 5**: UI framework and responsive grid
- **Font Awesome**: Icon library for enhanced UX
- **TanStack Query**: Server state management (React version)
- **Radix UI**: Accessible component primitives (React version)

### Backend Dependencies
- **Flask**: Web framework and templating
- **Python Standard Library**: Date/time utilities and session management

### Payment Services
- **MercadoPago**: Payment processing and webhook handling
- **URL Parameter Detection**: Payment success verification

## Deployment Strategy

### Environment Configuration
- **Development**: Debug mode enabled with local development server
- **Production**: WSGI deployment with environment-based secret management
- **Session Security**: Configurable secret key via environment variables

### Static Asset Management
- **CSS**: Custom SEMP styling with CSS variables for theming
- **JavaScript**: Modular architecture with utility separation
- **Templates**: Jinja2 templating with Bootstrap integration

### Cross-Platform Compatibility
- **Modern Browsers**: React application with TypeScript
- **Legacy Support**: Traditional HTML/JS fallback
- **Mobile Responsive**: Consistent experience across devices

## Changelog

- July 06, 2025. Initial setup
- July 06, 2025. SOLUCIONADO: Problema de sincronización de claves dinámicas entre index.html y enigma.html
  - Mejorado algoritmo de generación de códigos con hash DJB2 para mayor consistencia
  - Añadida función getDailyCodeSecure() con validación automática de sincronización
  - Añadida función verifyCodeSynchronization() para detectar problemas
  - Creada página de test (/test-sync) para verificar sincronización en tiempo real
  - Ambas páginas ahora usan exactamente el mismo código diario garantizado

## User Preferences

Preferred communication style: Simple, everyday language.