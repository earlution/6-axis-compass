import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function loadAll() {
  ensureDataDir();
  if (!existsSync(ORDERS_FILE)) return {};
  try {
    return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveAll(orders) {
  ensureDataDir();
  writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

export function createOrder({ config, stripeSessionId = null }) {
  const id = randomUUID();
  const order = {
    id,
    stripeSessionId,
    printfulOrderId: null,
    config,
    status: 'pending',
    artworkUrl: null,
    error: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const orders = loadAll();
  orders[id] = order;
  saveAll(orders);
  return order;
}

export function updateOrder(id, patch) {
  const orders = loadAll();
  const order = orders[id];
  if (!order) return null;
  Object.assign(order, patch, { updatedAt: new Date().toISOString() });
  orders[id] = order;
  saveAll(orders);
  return order;
}

export function getOrder(id) {
  return loadAll()[id] || null;
}

export function getOrderByStripeSession(sessionId) {
  const orders = loadAll();
  return Object.values(orders).find(o => o.stripeSessionId === sessionId) || null;
}

export function listOrders() {
  return Object.values(loadAll());
}
