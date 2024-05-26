import { Hono } from 'hono';

export const taskRoutes = new Hono().get('/');
