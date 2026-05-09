import {Calendar, Users, DollarSign } from 'lucide-react';
import { TourPackage } from '../types';

interface PackageListProps {
  packages: TourPackage[];
  onSelectPackage: (pkg: TourPackage) => void;
}

export function PackageList({ packages, onSelectPackage }: PackageListProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Paket Wisata</h1>
        <p className="text-xl text-gray-600 mb-12">Pilih destinasi impian Anda dan mulai petualangan yang tak terlupakan</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
              onClick={() => onSelectPackage(pkg)}
            >
              <div className="h-56 relative overflow-hidden">
                {pkg.imageUrl ? (
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-300" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                </div>
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                  <span className="font-bold text-blue-600">{pkg.duration}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-2xl mb-2 text-gray-800">{pkg.name}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <span>{pkg.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Mulai dari</p>
                    <p className="text-2xl font-bold text-blue-400">Rp {pkg.price.toLocaleString('id-ID')}</p>
                  </div>
                  <button className="bg-blue-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
