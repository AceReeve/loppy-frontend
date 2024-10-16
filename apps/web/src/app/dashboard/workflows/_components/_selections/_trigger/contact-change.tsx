export default function ContactChange() {
  return (
    <div className="flex h-[500px] flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        This Node is Coming Soon!
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        We’re working hard to bring this feature to you. Stay tuned!
      </p>
      <div className="flex justify-center">
        <span className="loader" />
      </div>
    </div>
  );
}
