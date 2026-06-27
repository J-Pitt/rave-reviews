import type { Metadata } from "next";
import { SubmitUndergroundForm } from "./SubmitUndergroundForm";
import { databaseStatus } from "@/lib/data";

export const metadata: Metadata = {
  title: "Submit Underground Party",
  description: "Submit an underground NYC party to the community.",
};

export default async function SubmitUndergroundPage() {
  const { configured } = databaseStatus();
  return <SubmitUndergroundForm databaseConfigured={configured} />;
}
