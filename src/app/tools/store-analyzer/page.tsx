import { redirect } from "next/navigation";

/** Store analysis lives on the homepage — keep URL for backwards compatibility */
export default function StoreAnalyzerPage() {
  redirect("/#analyze");
}
