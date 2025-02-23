import { connectToDatabase } from "../../../../lib/mongodb";
import Product from "../../../../models/Products";
import { NextResponse } from "next/server";

// GET: Fetch all products
export async function GET() {
  await connectToDatabase();
  const products = await Product.find().populate("category");
  return NextResponse.json(products);
}

// POST: Create a new product
export async function POST(req) {
  await connectToDatabase();
  const { name, category, color, quantity, images, description, price } =
    await req.json();

  const newProduct = new Product({
    name,
    category,
    color,
    quantity,
    images,
    description,
    price,
  });
  await newProduct.save();

  return NextResponse.json({ message: "Product created" });
}

// PUT: Update a product
export async function PUT(req) {
  await connectToDatabase();
  const { id, name, category, color, quantity, images, description, price } =
    await req.json();

  await Product.findByIdAndUpdate(id, {
    name,
    category,
    color,
    quantity,
    images,
    description,
    price,
  });
  return NextResponse.json({ message: "Product updated" });
}

// DELETE: Remove a product
export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" });
}
