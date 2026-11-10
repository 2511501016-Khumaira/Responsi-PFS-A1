import { useState, useEffect } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kemeja Flanel Casual",
      category: "Pakaian Pria",
      price: "145000",
      discount: "10",
      stock: "25",
      status: "Tersedia",
    },
    {
      id: 2,
      name: "Sepatu Sneakers Sport",
      category: "Sepatu",
      price: "350000",
      discount: "15",
      stock: "12",
      status: "Tersedia",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "Pakaian Pria",
    price: "",
    discount: "0",
    stock: "",
    status: "Tersedia",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    $(".dashboard-container").hide().fadeIn(800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map((p) => (p.id === formData.id ? formData : p)));
      setIsEditing(false);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setFormData({
      id: null,
      name: "",
      category: "Pakaian Pria",
      price: "",
      discount: "0",
      stock: "",
      status: "Tersedia",
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus produk ini dari etalase?",
      )
    ) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="dashboard-container bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary">E-Commerce Barang</h2>
            <p className="text-muted mb-0">
              Manajemen Produk & Etalase Toko Online
            </p>
          </div>
          <span className="badge bg-secondary fs-6">UNISAMart</span>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3">
                  {isEditing ? "Ubah Harga / Produk" : "Tambah Produk Baru"}
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nama Produk</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Contoh: Kemeja Flanel"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="Pakaian Pria">Pakaian Pria</option>
                      <option value="Pakaian Wanita">Pakaian Wanita</option>
                      <option value="Sepatu">Sepatu</option>
                      <option value="Aksesoris">Aksesoris</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Harga (Rp)</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="150000"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Diskon (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: e.target.value })
                      }
                      placeholder="10"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stok</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      placeholder="20"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    {isEditing ? "Simpan Perubahan" : "Tambah ke Etalase"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100 mt-2"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          id: null,
                          name: "",
                          category: "Pakaian Pria",
                          price: "",
                          discount: "0",
                          stock: "",
                          status: "Tersedia",
                        });
                      }}
                    >
                      Batal
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cari berdasarkan Nama Produk atau Kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                        <th>Diskon</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                          <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td className="fw-semibold">{product.name}</td>
                            <td>{product.category}</td>
                            <td>
                              Rp {Number(product.price).toLocaleString("id-ID")}
                            </td>
                            <td>
                              <span className="badge bg-danger">
                                {product.discount}%
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${Number(product.stock) > 5 ? "bg-success" : "bg-warning text-dark"}`}
                              >
                                {product.stock} pcs
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(product)}
                              >
                                Edit Harga
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(product.id)}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center text-muted py-4"
                          >
                            Produk tidak ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
