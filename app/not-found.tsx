import { Suspense } from "react";
import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";

export default function NotFound() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col">
        <EmptyState
          title="Opppss Page not found	🤭"
          subtitle="Sorry your expectation is not fulfilled"
        />
      </div>
    </Suspense>
  );
}
