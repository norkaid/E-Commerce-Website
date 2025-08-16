# Overview

ShopHub is a full-stack e-commerce web application built with React, Express, and PostgreSQL. It features a comprehensive shopping experience with product browsing, cart management, checkout functionality, user authentication, and admin capabilities. The application uses modern web technologies including TypeScript, Tailwind CSS, shadcn/ui components, and Drizzle ORM for database management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side application is built with React and TypeScript, using Vite as the build tool. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, styled with Tailwind CSS. The application uses Wouter for client-side routing and TanStack Query for server state management. The frontend implements a responsive design with mobile-first considerations and includes features like cart management, product browsing, and user authentication flows.

## Backend Architecture
The server is built with Express.js and TypeScript, providing a RESTful API architecture. The application uses a layered approach with clear separation between routes, storage operations, and database interactions. Authentication is handled through Replit's OAuth integration with session management. The server implements proper error handling, logging, and CORS configuration for API endpoints.

## Database Design
The application uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema includes tables for users, products, cart items, orders, order items, and reviews, with proper relationships and constraints. Session storage is handled through a dedicated sessions table for authentication persistence.

## Authentication System
Authentication is implemented using Replit's OAuth system with OpenID Connect. The system includes passport.js integration for session management, with secure cookie handling and proper user session lifecycle management. The authentication flow supports both client-side and server-side user state management.

## State Management
Client-side state is managed through TanStack Query for server state and React hooks for local component state. The application implements optimistic updates and proper cache invalidation strategies. Error handling includes retry mechanisms and user-friendly error messages.

# External Dependencies

## UI and Styling
- **Radix UI**: Provides accessible, unstyled UI primitives for components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **Lucide React**: Icon library for consistent iconography

## Database and ORM
- **Neon Database**: Serverless PostgreSQL database service
- **Drizzle ORM**: Type-safe ORM with PostgreSQL support
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Authentication and Security
- **Replit Auth**: OAuth authentication service integration
- **Passport.js**: Authentication middleware for Express
- **OpenID Client**: OAuth and OpenID Connect client library

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Data Fetching and State
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing

## Form Handling and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **@hookform/resolvers**: Validation resolvers for React Hook Form