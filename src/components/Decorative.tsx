export function StarryBackground() {
  return (
    <div className="starry-bg" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export function BrushStroke({ className = "" }: { className?: string }) {
  return <span className={`brush-stroke ${className}`} aria-hidden="true" />;
}
