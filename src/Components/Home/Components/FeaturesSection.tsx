export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure payment processing",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      icon: "⭐",
      title: "Quality Products",
      description: "Hand-picked quality products",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="text-center p-6">
              <div
                className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
