import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Components
import FileUpload from './components/FileUpload';
import ShopList from './components/ShopList';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);

    return (
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
                      Print Service
                    </Link>
                    <Link to="/dashboard" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900 ml-4">
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={
                  <div className="space-y-8">
                    <FileUpload
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                    />
                    {selectedFile && (
                      <ShopList
                        selectedShop={selectedShop}
                        setSelectedShop={setSelectedShop}
                      />
                    )}
                    {selectedShop && (
                      <Payment
                        selectedFile={selectedFile}
                        selectedShop={selectedShop}
                        onSuccess={() => {
                          setSelectedFile(null);
                          setSelectedShop(null);
                        }}
                      />
                    )}
                  </div>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </DndProvider>
    );
}

export default App
