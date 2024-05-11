"use client";

import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";
import { Suspense, useEffect } from "react";

type Props = {
  error: Error;
};

function ErrorState({ error }: Props) {
  useEffect(() => {
    console.log("🚀 ~ file: error.tsx:12 ~ ErrorState ~ error:", error);
  }, [error]);

  return (
    <Suspense fallback={<Loading />}>
      <EmptyState title="Opppss 	🤭" subtitle="Something went wrong!" />
    </Suspense>
  );
}

export default ErrorState;
