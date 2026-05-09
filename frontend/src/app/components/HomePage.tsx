import { MapPin, Calendar, Star } from 'lucide-react';

interface HomePageProps {
  onExplore: () => void;
}

export function HomePage({ onExplore }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-br from-violet-400 via-blue-400 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">Jelajahi Indonesia Bersama TripKita</h1>
            <p className="text-xl mb-8 text-blue-50">Temukan paket wisata terbaik dengan harga terjangkau. Mulai petualangan Anda sekarang!</p>
            <button
              onClick={onExplore}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Jelajahi Paket Wisata
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Kenapa Memilih TripKita?</h2>
        <div className="grid md:grid-cols-3 gap-8 justify-items-center">
          <div className="w-full max-w-sm text-center p-6 rounded-xl hover:shadow-xl transition-shadow bg-white">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Destinasi Lengkap</h3>
            <p className="text-gray-600">Pilihan destinasi wisata terlengkap di seluruh Indonesia</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow bg-white">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Jadwal Fleksibel</h3>
            <p className="text-gray-600">Pilih jadwal yang sesuai dengan waktu Anda</p>
          </div>
          <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow bg-white">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Harga Terbaik</h3>
            <p className="text-gray-600">Dapatkan harga terbaik dengan fasilitas lengkap</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-violet-400 to-blue-400 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Petualangan?</h2>
          <p className="text-xl mb-8 text-blue-50">Pesan paket wisata impian Anda sekarang juga</p>
          <button
            onClick={onExplore}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Lihat Semua Paket
          </button>
        </div>
      </div>
    </div>
  );
}
