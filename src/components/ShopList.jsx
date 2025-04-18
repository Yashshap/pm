import { useState, useEffect } from 'react';

function ShopList({ selectedShop, setSelectedShop }) {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/shops')
      .then(response => response.json())
      .then(data => setShops(data))
      .catch(err => setError('Failed to load shops'));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">⯨</span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">★</span>
        );
      }
    }
    return stars;
  };

  if (error) {
    return (
      <div className="text-red-500 text-center">{error}</div>
    );
  }

  if (shops.length === 0) {
    return (
      <div className="text-center text-gray-500">No shops available</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Select a Print Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shops.map(shop => (
          <div
            key={shop.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedShop?.id === shop.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedShop(shop)}
          >
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-1">{shop.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{shop.location}</p>
            <div className="flex items-center">
              <div className="flex mr-2">
                {renderStars(shop.rating)}
              </div>
              <span className="text-sm text-gray-600">{shop.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopList;