import { useState, type FormEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { PackageList } from './components/PackageList';
import { PackageDetail } from './components/PackageDetail';
import { AdminPanel } from './components/AdminPanel';
import { TourPackage, Customer, Transaction } from './types';

type Page = 'home' | 'packages' | 'package-detail' | 'admin' | 'admin-login' | 'user-login';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const USER_CREDENTIALS = {
  username: 'user',
  password: 'user123'
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userLoginData, setUserLoginData] = useState({ username: '', password: '' });
  const [userLoginError, setUserLoginError] = useState('');

  const [packages, setPackages] = useState<TourPackage[]>([
    {
      id: '1',
      name: 'Bali Paradise Tour',
      location: 'Bali, Indonesia',
      description: 'Nikmati keindahan pulau dewata dengan mengunjungi pantai-pantai eksotis, pura-pura bersejarah, dan budaya Bali yang memukau. Paket ini mencakup kunjungan ke Tanah Lot, Ubud, dan Nusa Penida.',
      imageUrl: 'https://www.baliagatour.co.id/wp-content/uploads/2025/05/7-Destinasi-Wisata-Terbaik-di-Bali-Timur-yang-Wajib-Kamu-Kunjungi.jpg',
      price: 3500000,
      duration: '4 Hari 3 Malam',
      schedule: 'Setiap hari',
      facilities: ['Hotel bintang 4', 'Transportasi AC', 'Makan 3x sehari', 'Tiket wisata']
    },
    {
      id: '2',
      name: 'Bromo Sunrise Adventure',
      location: 'Bromo, Jawa Timur',
      description: 'Saksikan matahari terbit paling spektakuler di Gunung Bromo. Rasakan petualangan menantang dengan pemandangan lautan pasir dan kawah aktif yang menakjubkan.',
      imageUrl: 'https://a.storyblok.com/f/78828/dd7b752616/ef-id-blog-top-banner-6-tips-wisata-ke-bromo-dari-malang.jpg/m/1500x750/filters:focal(960x375:961x376):quality(70)',
      price: 2500000,
      duration: '3 Hari 2 Malam',
      schedule: 'Senin, Rabu, Jumat',
      facilities: ['Hotel bintang 3', 'Jeep 4x4', 'Makan 2x sehari', 'Tiket masuk Bromo', 'Jaket hangat']
    },
    {
      id: '3',
      name: 'Raja Ampat Diving',
      location: 'Raja Ampat, Papua',
      description: 'Jelajahi surga bawah laut Indonesia dengan keanekaragaman hayati terkaya di dunia. Diving di spot-spot terbaik Raja Ampat dengan instruktur bersertifikat.',
      imageUrl: 'https://www.mikumbadiving.com/wp-content/uploads/2024/01/Dive-and-Sail-Liveaboard-Diving-in-Komodo-and-Raja-Ampat-1080x675.png',
      price: 8500000,
      duration: '5 Hari 4 Malam',
      schedule: 'Sabtu & Minggu',
      facilities: ['Resort tepi pantai', 'Peralatan diving lengkap', 'Instruktur diving', 'All meals', 'Boat transfer', 'Underwater photography']
    },
    {
      id: '4',
      name: 'Yogyakarta Heritage',
      location: 'Yogyakarta, Jawa Tengah',
      description: 'Eksplorasi warisan budaya dan sejarah Yogyakarta. Kunjungi Candi Borobudur, Prambanan, Keraton, dan rasakan kuliner khas Jogja yang legendaris.',
      imageUrl: 'https://cdn.wisata.app/diary/10701120-5039-8022-a090-c3b79929f319_sm.jpg',
      price: 2000000,
      duration: '3 Hari 2 Malam',
      schedule: 'Setiap hari',
      facilities: ['Hotel bintang 3', 'Transportasi AC', 'Makan 2x sehari', 'Tiket wisata', 'Oleh-oleh khas Jogja']
    },
    {
      id: '5',
      name: 'Komodo Island Explorer',
      location: 'Labuan Bajo, NTT',
      description: 'Bertemu langsung dengan komodo, hewan purba yang hanya ada di Indonesia. Snorkeling di Pink Beach dan menikmati sunset di Pulau Padar.',
      imageUrl: 'https://authentic-indonesia.com/wp-content/uploads/2024/02/Komodo-Island-which-is-the-original-habitat-of-a-protected-animal-the-Komodo-dragon.png',
      price: 5500000,
      duration: '4 Hari 3 Malam',
      schedule: 'Selasa & Jumat',
      facilities: ['Hotel bintang 4', 'Kapal wisata', 'All meals', 'Snorkeling gear', 'Tiket Taman Nasional Komodo']
    },
    {
      id: '6',
      name: 'Lombok Beach Relaxation',
      location: 'Lombok, NTB',
      description: 'Bersantai di pantai-pantai indah Lombok yang masih alami. Kunjungi Gili Trawangan, Air Terjun Tiu Kelep, dan nikmati sunset di Pantai Senggigi.',
      imageUrl: 'https://www.nowbali.co.id/wp-content/uploads/2024/10/Beach-min-1536x1023.jpg',
      price: 3000000,
      duration: '3 Hari 2 Malam',
      schedule: 'Setiap hari',
      facilities: ['Hotel tepi pantai', 'Makan 3x sehari', 'Snorkeling trip', 'Welcome drink']
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleSelectPackage = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    setCurrentPage('package-detail');
  };

  const handleBooking = (customer: Customer, transaction: Transaction) => {
    setCustomers(prev => [...prev, customer]);
    setTransactions(prev => [...prev, transaction]);
  };

  const handleAddPackage = (pkg: Omit<TourPackage, 'id'>) => {
    const newPackage = { ...pkg, id: Date.now().toString() };
    setPackages(prev => [...prev, newPackage]);
  };

  const handleUpdatePackage = (pkg: TourPackage) => {
    setPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p));
  };

  const handleDeletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('admin-login');
    }
    setMobileMenuOpen(false);
  };

  const handleAdminLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      loginData.username === ADMIN_CREDENTIALS.username &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAdminLoggedIn(true);
      setAdminName(loginData.username);
      setLoginError('');
      setCurrentPage('admin');
      setLoginData({ username: '', password: '' });
    } else {
      setLoginError('Username atau password salah.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminName('');
    setCurrentPage('home');
  };

  const handleRequireUserLogin = () => {
    setCurrentPage('user-login');
  };

  const handleUserLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userLoginData.username === USER_CREDENTIALS.username &&
      userLoginData.password === USER_CREDENTIALS.password
    ) {
      setIsUserLoggedIn(true);
      setUserName(userLoginData.username);
      setUserLoginError('');
      setCurrentPage(selectedPackage ? 'package-detail' : 'packages');
      setUserLoginData({ username: '', password: '' });
    } else {
      setUserLoginError('Username atau password pengguna salah.');
    }
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              TripKita
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`font-semibold transition-colors ${
                  currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => setCurrentPage('packages')}
                className={`font-semibold transition-colors ${
                  currentPage === 'packages' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Paket Wisata
              </button>
              <button
                onClick={() => setCurrentPage('user-login')}
                className={`font-semibold transition-colors ${
                  currentPage === 'user-login' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {isUserLoggedIn ? `Halo, ${userName}` : 'Masuk'}
              </button>
              <button
                onClick={handleAdminClick}
                className={`font-semibold transition-colors ${
                  currentPage === 'admin' || currentPage === 'admin-login' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              <button
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left font-semibold text-gray-700 hover:text-blue-600"
              >
                Beranda
              </button>
              <button
                onClick={() => { setCurrentPage('packages'); setMobileMenuOpen(false); }}
                className="block w-full text-left font-semibold text-gray-700 hover:text-blue-600"
              >
                Paket Wisata
              </button>
              <button
                onClick={() => { setCurrentPage('user-login'); setMobileMenuOpen(false); }}
                className="block w-full text-left font-semibold text-gray-700 hover:text-blue-600"
              >
                {isUserLoggedIn ? `Halo, ${userName}` : 'Masuk'}
              </button>
              <button
                onClick={handleAdminClick}
                className="block w-full text-left font-semibold text-gray-700 hover:text-blue-600"
              >
                Admin
              </button>
            </div>
          )}
        </div>
      </nav>
      <main>
        {currentPage === 'home' && (
          <HomePage onExplore={() => setCurrentPage('packages')} />
        )}
        {currentPage === 'packages' && (
          <PackageList packages={packages} onSelectPackage={handleSelectPackage} />
        )}
        {currentPage === 'package-detail' && selectedPackage && (
          <PackageDetail
            package={selectedPackage}
            onBack={() => setCurrentPage('packages')}
            onBooking={handleBooking}
            isUserLoggedIn={isUserLoggedIn}
            userName={userName}
            onRequireLogin={handleRequireUserLogin}
          />
        )}
        {currentPage === 'user-login' && (
          <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Login Pengguna</h2>
              <p className="text-sm text-gray-500 mb-6">
                Silakan masuk dengan username dan password sebelum melakukan pemesanan.
              </p>
              <form onSubmit={handleUserLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    required
                    value={userLoginData.username}
                    onChange={(e) => setUserLoginData({ ...userLoginData, username: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="user"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={userLoginData.password}
                    onChange={(e) => setUserLoginData({ ...userLoginData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan password"
                  />
                </div>
                {userLoginError && <p className="text-sm text-red-600">{userLoginError}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Masuk
                </button>
                {isUserLoggedIn && (
                  <button
                    type="button"
                    onClick={handleUserLogout}
                    className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
        {(currentPage === 'admin-login' || (currentPage === 'admin' && !isAdminLoggedIn)) && (
          <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Login Admin</h2>
              <p className="text-sm text-gray-500 mb-6">
                Silakan masuk dengan username dan password untuk mengakses panel admin.
              </p>
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    required
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan password"
                  />
                </div>
                {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Masuk
                </button>
              </form>
            </div>
          </div>
        )}
        {currentPage === 'admin' && isAdminLoggedIn && (
          <AdminPanel
            packages={packages}
            customers={customers}
            transactions={transactions}
            onAddPackage={handleAddPackage}
            onUpdatePackage={handleUpdatePackage}
            onDeletePackage={handleDeletePackage}
            adminName={adminName}
            onLogout={handleAdminLogout}
          />
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                TripKita
              </h3>
              <p className="text-gray-400">Platform pemesanan paket wisata terpercaya di Indonesia</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <p className="text-gray-400">Telepon: 0815-4114-0765</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Alamat</h4>
              <p className="text-gray-400">Jl. Zainal Abidin, PagarAlam, Bandar Lampung</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 TripKita</p>
          </div>
        </div>
      </footer>
    </div>
  );
}