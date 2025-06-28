// ❌ FIX: `jwt` is a default import, not a named one
import jwt, { JwtPayload } from 'jsonwebtoken';

// ✅ Good import from your http-backend config
import { JWT_SECRET } from '../../http-backend/src/config.js';

// ✅ Correct WebSocketServer import
import { WebSocketServer } from 'ws';

// ✅ Start WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  // ✅ FIX: You forgot to add `request` in the parameters

  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";

  let decoded: JwtPayload;

  try {
    // ✅ FIX: Cast to JwtPayload properly
    decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.userId) {
      ws.close();
      return;
    }

    // ✅ Token is valid, start receiving messages
    ws.on('message', function message(data) {
      ws.send('pong');
    });
  } catch (err) {
    ws.close(); // Close connection on verification error
  }
});
