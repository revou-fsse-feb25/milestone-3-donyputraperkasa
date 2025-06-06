'use client';
import React, { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginPage from '../components/login';

export default function Cart({ cartItems = [], onCartUpdate }) {
  // const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // if (!session) {
  //   return (
  //     <div className="text-center mt-10">
  //       <p className="text-lg font-semibold mb-4">Silakan login untuk mengakses keranjang.</p>
  //       <button>

  //         {/* <LoginPage /> */}
  //       </button>
  //     </div>
  //   );
  // }

  const initialItemsRef = useRef(cartItems.map(item => ({ ...item, quantity: 1 })));
  const [items, setItems] = useState(initialItemsRef.current);

  // Fungsi hapus item berdasarkan id
  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    onCartUpdate?.(updatedItems);
  };

  // Fungsi tambah quantity berdasarkan id
  const incrementQuantity = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
    onCartUpdate?.(updatedItems);
  };

  // Fungsi kurang quantity berdasarkan id
  const decrementQuantity = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
    onCartUpdate?.(updatedItems);
  };

  // Total harga semua item
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Fungsi simulasi bayar
  const handlePayment = () => {
    alert(`Pembayaran sebesar $${totalPrice.toFixed(1)} berhasil!`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Isi Keranjang</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Keranjang kosong</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {[...items]
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((item) => (
                <li key={item.id} className="border p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>Harga: ${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <label className="block text-sm font-semibold mb-1">Rincian Pembayaran</label>
          <div className="flex justify-between">
            <div>
              <p> Price Product :</p>
              <p> Biaya Layanan :</p>
              <p> Biaya Pengiriman :</p>
              <p><strong>Total:</strong></p>
            </div>
            
            <div>
              <p>${totalPrice.toFixed(0)}</p>
              <p>$5</p>
              <p>$10</p>
            </div>
          </div>
          <div className="font-bold text-lg mb-4">Total: ${(totalPrice+15).toFixed(0)}</div>
          <div className=" flex justify-between m-4">
            <label className="block text-sm font-semibold">Metode Pembayaran</label>
              <div>
                <select className="w-full p-2 border rounded">
                  <option value="credit-card">Transfer Bank</option>
                  <option value="debit-card">COD</option>
                  <option value="paypal">Gopay</option>
                  <option value="paypal">Dana</option>
                  <option value="paypal">ShopeePay</option>
                </select>
              </div>
          </div>
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Bayar Sekarang
          </button>
        </>
      )}
    </div>
  );
}