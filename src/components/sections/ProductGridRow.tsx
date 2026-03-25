export default function ProductGridRow() {
  const columns = [
    { label: "Premium Quality", sub: "Crafted with the finest materials" },
    { label: "Custom Design", sub: "Tailored to your imagination" },
    { label: "Fast Delivery", sub: "Shipped right to your door" },
    { label: "Expert Support", sub: "We're here every step of the way" },
  ];

  return (
    <section
      className="grid grid-cols-2 sm:grid-cols-4"
      aria-label="Product grid"
    >
      {columns.map((col, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center px-4 py-8 text-center text-white sm:px-6 sm:py-10 ${
            i % 2 === 0 ? "bg-black" : "bg-dark-blue"
          }`}
        >
          <h3 className="text-base font-bold uppercase tracking-widest">
            {col.label}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            {col.sub}
          </p>
        </div>
      ))}
    </section>
  );
}
