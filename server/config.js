export const config = {
  maxFileSize: 10 * 1024 * 1024, // 10MB in bytes
  allowedFileTypes: ['application/pdf', 'image/png', 'image/jpeg'],
  uploadDir: './uploads',
  shops: [
    {
      id: 1,
      name: 'PrintMaster Pro',
      location: '123 Main St, Downtown',
      rating: 4.5,
      image: '/shop-images/printmaster.svg'
    },
    {
      id: 2,
      name: 'Quick Print Express',
      location: '456 Oak Ave, Midtown',
      rating: 4.8,
      image: '/shop-images/quickprint.svg'
    },
    {
      id: 3,
      name: 'Digital Prints Co',
      location: '789 Pine Rd, Uptown',
      rating: 4.2,
      image: '/shop-images/digitalprints.svg'
    }
  ]
};

// In-memory storage for orders
export const orders = new Map();