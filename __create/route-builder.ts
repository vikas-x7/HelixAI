
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Helper function to transform file path to Hono route path
function getHonoPath(routeFile: string): string {
  // routeFile comes from import.meta.glob, e.g., "../src/app/api/auth/token/route.js"
  const relativePath = routeFile.replace('../src/app/api/', '');
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'

  if (routeParts.length === 0) {
    return '/';
  }

  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? `:${param}{.+}`
        : `:${param}`;
    }
    return segment;
  });

  return '/' + transformedParts.join('/');
}

// Import all route modules
const routeModules = import.meta.glob('../src/app/api/**/route.js');

async function registerRoutes() {
  // Clear existing routes
  api.routes = [];

  for (const path in routeModules) {
    try {
      const route: any = await routeModules[path]();
      const honoPath = getHonoPath(path);
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

      for (const method of methods) {
        if (route[method]) {
          const handler: Handler = async (c) => {
            const params = c.req.param();
            // In development, handle hot reloading by re-importing if necessary
            // or just use the pre-imported module since Vite handles HMR
            return await route[method](c.req.raw, { params });
          };

          const methodLowercase = method.toLowerCase() as any;
          (api as any)[methodLowercase](honoPath, handler);
        }
      }
    } catch (error) {
      console.error(`Error registering route ${path}:`, error);
    }
  }
}

// Initial route registration
await registerRoutes();

// Hot reload routes in development
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept(() => {
    registerRoutes().catch((err) => {
      console.error('Error reloading routes:', err);
    });
  });
}

export { api, API_BASENAME };
