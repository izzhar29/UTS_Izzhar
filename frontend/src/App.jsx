// Import statements
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    nama: '',
    developer: '',
    deskripsi: '',
    harga: '',
    image: '',
  });

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/game'); 
      setGames(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addGame = async () => {
    try {
      const response = await axios.post('http://localhost:3001/game', newGame); 
      setGames([...games, response.data]);
      setNewGame({ nama: '', developer: '', deskripsi: '', harga: '', image: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = (gameId) => {
    alert(`Game dengan ID ${gameId} telah dibeli!`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Daftar Game</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={game.image}
              alt={game.nama}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{game.nama}</h2>
              <p className="text-gray-600 mb-4">{game.deskripsi}</p>
              <p className="text-gray-800 font-medium">Developer: {game.developer}</p>
              <p className="text-green-500 font-bold mt-2">Rp {game.harga.toLocaleString('id-ID')}</p>
              <button 
                onClick={() => handleBuy(game.id)} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Tambah Game</h2>
        <form onSubmit={(e) => { e.preventDefault(); addGame(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Game"
              value={newGame.nama}
              onChange={(e) => setNewGame({ ...newGame, nama: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Developer"
              value={newGame.developer}
              onChange={(e) => setNewGame({ ...newGame, developer: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Deskripsi"
              value={newGame.deskripsi}
              onChange={(e) => setNewGame({ ...newGame, deskripsi: e.target.value })}
              className="p-2 border border-gray-300 rounded col-span-1 sm:col-span-2"
            ></textarea>
            <input
              type="number"
              placeholder="Harga"
              value={newGame.harga}
              onChange={(e) => setNewGame({ ...newGame, harga: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="URL Gambar"
              value={newGame.image}
              onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Tambah Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
