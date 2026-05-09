import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Package, Users, Receipt } from 'lucide-react';
import { TourPackage, Customer, Transaction } from '../types';

interface AdminPanelProps {
  packages: TourPackage[];
  customers: Customer[];
  transactions: Transaction[];
  onAddPackage: (pkg: Omit<TourPackage, 'id'>) => void;
  onUpdatePackage: (pkg: TourPackage) => void;
  onDeletePackage: (id: string) => void;
  adminName: string;
  onLogout: () => void;
}

export function AdminPanel({
  packages,
  customers,
  transactions,
  onAddPackage,
  onUpdatePackage,
  onDeletePackage,
  adminName,
  onLogout
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'packages' | 'customers' | 'transactions'>('packages');
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    duration: '',
    schedule: '',
    facilities: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      description: '',
      price: '',
      duration: '',
      schedule: '',
      facilities: ''
    });
    setEditingPackage(null);
    setShowForm(false);
  };

  const handleEdit = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      location: pkg.location,
      description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration,
      schedule: pkg.schedule,
      facilities: pkg.facilities.join(', ')
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packageData = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      price: parseInt(formData.price),
      duration: formData.duration,
      schedule: formData.schedule,
      facilities: formData.facilities.split(',').map(f => f.trim())
    };

    if (editingPackage) {
      onUpdatePackage({ ...packageData, id: editingPackage.id });
    } else {
      onAddPackage(packageData);
    }
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-600 mt-1">Login sebagai: <span className="font-semibold text-gray-800">{adminName}</span></p>
          </div>
          <button
            onClick={onLogout}
            className="self-start md:self-auto bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'packages'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Paket Wisata
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'customers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Pelanggan
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'transactions'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Receipt className="w-5 h-5 mr-2" />
            Transaksi
          </button>
        </div>

        {activeTab === 'packages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Kelola Paket Wisata</h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tambah Paket
              </button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {editingPackage ? 'Edit Paket' : 'Tambah Paket Baru'}
                    </h3>
                    <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Paket</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Durasi</label>
                        <input
                          type="text"
                          required
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="3 Hari 2 Malam"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Jadwal</label>
                      <input
                        type="text"
                        required
                        value={formData.schedule}
                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Setiap hari"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Fasilitas (pisahkan dengan koma)</label>
                      <textarea
                        required
                        value={formData.facilities}
                        onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Hotel bintang 4, Transportasi AC, Makan 3x sehari"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        {editingPackage ? 'Update' : 'Simpan'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Nama Paket</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Lokasi</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Harga</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Durasi</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">{pkg.name}</td>
                      <td className="px-6 py-4 text-gray-600">{pkg.location}</td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">Rp {pkg.price.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4 text-gray-600">{pkg.duration}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Yakin ingin menghapus paket ini?')) {
                                onDeletePackage(pkg.id);
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Data Pelanggan</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Nama</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Telepon</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Tanggal Daftar</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">{customer.name}</td>
                      <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                      <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(customer.createdAt).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Data Transaksi</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">ID Transaksi</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Pelanggan</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Paket</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Peserta</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Total</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Tanggal</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-600 font-mono text-sm">{transaction.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 text-gray-800">{transaction.customerName}</td>
                      <td className="px-6 py-4 text-gray-800">{transaction.packageName}</td>
                      <td className="px-6 py-4 text-gray-600">{transaction.participants} orang</td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">
                        Rp {transaction.totalPrice.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(transaction.date).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
