import { useState } from 'react';
import {Calendar, Users, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { TourPackage, Customer, Transaction } from '../types';

interface PackageDetailProps {
  package: TourPackage;
  onBack: () => void;
  onBooking: (customer: Customer, transaction: Transaction) => void;
  isUserLoggedIn: boolean;
  userName: string;
  onRequireLogin: () => void;
}

export function PackageDetail({ package: pkg, onBack, onBooking, isUserLoggedIn, userName, onRequireLogin }: PackageDetailProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customer: Customer = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      createdAt: new Date().toISOString()
    };

    const transaction: Transaction = {
      id: Date.now().toString(),
      packageId: pkg.id,
      customerId: customer.id,
      customerName: customer.name,
      packageName: pkg.name,
      participants: formData.participants,
      totalPrice: pkg.price * formData.participants,
      date: formData.date,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onBooking(customer, transaction);
    alert('Pemesanan berhasil! Terima kasih telah memesan dengan TripKita.');
    setShowBookingForm(false);
    setFormData({ name: '', email: '', phone: '', participants: 1, date: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Daftar Paket
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 relative overflow-hidden">
            {pkg.imageUrl ? (
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-400" />
            )}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <h1 className="text-5xl font-bold text-white mb-2">{pkg.name}</h1>
              <div className="flex items-center text-white/90">
                <span className="text-xl">{pkg.location}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Durasi</p>
                  <p className="font-semibold text-gray-800">{pkg.duration}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-teal-50 rounded-xl">
                <Calendar className="w-8 h-8 text-teal-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Jadwal</p>
                  <p className="font-semibold text-gray-800">{pkg.schedule}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Harga per Orang</p>
                  <p className="font-semibold text-gray-800">Rp {pkg.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Deskripsi</h2>
              <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Fasilitas</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {pkg.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {!showBookingForm ? (
              <button
                onClick={() => {
                  if (isUserLoggedIn) {
                    setShowBookingForm(true);
                  } else {
                    onRequireLogin();
                  }
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Pesan Sekarang
              </button>
            ) : (
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Form Pemesanan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name || userName}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">No. Telepon</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Keberangkatan</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Peserta</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Total Harga:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        Rp {(pkg.price * formData.participants).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Konfirmasi Pemesanan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
