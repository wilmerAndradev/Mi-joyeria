"use client";

import { use } from "react";
import CatalogPage from "@/app/colecciones/page";
import { CATEGORIES } from "@/data/products";
import { notFound } from "next/navigation";

const VALID_CATEGORIES = CATEGORIES.map((c) => c.id).filter((id) => id !== "all");

export default function ColeccionPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = use(params);

  if (!VALID_CATEGORIES.includes(categoria)) {
    notFound();
  }

  return <CatalogPage initialCategory={categoria} />;
}
