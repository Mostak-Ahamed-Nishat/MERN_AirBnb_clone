import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="flex flex-col">
      <EmptyState
        title="Opppss Page not found	🤭"
        subtitle="Sorry your expectation is not fulfilled"
      />
    </div>
  );
}
