import { NextResponse } from "next/server";
import { fetchProductById } from "@/data/products";


export async function GET(request, { params }) {
  const { id } =  await params;
  const product = await fetchProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
