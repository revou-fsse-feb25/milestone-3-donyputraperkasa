'use client';
import Image from "next/image";
import { useState, useEffect, useContext, use } from "react";
import { Menu, X, ShoppingCart, User, Headset, Truck, Search } from "lucide-react";
import Link from "next/link";
import Modal from "./modal/page";
import LoginPage from "./components/login";
import Cart from "./cart/page";
import { useSession } from "next-auth/react";

//bagian inti
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [loggedInUser, setLoggedInUser] = useState(null); 
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [helpDesk, setHelpDesk] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [originalProduct, setOriginalProduct] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);
  // Tambahkan state cartItems
  const [cartItems, setCartItems] = useState([]);
  // State untuk modal cart
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session, status } = useSession();
  const [showCart, setShowCart] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
console.log("Auth Status:", status);
console.log("Session:", session);

  useEffect(() => {
  const token = localStorage.getItem("access_token");
  setIsAuthenticated(!!token);
}, []);

  useEffect(() => {
    if (status === "authenticated") {
      setShowCart(true);
    }
  }, [status]); 

// const ShowCart = () => {
//   if (status === "authenticated") {
//     setShowCart(true);
//   }
// }

  // Ambil cart dari localStorage saat pertama kali
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Simpan cart ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // sumber
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.escuelajs.co/api/v1/products', {
          next: { revalidate: 60 }
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        setProduct(data);
        setOriginalProduct(data);
        setError(null)
        setLoading(false)
      } catch (err) {
        setError(err.message);
        console.log(error);
      }
    }
    fetchDataProduct();
  }, [])
  console.log(product)
  if (loading) {
    return <p className="text-center text-xl text-gray-800">Loading...</p>;
  }

  const handleReset = () => {
    setUserName("");
    setPassword("");
  };

  // untuk CRUD nya
  const handleAddProduct = () => {
    if (newProduct.id) {
      // bagian edit
      const updated = product.map((p) =>
        p.id === newProduct.id ? { ...p, ...newProduct, images: p.images } : p
      );
      setProduct(updated);
      setOriginalProduct(updated);
    } else {
      // bagian add
      const newItem = {
        id: product.length > 0 ? Math.max(...product.map((p) => p.id)) + 1 : 1,
        ...newProduct,
        images: ['https://via.placeholder.com/200'],
      };
      setProduct([newItem, ...product]);
      setOriginalProduct([newItem, ...originalProduct]);
    }
    setNewProduct({ title: '', price: '', description: '' });
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    // if (userName && password) {
    //   setLoggedInUser(userName); // Simpan nama user yang login
    //   setIsModalOpen(false);     // Tutup modal
    //   setUserName("");           // Reset form input
    //   setPassword("");
    //   alert("Login berhasil! \n Selamat datang " + userName);
    // } else {
    //   alert("Username dan password harus diisi");
    // }
  };


  return (
    <div className="h-screen w-screen">
      {/* bagian header */}
      {status === "authenticated" ? (
          <p>Login sukses! Tampilkan cart di sini.</p>
        ) : (
          <p>Belum login.</p>
        )}
      <header className="bg-white flex items-center p-4 outline outline-1 outline-orange-500 justify-between">
        <div className="mx-10">
          <h1 className="text-xl font-bold text-orange-500 ">mulaidarinol</h1>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className="hidden md:flex">
          <span className="flex items-center gap-2 mx-4 text-orange-500 font-bold border-b-2 border-orange-500 pb-1">
            <Link href="">Item</Link>
          </span>
          
          {/* Bagian Cart - hanya muncul jika login */}
          {/* <div className="relative mx-4 hover:text-orange-500 flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:text-orange-500"
            >
              Cart <ShoppingCart />
            </button>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
          )}
          </div> */}

          <div className="relative mx-4 hover:text-orange-500 flex items-center gap-2">
            { status === "authenticated" && 
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:text-orange-500"
            >
              Cart <ShoppingCart />
            </button>
            }
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* bagian help desk */}
          <button
            onClick={() => setHelpDesk(true)}
            className="flex items-center gap-2 mx-4 hover:text-orange-500"
          >
            { helpDesk ? "Help Desk" : "Help Desk"}<Headset />
          </button>
          <Modal isOpen={helpDesk} onClose={() => setHelpDesk(false)}>
            <h2 className="font-bold text-2xl mb-5 text-center">Help Desk</h2>
            <div className="items-center gap-2 mx-4 font-boldborder-orange-500 pb-1">
              <p>Subject</p>
              <textarea className="w-full border p-2 rounded mb-4"></textarea>
            </div>
            <div className="fitems-center gap-2 mx-4 font-boldborder-orange-500 pb-1">
              <p>Message</p>
              <textarea className="w-full border p-2 rounded mb-4"></textarea>
            </div>
            <button
              onClick={() => {
                alert("Pesan berhasil dikirim");
                setHelpDesk(false);
              }}
              className="flex items-center gap-2 mx-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </Modal>
          
          {/* bagian search */}
          <div className="mx-4">
            <div className="relative flex items-center">
              <span className="absolute left-2 text-gray-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search here"
                className="pl-8 border rounded-full px-2 py-1"
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  if (!searchValue) {
                    setProduct(originalProduct);
                  } else {
                    const filtered = originalProduct.filter((item) =>
                      item.title.toLowerCase().includes(searchValue)
                    );
                    setProduct(filtered);
                  }
                }}
              />
            </div>
          </div>

          {/* bagian login */}
          <div>
            <button
              className="flex items-center gap-2 mx-4 hover:text-orange-500"
              onClick={handleOpenModal}
            >
              {loggedInEmail && <span className="text-sm">{loggedInEmail}</span>}
              <User />
            </button>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
              <LoginPage
                onClose={handleCloseModal}
                onLoginSuccess={(email) => {
                  setLoggedInEmail(email);
                  setShowModal(false);
                }}
              />
            </Modal>
          </div>

          <div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hover:text-orange-700"
            >
              Logout
            </button>

          </div>

          {/* Bagian Login/User */}
          {/* <div>
            <button
              className="flex items-center gap-2 mx-4 hover:text-orange-500"
              onClick={handleOpenModal}
            >
              {session ? (
                <span className="text-sm">{session.user?.email || session.user?.name}</span>
              ) : (
                <span>Login</span>
              )}
              <User />
            </button>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
              <LoginPage
                onClose={handleCloseModal}
                onLoginSuccess={() => {
                  setShowModal(false);
                }}
              />
            </Modal>
          </div> */}
        </div>

        {/* bagian login - mau di pisah tapi masih bingung */}
        {/* <div className="hidden md:flex mx-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 mx-4 hover:text-orange-500"
        >
          {loggedInUser ? loggedInUser : "Login"} <User />
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="font-bold text-2xl mb-5 text-center">Please Login</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  className="w-full border p-2 rounded mb-4"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-full border p-2 rounded mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Login
                </button>
              </div>
            </form>
        </Modal>
        </div> */}

      </header>

      {/* bagian sidebar */}=
      {isOpen && (
        <aside className="md:hidden bg-gray-300 fixed top-0 right-0 h-screen w-1/3">
          <div className="flex justify-end m-5">
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}</button>
          </div>
          <div className="m-5">
            <Link href="" className="flex text-md items-center gap-2 mx-4 text-orange-500 font-bold border-b-2 border-orange-500 mb-5">Item</Link>
            <div className="relative mx-4 hover:text-orange-500 flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 hover:text-orange-500"
              >
                Cart <ShoppingCart />
              </button>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
            {/* <Link href="/helpDesk" className="flex text-md items-center gap-2 mx-4 hover:text-orange-500 mb-5">Help Desk <Headset /></Link> */}
            {/* bagian helpdesk sidebar */}
            <button
              onClick={() => setHelpDesk(true)}
              className="flex items-center gap-2 mx-4 hover:text-orange-500 mb-5"
            >
              { helpDesk ? "Help Desk" : "Help Desk"}<Headset />
            </button>
            <Modal isOpen={helpDesk} onClose={() => setHelpDesk(false)}>
              <h2 className="font-bold text-2xl mb-5 text-center">Help Desk</h2>
              <div className="items-center gap-2 mx-4 font-boldborder-orange-500 pb-1">
                <p>Subject</p>
                <textarea className="w-full border p-2 rounded mb-4"></textarea>
              </div>
              <div className="fitems-center gap-2 mx-4 font-boldborder-orange-500 pb-1">
                <p>Message</p>
                <textarea className="w-full border p-2 rounded mb-4"></textarea>
              </div>
              <button
                onClick={() => setHelpDesk(false)}
                className="flex items-center gap-2 mx-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </Modal>  

            {/* bagian login sidebar          */}
          <div>
            <button
              className="flex items-center gap-2 mx-4 hover:text-orange-500"
              onClick={handleOpenModal}
            >
              {loggedInEmail && <span className="text-sm">{loggedInEmail}</span>}
              <User />
            </button>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
              <LoginPage
                onClose={handleCloseModal}
                onLoginSuccess={(email) => {
                  setLoggedInEmail(email);
                  setShowModal(false);
                }}
              />
            </Modal>
          </div>
          </div>
        </aside>
      )}

      {/* bagian isinya */}
      <main className="flex-col bg-gray-200">
        {/* Tambah Produk Button & Modal */}
        <button
          onClick={() => {
            setNewProduct({ title: '', price: '', description: '' });
            setIsAdding(true);
          }}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded ml-20 mt-10"
        >
          Tambah Produk
        </button>
        <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
          <h2 className="text-xl font-bold mb-4">{newProduct.id ? "Edit Produk" : "Tambah Produk"}</h2>
          <input
            type="text"
            placeholder="Judul"
            className="border p-2 w-full mb-2"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Harga"
            className="border p-2 w-full mb-2"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value === "" ? "" : parseFloat(e.target.value) })
            }
          />
          <textarea
            placeholder="Deskripsi"
            className="border p-2 w-full mb-4"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </Modal>

        <h2 className="text-xl font-bold pt-10 pl-20 pr-20 pb-10">kategori 1</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ml-20 mr-20">
          {product.slice(0, visibleCount).map((item, index) => {
            return (
              <div key={index} className="bg-white rounded-lg p-5">
                <img src={item?.images?.[0]} alt="/MILESTONE-3-DONYPUTRAPERKASA/public/cat.jpg" width={200} height={200} />
                <h3 className="font-bold">{item?.title}</h3>
                <p className="font-bold text-orange-500 text-3xl">${item?.price}</p>
                <p>{item?.description.slice(0, 100) + "..."}</p>
                <p className="text-green-700 text-xs flex gap-2 items-center"><Truck />Guarantee arrives in 3 days</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">

                    {/* bagian help desk */}
                    <button
                      onClick={() => setHelpDesk(true)}
                      className="flex items-center gap-2 mx-4 text-orange-500 hover:text-orange-700"
                    >
                      <Headset />
                    </button>
                    <Modal isOpen={helpDesk} onClose={() => setHelpDesk(false)}>
                      <h2 className="font-bold text-2xl mb-5 text-center">Help Desk</h2>
                      <div className="items-center gap-2 mx-4 font-boldborder-orange-500 pb-1">
                        <p>Subject</p>
                        <textarea className="w-full border p-2 rounded mb-4"></textarea>
                      </div>
                      <div className="fitems-center gap-2 mx-4 font-boldborder-orange-500 pb-1">
                        <p>Message</p>
                        <textarea className="w-full border p-2 rounded mb-4"></textarea>
                      </div>
                      <button
                        onClick={() => setHelpDesk(false)}
                        className="flex items-center gap-2 mx-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Send
                      </button>
                    </Modal>
                    {/* <button className="text-orange-500 hover:text-orange-700 p-2"><ShoppingCart /></button> */}
                  </div>

                  {/* bagian add cart nya */}
                  {/* { session && 
                  <button
                    onClick={() => {
                      setSelectProduct(item);
                      setShowPayment(true);
                      setCartItems(prev => [...prev, item]);
                    }}
                    className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">
                    <ShoppingCart />
                  </button>
                  } */}
                  <button
                    onClick={() => {
                      setSelectProduct(item);
                      setShowPayment(true);
                      setCartItems(prev => [...prev, item]);
                    }}
                    className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">
                    <ShoppingCart />
                  </button>


                  {showPayment && selectedProduct && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
                        <p className="mb-2"><strong>Product:</strong> {selectedProduct.title}</p>
                        <p className="mb-4"><strong>Price:</strong> ${selectedProduct.price}</p>

                        <div className="mb-4">
                          {/* <label className="block text-sm font-semibold mb-1">Rincian Pembayaran</label>
                          <div className="flex justify-between">
                            <div>
                              <p> Price Product :</p>
                              <p> Biaya Layanan :</p>
                              <p> Biaya Pengiriman :</p>
                              <p><strong>Total:</strong></p>
                            </div>

                            <div>
                              <p>${selectedProduct.price}</p>
                              <p>$5</p>
                              <p>$10</p>
                              <p><strong>${selectedProduct.price + 15}</strong></p>
                            </div>
                          </div> */}

                          {/* <div className=" flex justify-between mt-4">
                            <label className="block text-sm font-semibold mb-1">Metode Pembayaran</label>
                            <div>
                              <select className="w-full p-2 border rounded">
                                <option value="credit-card">Transfer Bank</option>
                                <option value="debit-card">COD</option>
                                <option value="paypal">Gopay</option>
                                <option value="paypal">Dana</option>
                                <option value="paypal">ShopeePay</option>
                              </select>
                            </div>
                          </div> */}
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowPayment(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              // bagian pembayaran
                              alert('add to cart successfully');
                              setShowPayment(false);
                            } }
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* bagian CRUD */}
                <div className="flex flex-col">
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setNewProduct({ ...item });
                        setIsAdding(true);
                      } }
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const filtered = product.filter((p) => p.id !== item.id);
                        setProduct(filtered);
                        setOriginalProduct(filtered);
                      } }
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded text-sm text-red-500"
                    >
                      Delete
                    </button>
                </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ini bagian tombol muat nya */}
        {product.length > 9 && (
          <div className="flex justify-center gap-4 m-5 p-5">           
            <button
              onClick={() => setVisibleCount(8)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50"
              disabled={visibleCount === 8}
            >
              Muat Lebih Sedikit
            </button>
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 8, product.length))}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50"
              disabled={visibleCount >= product.length}
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </main>

      {/* Modal untuk Cart */}
      <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart cartItems={cartItems} onCartUpdate={(updatedItems) => setCartItems(updatedItems)} />
      </Modal>

      {/* bagian footer */}
      <footer className="flex items-center justify-center h-10">
        <h1 className="text-xl font-bold text-center">mulaidarinol</h1>
      </footer>
    </div>
  );
}

