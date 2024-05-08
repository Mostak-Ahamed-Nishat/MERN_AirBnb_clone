import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function Custom404() {
  return (
    <Suspense fallback={<Loading />}>
      <h1>404 - Page Not Found</h1>
    </Suspense>
  );
}
