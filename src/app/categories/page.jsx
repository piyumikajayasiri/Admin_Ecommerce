"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

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
    const method = editingCategory ? "PUT" : "POST";
    const body = JSON.stringify({ id: editingCategory?._id, name, parent });

    await fetch("/api/categories", {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });
    setName("");
    setParent("");
    setEditingCategory(null);
    fetchCategories();
  }

  async function handleDelete(id) {
    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  }

  function handleEdit(category) {
    setEditingCategory(category);
    setName(category.name);
    setParent(category.parent?._id || "");
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {editingCategory ? "Edit Category" : "Create New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <div className="flex flex-row">
          <p className="w-[25%]">New Category Name</p>
          <input
            type="text"
            placeholder="Category Name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row">
          <p className="w-[25%]">Parent Category</p>
          <select
            className="border p-2 rounded w-full"
            value={parent}
            onChange={(e) => setParent(e.target.value)}
          >
            <option value="">No parent Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-10">
          {" "}
          <button className="bg-red-500 text-white px-4 py-2 rounded w-[50%]">
            {editingCategory ? "Update" : "Save"}
          </button>
        </div>
      </form>

      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Parent Category</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody className="">
          {categories.map((cat) => (
            <tr key={cat._id} className="border">
              <td className="border p-2">{cat.name}</td>
              <td className="border p-2">{cat.parent?.name || "—"}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
