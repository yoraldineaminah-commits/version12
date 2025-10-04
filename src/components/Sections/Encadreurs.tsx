import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Users, CreditCard as Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import EncadreurFormModal from '../Modals/EncadreurFormModal';

export default function Encadreurs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedEncadreur, setSelectedEncadreur] = useState<string | null>(null);

  const encadreurs = mockUsers.filter(user => user.role === 'encadreur');

  const filteredEncadreurs = encadreurs.filter(encadreur =>
    encadreur.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    encadreur.profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    encadreur.profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    encadreur.profile.departement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEncadreur = () => {
    setSelectedEncadreur(null);
    setShowFormModal(true);
  };

  const handleEditEncadreur = (id: string) => {
    setSelectedEncadreur(id);
    setShowFormModal(true);
  };

  const getStagiairesCount = (encadreurId: string) => {
    const encadreur = mockUsers.find(u => u.id === encadreurId);
    return encadreur?.stagiaires?.length || 0;
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Encadreurs</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {filteredEncadreurs.length} encadreur{filteredEncadreurs.length > 1 ? 's' : ''} trouvé{filteredEncadreurs.length > 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={handleAddEncadreur}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Ajouter un Encadreur</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un encadreur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Encadreur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Département
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stagiaires
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEncadreurs.map((encadreur) => (
                  <tr key={encadreur.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold">
                          {encadreur.profile.firstName[0]}{encadreur.profile.lastName[0]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {encadreur.profile.firstName} {encadreur.profile.lastName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {encadreur.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {encadreur.profile.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {encadreur.profile.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {encadreur.profile.departement}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {getStagiairesCount(encadreur.id) === 0 ? (
                          <span className="text-gray-400 dark:text-gray-500 italic">Aucun stagiaire</span>
                        ) : (
                          <span>{getStagiairesCount(encadreur.id)} stagiaire{getStagiairesCount(encadreur.id) > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditEncadreur(encadreur.id)}
                        className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Êtes-vous sûr de vouloir supprimer ${encadreur.profile.prenom} ${encadreur.profile.nom}?`)) {
                            console.log('Supprimer encadreur:', encadreur.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEncadreurs.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucun encadreur trouvé</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'Essayez de modifier votre recherche.' : 'Commencez par ajouter un nouvel encadreur.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EncadreurFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        encadreurId={selectedEncadreur}
      />
    </>
  );
}
