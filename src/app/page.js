'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, Headset, Truck } from "lucide-react";
import Link from "next/link";
import Modal from "./modal/page";

//bagian inti
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const [helpDesk, setHelpDesk] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  // sumber
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        setProduct(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (userName && password) {
      setLoggedInUser(userName); // Simpan nama user yang login
      setIsModalOpen(false);     // Tutup modal
      setUserName("");           // Reset form input
      setPassword("");
    } else {
      alert("Username dan password harus diisi");
    }
  };

  return (
    <div className="h-screen w-screen">
      {/* bagian header */}
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
          <Link href="/cart" className="flex items-center gap-2 mx-4 hover:text-orange-500">Cart <ShoppingCart /></Link>

          {/* <Link href="/helpDesk" className="flex items-center gap-2 mx-4 hover:text-orange-500">Help Desk <Headset /></Link> */}
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
              onClick={() => setHelpDesk(false)}
              className="flex items-center gap-2 mx-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </Modal>
        </div>

        {/* bagian login - mau di pisah tapi masih bingung */}
        <div className="hidden md:flex mx-10">
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
        </div>
      </header>

      {/* bagian sidebar */}
      {isOpen && (
        <aside className="md:hidden bg-gray-300 fixed top-0 right-0 h-screen w-1/3">
          <div className="flex justify-end m-5">
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}</button>
          </div>
          <div className="m-5">
            <Link href="" className="flex text-md items-center gap-2 mx-4 text-orange-500 font-bold border-b-2 border-orange-500 mb-5">Item</Link>
            <Link href="/cart" className="flex text-md items-center gap-2 mx-4 hover:text-orange-500 mb-5">Cart <ShoppingCart /></Link>
            <Link href="/helpDesk" className="flex text-md items-center gap-2 mx-4 hover:text-orange-500 mb-5">Help Desk <Headset /></Link>            
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
          </div>
        </aside>
      )}

      {/* coba modal */}
      {/* <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Contoh Modal</h1>

        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Buka Modal
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold">Halo dari Modal!</h2>
          <p className="mt-2 text-gray-700">Ini isi dari modal sederhana.</p>
        </Modal>
      </div> */}

      {/* bagian isinya */}
      <main className="flex-col bg-gray-200">
        <h2 className="text-xl font-bold pt-10 pl-20 pr-20 pb-10">kategori 1</h2>
        
        <div className="grid lg:grid-cols-3 gap-5 ml-20 mr-20">
          {product.slice(0, visibleCount).map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-5">
              <img src={item?.images?.[0]} alt="/images/cat.jpg" width={200} height={200} />
              <h3 className="font-bold">{item?.title}</h3>
              <p className="font-bold text-orange-500 text-3xl">${item?.price}</p>
              <p>{item?.description}</p>
              <p className="text-green-700 text-xs flex gap-2 items-center"><Truck />Guarantee arrives in 3 days</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button className="text-orange-500 hover:text-orange-700 p-2"><Headset /></button>
                  <button className="text-orange-500 hover:text-orange-700 p-2"><ShoppingCart /></button>
                </div>
                <button className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded">Buy Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* ini bagian tombol muat nya */}
        {product.length > 9 && (
          <div className="flex justify-center gap-4 m-5 p-5">           
            <button
              onClick={() => setVisibleCount(9)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50"
              disabled={visibleCount === 9}
            >
              Muat Lebih Sedikit
            </button>
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 9, product.length))}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50"
              disabled={visibleCount >= product.length}
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </main>

      {/* bagian footer */}
      <footer className="flex items-center justify-center h-10">
        <h1 className="text-xl font-bold text-center">mulaidarinol</h1>
      </footer>
    </div>
  );
}
