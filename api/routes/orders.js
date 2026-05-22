import { sendJSON } from '../lib/auth.js';
import { getPublicOrderStatus } from '../lib/merch-orders.js';

export async function handleOrderStatus(req, res, orderId) {
  const status = getPublicOrderStatus(orderId);
  if (!status) {
    sendJSON(res, 404, { error: 'Order not found' });
    return;
  }
  sendJSON(res, 200, status);
}
