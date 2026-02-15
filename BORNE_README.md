# BORNE Frontend - React + Vite + TypeScript

**Status**: Created and configured  
**Date**: 2 Février 2026  
**Type**: React 18 + Vite + TypeScript + TailwindCSS + Shadcn UI

## Quick Start

```bash
# Install dependencies
npm install

# Development server (Port 3001)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

## Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Shadcn UI components
│   ├── kiosk/          # Kiosk-specific components
│   ├── layout/         # Layout components
│   └── forms/          # Form components
├── pages/              # Page components
├── services/           # API services
│   └── api.ts          # Backend API client (http://localhost:4001/api)
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── styles/             # Global styles
├── utils/              # Utility functions
└── App.tsx             # Root component
```

## Configuration

### API Integration

The frontend communicates with BORNE Backend on:
```
http://localhost:4001/api
```

Update `src/services/api.ts` if needed:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4001/api';
```

### Environment Variables

Create `.env.local`:
```env
VITE_API_URL=http://localhost:4001/api
VITE_API_TIMEOUT=5000
```

## Technologies

- **React** 18 - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Shadcn UI** - Component library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Vitest** - Unit testing
- **React Router** - Navigation

## Features

- Responsive kiosk UI
- Product catalog
- Shopping cart management
- Order creation
- Payment integration
- AI recommendations
- Real-time updates
- Dark mode support
- Mobile-first design

## Integration Points

### Backend API (http://localhost:4001/api)
- `GET /api/health` - Health check
- `GET /api/kiosk/products` - Get products
- `POST /api/kiosk/cart` - Create cart
- `POST /api/kiosk/orders` - Create order
- `GET /api/kiosk/recommendations` - Get AI recommendations

### GOLDPOS API (http://localhost:3000/api)
- Product catalog
- Payment processing
- Order management

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm test:watch

# Coverage report
npm test:coverage
```

## Build

```bash
# Development build
npm run build:dev

# Production build
npm run build

# Preview
npm preview
```

## Docker

```bash
# Build Docker image
docker build -t borne-frontend:latest .

# Run container
docker run -p 3001:5173 borne-frontend:latest
```

## Security

- XSS protection (React escaping)
- CSRF tokens (if needed)
- Input validation
- Secure API communication (HTTPS in prod)
- Environment variables for secrets

## Deployment

### Development
```bash
npm run dev
# http://localhost:5173
```

### Production
```bash
npm run build
npm preview
# Or deploy `dist/` to static hosting
```

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Commit with meaningful message
5. Push to GitHub

## License

To be defined

---

**Created**: 2 Février 2026  
**Status**: Ready for development  
**Backend**: BORNE Backend (Node.js) on port 4001
