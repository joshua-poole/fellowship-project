"use client";

import { use } from "react";
import { BaseView } from "~/components/BaseView";

export default function BasePage({
  params,
}: {
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = use(params);

  return <BaseView baseId={baseId} />;
}
