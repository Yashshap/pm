import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { config, orders } from './config.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/shop-images', express.static(join(__dirname, 'public/shop-images')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, config.uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: config.maxFileSize },
  fileFilter: (req, file, cb) => {
    if (config.allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get shops
app.get('/api/shops', (req, res) => {
  res.json(config.shops);
});

// Upload file
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ filename: req.file.filename });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create order
app.post('/api/orders', (req, res) => {
  const { userId, shopId, filename } = req.body;
  const orderId = uuidv4();
  const order = {
    id: orderId,
    userId,
    shopId,
    filename,
    status: 'Pending',
    customerName: `Customer ${Math.floor(Math.random() * 1000)}`, // Mock customer name
    createdAt: new Date().toISOString()
  };
  orders.set(orderId, order);
  res.json(order);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(Array.from(orders.values()));
});

// Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!orders.has(id)) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  const order = orders.get(id);
  order.status = status;
  orders.set(id, order);
  res.json(order);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});