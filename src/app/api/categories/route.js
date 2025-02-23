import { connectToDatabase } from "../../../../lib/mongodb";
import Category from "../../../../models/Category";
import { NextResponse } from "next/server";

// GET: Fetch all categories
export async function GET() {
  await connectToDatabase();
  const categories = await Category.find().populate("parent");
  return NextResponse.json(categories);
}

// POST: Create a new category
export async function POST(req) {
  await connectToDatabase();
  const { name, parent } = await req.json();
  const newCategory = new Category({ name, parent: parent || null });
  await newCategory.save();
  return NextResponse.json({ message: "Category created" });
}

// PUT: Update a category
export async function PUT(req) {
  await connectToDatabase();
  const { id, name, parent } = await req.json();
  await Category.findByIdAndUpdate(id, { name, parent: parent || null });
  return NextResponse.json({ message: "Category updated" });
}

// DELETE: Remove a category
export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Category deleted" });
}
