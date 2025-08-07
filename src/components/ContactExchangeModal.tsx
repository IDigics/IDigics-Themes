import React from "react";
import Modal from "./Modal";

interface ContactExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactExchangeModal: React.FC<ContactExchangeModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Échange de contact">
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-700">Fonctionnalité d’échange de contact à venir !</p>
    </div>
  </Modal>
);

export default ContactExchangeModal;
