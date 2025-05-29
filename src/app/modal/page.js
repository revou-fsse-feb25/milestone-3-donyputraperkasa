import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-80"
      data-testid="modal-overlay"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 float-right"
          data-testid="modal-close"
        >
          ✖
        </button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}