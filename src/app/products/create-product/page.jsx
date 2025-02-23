"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        color,
        quantity,
        description,
        price,
        images: imageUrls,
      }),
    });

    router.push("/products");
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Color"
          className="border p-2 rounded"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL (comma separated)"
          className="border p-2 rounded"
          value={imageUrls.join(",")}
          onChange={(e) => setImageUrls(e.target.value.split(","))}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
