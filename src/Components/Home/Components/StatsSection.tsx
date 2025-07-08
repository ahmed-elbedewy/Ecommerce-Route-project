export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "10K+",
      label: "Happy Customers",
    },
    {
      id: 2,
      value: "500+",
      label: "Products",
    },
    {
      id: 3,
      value: "50+",
      label: "Categories",
    },
    {
      id: 4,
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id}>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
