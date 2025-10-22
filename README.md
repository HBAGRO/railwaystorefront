# IOX Greenhouse - Next.js Storefront

This is the customer-facing storefront for the IOX Greenhouse agricultural equipment e-commerce platform, built with Next.js 14 and integrated with Medusa.js.

## About

IOX Greenhouse storefront provides a modern, responsive shopping experience for customers looking to purchase agricultural equipment, greenhouse supplies, and related products.

## Technology Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Medusa.js Client** - E-commerce SDK
- **TypeScript** - Type safety

## Features

- 🛍️ Product catalog with advanced filtering
- 🛒 Shopping cart management
- 👤 Customer authentication and profiles
- 📦 Order tracking
- 💳 Secure checkout process
- 📱 Fully responsive design
- ⚡ Optimized performance with Next.js

## Project Structure

```
storefront/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/             # Utility functions and API clients
│   ├── modules/         # Feature modules
│   └── styles/          # Global styles
├── public/              # Static assets
├── e2e/                 # End-to-end tests
└── tailwind.config.js   # Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- pnpm package manager
- Running Medusa backend (see medusa-iox-backend repository)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HBAGRO/medusa-iox-storefront.git
cd medusa-iox-storefront
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.template .env.local
# Edit .env.local with your configuration
```

Key environment variables:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - URL of your Medusa backend
- `NEXT_PUBLIC_BASE_URL` - Your storefront's public URL

### Development

Start the development server:
```bash
pnpm run dev
```

The storefront will be available at `http://localhost:8000`

### Production

Build and start the production server:
```bash
pnpm run build
pnpm run start
```

## Deployment

This storefront is configured to deploy on Railway. See the Railway deployment guide in the main project documentation.

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Your Medusa backend URL
- `NEXT_PUBLIC_BASE_URL` - Your storefront domain
- `REVALIDATE_SECRET` - Secret for on-demand revalidation

Optional:
- `NEXT_PUBLIC_SEARCH_ENDPOINT` - Search service endpoint
- `NEXT_PUBLIC_INDEX_NAME` - Search index name

## Testing

### Unit Tests
```bash
pnpm run test
```

### E2E Tests
```bash
pnpm run test:e2e
```

## Customization

### Styling
- Tailwind configuration: `tailwind.config.js`
- Global styles: `src/styles/globals.css`

### Components
Reusable components are in `src/components/` and organized by feature modules in `src/modules/`

### Product Categories
Configure categories and navigation in the Medusa admin panel.

## Performance

This storefront uses Next.js App Router with:
- Server-side rendering (SSR)
- Static site generation (SSG) for product pages
- Image optimization
- Font optimization
- Automatic code splitting

## Contributing

This is a private repository for IOX Greenhouse. Please follow the project's contribution guidelines.

## License

Proprietary - IOX Greenhouse

## Support

For support, please contact the IOX Greenhouse development team.

---

**Original Template**: Based on [rpuls/medusajs-2.0-for-railway-boilerplate](https://github.com/rpuls/medusajs-2.0-for-railway-boilerplate)
