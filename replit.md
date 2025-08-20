# Delivery Booster - Growth Platform for Food Delivery

## Overview

Delivery Booster is a marketing services platform designed to help restaurants increase their orders and revenue on delivery platforms like GrabFood and GoFood in Southeast Asia (Bali and Thailand). The application provides audit services, menu optimization, promotional strategies, and performance analytics to boost restaurant visibility and sales without compromising profit margins.

The project is built as a modern full-stack web application with a React frontend and Express.js backend, featuring a bilingual interface (Russian/English) and a professional dark theme design optimized for the food delivery consulting industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **UI Components**: Radix UI primitives with shadcn/ui components for accessible, customizable interface elements
- **Animations**: Framer Motion for smooth page transitions and interactive animations
- **State Management**: TanStack React Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for API development
- **Language**: TypeScript for full-stack type safety
- **Development**: Hot module replacement and middleware-based request handling
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: User management with username/password authentication structure
- **Migrations**: Automated schema migrations through drizzle-kit
- **Connection**: Neon Database serverless PostgreSQL for production scalability

### Internationalization
- **Languages**: Bilingual support for Russian and English markets
- **Implementation**: Custom React context-based translation system
- **Content**: All user-facing text supports both languages with fallback mechanisms

### Development Environment
- **Replit Integration**: Custom Vite plugins for Replit-specific development features
- **Error Handling**: Runtime error overlays and comprehensive error boundaries
- **Hot Reload**: Full-stack hot module replacement for rapid development cycles

## External Dependencies

### UI and Styling
- **Radix UI**: Complete suite of unstyled, accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Modern icon library with consistent design language

### Database and Backend
- **Neon Database**: Serverless PostgreSQL for scalable cloud database hosting
- **Drizzle ORM**: Lightweight, type-safe SQL ORM with excellent TypeScript integration
- **Express.js**: Minimal web framework for Node.js API development

### Development Tools
- **Vite**: Next-generation frontend build tool with plugin ecosystem
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Form and Data Management
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **TanStack React Query**: Powerful data synchronization for server state

### External Assets
- **Unsplash**: Professional stock photography for marketing content
- **Google Fonts**: Web fonts for typography (Inter font family)