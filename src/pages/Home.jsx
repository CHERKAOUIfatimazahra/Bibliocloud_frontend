import React from "react";
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Star,
  Users,
  BookMarked,
  Trophy,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const featuredBooks = [
    {
      title: "Les Misérables",
      author: "Victor Hugo",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdJFoBHIV7dfOZTVhLYKVZ0auQ57Bq7ZVtQ&s",
      rating: 4.8,
      category: "Roman Classique",
    },
    {
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      cover:
        "https://images.dassault-aviation.com/f_auto,q_auto,g_center,dpr_auto/wp-auto-upload/2/files/2024/01/petitprince.jpg",
      rating: 4.9,
      category: "Conte Philosophique",
    },
    {
      title: "Notre-Dame de Paris",
      author: "Victor Hugo",
      cover:
        "https://librairie-en-ligne.com/cdn/shop/products/2877141241.jpg?v=1702488224",
      rating: 4.7,
      category: "Roman Historique",
    },
  ];

  const upcomingEvents = [
    {
      title: "Club de Lecture",
      date: "15 Dec 2024",
      time: "18h00",
      description: "Discussion autour des œuvres de Albert Camus",
    },
    {
      title: "Atelier d'Écriture",
      date: "18 Dec 2024",
      time: "14h00",
      description: "Créez votre première nouvelle",
    },
    {
      title: "Rencontre d'Auteur",
      date: "20 Dec 2024",
      time: "17h00",
      description: "Séance de dédicace et discussion",
    },
  ];

  const statistics = [
    {
      number: "50,000+",
      label: "Livres",
      icon: <BookMarked className="h-6 w-6" />,
    },
    {
      number: "10,000+",
      label: "Membres",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "1,000+",
      label: "E-Books",
      icon: <BookOpen className="h-6 w-6" />,
    },
    { number: "100+", label: "Prix", icon: <Trophy className="h-6 w-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced with background pattern */}
      <section className="bg-emerald-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPgogIDxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+Cjwvc3ZnPg==')]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-6">
              Votre Bibliothèque Numérique
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explorez notre vaste collection de livres, participez à nos
              événements culturels et rejoignez notre communauté de lecteurs
              passionnés
            </p>
            <div className="flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Rechercher un livre, un auteur..."
                  className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
                />
                <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - New */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section - Enhanced */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Nos Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <BookOpen className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Catalogue</h3>
              <p className="text-gray-600 mb-4">
                Plus de 50,000 ouvrages disponibles dans notre collection
              </p>
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <Clock className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Horaires</h3>
              <p className="text-gray-600 mb-4">
                Lun-Ven: 9h-20h
                <br />
                Sam-Dim: 10h-18h
              </p>
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <Calendar className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Événements</h3>
              <p className="text-gray-600 mb-4">
                Découvrez nos prochains événements culturels
              </p>
              <button className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                Voir l'agenda <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section - Enhanced */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Livres à la Une
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
              >
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-80 object-cover rounded-md mb-4"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                </div>
                <span className="text-sm text-emerald-600 font-medium mb-2 block">
                  {book.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.author}</p>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition duration-300">
                  Emprunter
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - New */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Événements à Venir
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start mb-4">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {event.title}
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      {event.date} - {event.time}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-4 py-2 rounded-md transition duration-300">
                  S'inscrire
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Enhanced */}
      <section className="py-16 bg-emerald-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPgogIDxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+Cjwvc3ZnPg==')]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl font-serif font-bold mb-4">Restez Informé</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières
            actualités, recommandations de lecture et invitations aux événements
          </p>
          <div className="flex justify-center">
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-r-md transition duration-300 font-medium">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
