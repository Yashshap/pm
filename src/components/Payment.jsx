import { useState } from 'react';

function Payment({ selectedFile, selectedShop, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const { filename } = await uploadResponse.json();

      // Create order
      const orderResponse = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user-1', // Mock user ID
          shopId: selectedShop.id,
          filename
        })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">File:</span> {selectedFile.name}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Shop:</span> {selectedShop.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {selectedShop.location}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isProcessing
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Proceed with Payment'}
      </button>
    </div>
  );
}

export default Payment;