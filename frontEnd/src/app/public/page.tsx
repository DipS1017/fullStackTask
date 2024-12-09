const Page = () => {
  return (
    <div className="min-h-[90vh]  flex items-center justify-between p-4">
      {/* Text Section */}
      <div className="text-center w-full  mb-4 sm:mb-0">
        <h1 className="text-3xl font-semibold">
          This is a Fullstack web app for Internship Task
        </h1>
        <p className="mt-2 text-2xl">
          Welcome to the public section of our page.
        </p>

        <p className="mt-2 text-xl">This page is accessible to everyone.</p>
      </div>
    </div>
  );
};

export default Page;
