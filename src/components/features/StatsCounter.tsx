const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '10,000+', label: 'Loads Delivered' },
  { value: '500+', label: 'Trusted Carriers' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
            {stat.value}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
