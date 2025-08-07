
'use client';
import { useState } from "react";
import Modal from "../components/Modal";
import ContactExchangeModal from "../components/ContactExchangeModal";
import ProfileMilestones from "../components/ProfileMilestones";
import PhotoGallery from "../components/PhotoGallery";
import VideoGallery from "../components/VideoGallery";
import { generateVCard, downloadVCard } from "../components/vcardUtils";
import QRCode from "../components/QRCode";

// Tabs are hardcoded in the navbar, so TABS array is not needed

export default function Home() {
  const [activeTab, setActiveTab] = useState('links');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [qrAnimating, setQrAnimating] = useState(false);
  // Données fictives pour toutes les sections nécessaires
  const profile = {
    name: "Dr. Sarah Martin",
    occupation: "Cardiologue - Centre Médical Paris",
    avatarUrl: "/avatar.png", // Placez la photo du médecin dans public/avatar.png
    email: "sarah.martin@centre-medical.fr",
    phone: "+33 1 23 45 67 89",
    about: "Cardiologue expérimentée, spécialisée dans la prévention et le suivi des maladies cardiovasculaires. Consultations, bilans, suivi post-opératoire et conseils santé personnalisés.",
    links: [
      { href: "https://doctolib.fr/medecin/paris/sarah-martin", label: "Prendre RDV" },
      { href: "https://maps.google.com/?q=Centre+Médical+Paris", label: "Itinéraire" },
      { href: "mailto:sarah.martin@centre-medical.fr", label: "Email" },
    ],
    bio: "Diplômée de la Faculté de Médecine de Paris, Dr. Martin exerce depuis 15 ans en cardiologie. Elle accompagne ses patients dans la prévention, le diagnostic et le traitement des pathologies cardiaques.",
    milestones: [
      { date: "2024", title: "Responsable du service cardiologie", description: "Centre Médical Paris" },
      { date: "2016", title: "Installation en libéral", description: "Cabinet privé à Paris 15e" },
      { date: "2010", title: "DES Cardiologie", description: "Université Paris Descartes" },
    ],
    photos: [
      { src: "/photo1.jpeg", alt: "Consultation au cabinet" },
      { src: "/photo2.jpeg", alt: "Équipe médicale" },
      { src: "/photo3.jpeg", alt: "Salle d'attente" },
    ],
    videos: [
      { src: "/video1.mp4", title: "Présentation du centre médical" },
      { src: "/video2.mp4", title: "Conseils santé cœur" },
    ],
    // ratings: [
    //   { user: "Patiente A.", comment: "Très à l'écoute, explications claires.", rating: 5 },
    //   { user: "Patient B.", comment: "Suivi sérieux, je recommande !", rating: 5 },
    // ],
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pb-8 overflow-x-hidden">
      {/* Background médical sur tout l'écran */}
      <div className="fixed inset-0 -z-10">
        <img src="/med-bg.jpeg" alt="Background médical" className="object-cover w-full h-full min-h-screen min-w-full" style={{filter:'brightness(0.6)'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-700/60 to-blue-100/60" />
      </div>
      {/* Espacement haut */}
      <div className="h-12" />
      {/* Bloc principal glassmorphisme */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-teal-100 flex flex-col items-center p-0 md:p-2">
        {/* Photo de profil centrée avec boutons aux extrémités */}
        <div className="flex flex-col items-center mb-2 mt-2 w-full">
          <div className="flex items-center justify-between w-full mb-2 px-2">
            <button
              className="rounded-full bg-green-100 hover:bg-green-200 text-green-700 p-3 shadow"
              title="Ajouter contact"
              onClick={() => {
                setActiveTab('vcard');
                setModalOpen(true);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14v6m3-3h-6m-2-5a4 4 0 100-8 4 4 0 000 8zm6 8v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              </svg>
            </button>
            <img src={profile.avatarUrl} alt={profile.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
            <button
              className="rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 shadow"
              title="Partager le profil"
              onClick={() => {
                const shareUrl = window.location.href;
                const shareData = {
                  title: profile.name,
                  text: `Découvrez le profil de ${profile.name} (${profile.occupation})`,
                  url: shareUrl,
                };
                if (navigator.share) {
                  navigator.share(shareData).catch(() => {});
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Lien du profil copié dans le presse-papier !');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.42 6.51l-6.83 3.98" />
              </svg>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{profile.name}</h1>
          <div className="text-teal-700 font-medium mb-2">{profile.occupation}</div>
        </div>
        {/* Navbar avec ligne horizontale */}
        <div className="w-full flex flex-col items-center mb-6">
          <nav className="flex gap-8 w-full justify-center">
            <button
              className={`relative font-semibold px-4 py-2 transition-colors duration-200 flex items-center gap-2 ${activeTab === 'links' ? 'text-teal-700' : 'text-gray-400 hover:text-teal-600'}`}
              onClick={() => setActiveTab('links')}
            >
              {/* Link icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 010 5.656l-3.535 3.535a4 4 0 01-5.657-5.657l1.414-1.414" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 010-5.656l3.535-3.535a4 4 0 015.657 5.657l-1.414 1.414" />
              </svg>
              Links
              {activeTab === 'links' && (
                <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-500 rounded-full w-full block" />
              )}
            </button>
            <button
              className={`relative font-semibold px-4 py-2 transition-colors duration-200 flex items-center gap-2 ${activeTab === 'about' ? 'text-teal-700' : 'text-gray-400 hover:text-teal-600'}`}
              onClick={() => setActiveTab('about')}
            >
              {/* Classic user icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
              </svg>
              About
              {activeTab === 'about' && (
                <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-500 rounded-full w-full block" />
              )}
            </button>
          </nav>
          <div className="w-full h-px bg-teal-100 mt-2" />
        </div>
        {/* Contenu conditionnel selon l’onglet actif */}
        <div className="w-full bg-white/30 backdrop-blur-md rounded-xl shadow p-6 border border-blue-100 mb-6">
          {activeTab === 'links' && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <a
                  href="https://doctolib.fr/medecin/paris/sarah-martin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg transition text-base text-center"
                >
                  {/* Calendar icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  Prendre RDV
                </a>
              </div>
              <div className="flex flex-row gap-4 mt-4 justify-center w-full max-w-lg mx-auto">
                <button
                  className={`flex-1 flex flex-row items-center justify-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-bold shadow-xl transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-green-300 ${saving ? 'scale-95 opacity-80' : ''}`}
                  style={{minWidth:'0'}}
                  title="Sauvegarder contact"
                  aria-label="Sauvegarder contact"
                  onClick={async () => {
                    setSaving(true);
                    const vcard = generateVCard(profile);
                    downloadVCard(vcard);
                    setToast('Contact sauvegardé !');
                    setTimeout(() => setToast(null), 2000);
                    setTimeout(() => setSaving(false), 400);
                  }}
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-transform duration-300 ${saving ? 'rotate-[-20deg] scale-110 text-green-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span className="text-base font-semibold">{saving ? 'Enregistré !' : 'Sauvegarder contact'}</span>
                </button>
                <button
                  className={`flex-1 flex flex-row items-center justify-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 text-white font-bold shadow-xl transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 ${qrAnimating ? 'scale-95 opacity-80' : ''}`}
                  style={{minWidth:'0'}}
                  title="QR Code"
                  aria-label="QR Code"
                  onClick={() => {
                    setQrAnimating(true);
                    setActiveTab('qr');
                    setModalOpen(true);
                    setToast('QR Code affiché !');
                    setTimeout(() => setToast(null), 2000);
                    setTimeout(() => setQrAnimating(false), 400);
                  }}
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-transform duration-300 ${qrAnimating ? 'rotate-6 scale-110 text-blue-200' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 6v-6h6v6h-6z" />
                    </svg>
                  </span>
                  <span className="text-base font-semibold">QR Code</span>
                </button>
              </div>



              {/* Section Connect with me - version pro */}
              <div className="w-full mt-8 flex flex-col items-center">
                <div className="flex flex-col items-center w-full mb-2">
                  <span className="text-2xl font-extrabold text-gray-900 text-center w-full tracking-tight drop-shadow-sm">Connect with me</span>
                  <div className="w-full h-px bg-gradient-to-r from-blue-200 via-gray-200 to-blue-200 mt-2" />
                </div>
                <div className="flex flex-col gap-5 w-full max-w-lg mx-auto mb-4">
                  <a href="https://linkedin.com/in/sarah-martin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-blue-200 bg-white/80 hover:bg-blue-50 text-blue-800 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-blue-300 backdrop-blur-md">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.87 0-2.156 1.46-2.156 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z"/></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">LinkedIn</span>
                  </a>
                  <a href="https://blog.cardiologie-sarah.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-pink-200 bg-white/80 hover:bg-pink-50 text-pink-700 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-md">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 group-hover:bg-pink-200 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h7l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">Blog</span>
                  </a>
                  <a href="https://facebook.com/sarahmartin.cardiologue" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-blue-200 bg-white/80 hover:bg-blue-100 text-blue-800 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-blue-300 backdrop-blur-md">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.729 0 1.321-.593 1.321-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z"/></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">Facebook</span>
                  </a>
                  <a href="https://centre-medical-paris.fr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-gray-300 bg-white/80 hover:bg-gray-100 text-gray-700 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-gray-300 backdrop-blur-md">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 group-hover:bg-gray-300 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">Website</span>
                  </a>
                </div>
              </div>

              {/* Section Get in touch - version pro */}
              <div className="w-full mt-4 flex flex-col items-center">
                <div className="flex flex-col items-center w-full mb-2">
                  <span className="text-2xl font-extrabold text-gray-900 text-center w-full tracking-tight drop-shadow-sm">Get in touch</span>
                  <div className="w-full h-px bg-gradient-to-r from-green-200 via-gray-200 to-green-200 mt-2" />
                </div>
                <div className="flex flex-col gap-5 w-full max-w-lg mx-auto mb-2">
                  <a href="tel:+33123456789" className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-green-200 bg-white/80 hover:bg-green-50 text-green-800 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-green-300 backdrop-blur-md">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 transition-all">
                      {/* Classic phone icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a16 16 0 0016 16l3-3a2 2 0 00-2-2l-4-1a2 2 0 00-2 2l-2-2a2 2 0 002-2l-1-4a2 2 0 00-2-2l-3 3z" /></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">Office Phone</span>
                  </a>
                  <a href="https://wa.me/33123456789" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-green-300 bg-white/80 hover:bg-green-100 text-green-800 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-md">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.45l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">WhatsApp</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Centre+Médical+Paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-blue-200 bg-white/80 hover:bg-blue-50 text-blue-800 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-blue-300 backdrop-blur-md"
                  >
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all">
                      {/* Location icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" /></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">Office Location</span>
                  </a>
                  <a
                    href="mailto:sarah.martin@centre-medical.fr"
                    className="flex items-center gap-4 px-7 py-4 rounded-2xl border border-green-200 bg-white/80 hover:bg-green-50 text-green-800 font-semibold shadow-xl transition-all duration-200 text-lg min-w-[220px] group focus:outline-none focus:ring-2 focus:ring-green-300 backdrop-blur-md"
                  >
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-200 transition-all">
                      {/* Mail icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="M3 7l9 6 9-6"/></svg>
                    </span>
                    <span className="flex-1 text-center text-lg font-semibold tracking-tight">Email</span>
                  </a>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'about' && (
            <div className="flex flex-col gap-6">
              {/* Profile Overview title and underline */}
              <div className="flex flex-col items-center mb-2">
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight font-sans">Profile Overview</span>
                <div className="w-12 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full mt-1 mb-2" />
              </div>
              {/* Global Rating card */}
              <div className="bg-white/90 rounded-2xl shadow p-6 border border-blue-100 flex flex-col gap-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-500 to-teal-400 uppercase tracking-wider mb-1 drop-shadow-sm font-sans">Global Rating</span>
                  {/* Stars: 4 full + 1 half */}
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="h-7 w-7 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                    {/* half star */}
                    <svg className="h-7 w-7 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <defs>
                        <linearGradient id="half-grad-global" x1="0" x2="100%" y1="0" y2="0">
                          <stop offset="50%" stopColor="#facc15"/>
                          <stop offset="50%" stopColor="#e5e7eb"/>
                        </linearGradient>
                      </defs>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half-grad-global)"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-2xl text-gray-900">4.7</span>
                    <span className="text-gray-500 text-base">/ 5</span>
                    <span className="text-gray-400 text-base">(120 reviews)</span>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-3 mt-3">
                    <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border-2 border-yellow-400 text-yellow-600 font-semibold shadow-sm transition text-base focus:outline-none focus:ring-2 focus:ring-yellow-200 hover:bg-yellow-50" onClick={() => alert('Donner un avis')}>
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      Give rating
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border-2 border-teal-400 text-teal-700 font-semibold shadow-sm transition text-base focus:outline-none focus:ring-2 focus:ring-teal-200 hover:bg-teal-50" onClick={() => alert('Réserver un coupon')}>
                      {/* Coupon icon */}
                      <svg className="h-5 w-5 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 7v2m0 6v2m10-10v2m0 6v2"/><circle cx="12" cy="12" r="2"/></svg>
                      Reserve coupon
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Rating section */}
              <div className="bg-white/80 rounded-2xl shadow p-5 border border-teal-100 flex flex-col divide-y divide-blue-100">
                {/* Detailed Rating title */}
                <div className="flex flex-col items-center mb-2">
                  <span className="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-500 to-teal-400 uppercase tracking-wider mb-1 drop-shadow-sm font-sans">Detailed Rating</span>
                  <div className="w-10 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full mt-1 mb-2" />
                </div>
                {/* Ratings by criteria */}
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-700">Quality of Work</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-6 w-6 ${i < 5 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-700">Communication</span>
                  <div className="flex items-center gap-1">
                    {/* 4 full stars */}
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                    {/* half star */}
                    <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <defs>
                        <linearGradient id="half-grad" x1="0" x2="100%" y1="0" y2="0">
                          <stop offset="50%" stopColor="#facc15"/>
                          <stop offset="50%" stopColor="#e5e7eb"/>
                        </linearGradient>
                      </defs>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half-grad)"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-700">Medical Expertise</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-6 w-6 ${i < 5 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-700">Empathy & Care</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-6 w-6 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-700">Punctuality</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-6 w-6 ${i < 5 ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {/* Bio title and underline outside card */}
              <div className="flex flex-col items-center mb-1">
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight font-sans">Bio</span>
                <div className="w-12 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full mt-1 mb-2" />
              </div>
              <div className="bg-white/90 rounded-2xl shadow p-6 border border-blue-100 flex flex-col gap-2">
                <div className="text-gray-700 text-base">{profile.bio}</div>
              </div>

              {/* Milestones */}
              {/* Milestones title and underline outside card */}
              <div className="flex flex-col items-center mb-1">
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight font-sans">Milestones</span>
                <div className="w-12 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full mt-1 mb-2" />
              </div>
              <div className="bg-white/90 rounded-2xl shadow p-6 border border-teal-100 flex flex-col gap-2">
                <ProfileMilestones milestones={profile.milestones} />
              </div>

              {/* Photos */}
              {/* Photos title and underline outside card */}
              <div className="flex flex-col items-center mb-1">
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight font-sans">Photos</span>
                <div className="w-12 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full mt-1 mb-2" />
              </div>
              <div className="bg-white/90 rounded-2xl shadow p-6 border border-blue-100 flex flex-col gap-2">
                <PhotoGallery photos={profile.photos} />
              </div>

              {/* Videos */}
              {/* Videos title and underline outside card */}
              <div className="flex flex-col items-center mb-1">
                <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight font-sans">Vidéos</span>
                <div className="w-12 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full mt-1 mb-2" />
              </div>
              <div className="bg-white/90 rounded-2xl shadow p-6 border border-blue-100 flex flex-col gap-2">
                <VideoGallery videos={profile.videos} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modale vCard/QR */}
      <Modal isOpen={isModalOpen} onClose={() => { setModalOpen(false); if (activeTab === 'qr') setActiveTab('links'); }} title={activeTab === "vcard" ? "Télécharger vCard" : "QR Code"}>
        {activeTab === "vcard" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700">Cliquez pour télécharger la carte de contact vCard.</p>
            <button
              className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                const vcard = generateVCard(profile);
                downloadVCard(vcard);
                setToast('Contact sauvegardé !');
                setTimeout(() => setToast(null), 2000);
              }}
            >
              Télécharger vCard
            </button>
          </div>
        )}
        {activeTab === "qr" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 mb-2">Scannez pour accéder au profil :</p>
            <QRCode value={typeof window !== 'undefined' ? window.location.href : ''} size={180} />
            <button
              className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
              onClick={() => {
                const canvas = document.querySelector('canvas');
                if (canvas) {
                  const url = canvas.toDataURL('image/png');
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'qr-code.png';
                  a.click();
                  setToast('QR Code téléchargé !');
                  setTimeout(() => setToast(null), 2000);
                }
              }}
            >
              Télécharger QR Code
            </button>
          </div>
        )}
      </Modal>
      {/* Modale échange de contact */}
      <ContactExchangeModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg z-50 text-lg font-semibold animate-fade-in-out">
          {toast}
        </div>
      )}
    </div>
  );
}
