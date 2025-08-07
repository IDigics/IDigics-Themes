import React from "react";

interface ActionButtonsProps {
  onGiveRating: () => void;
  onReserveCoupon: () => void;
  onOpenContact: () => void;
  onShare: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onGiveRating, onReserveCoupon, onOpenContact, onShare }) => (
  <div className="flex flex-wrap gap-3 justify-center my-4">
    <button className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={onGiveRating}>
      Donner un avis
    </button>
    <button className="btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={onReserveCoupon}>
      Réserver un coupon
    </button>
    <button className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onOpenContact}>
      Échanger un contact
    </button>
    <button className="btn bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={onShare}>
      Partager
    </button>
  </div>
);

export default ActionButtons;
