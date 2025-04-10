import Header from "@/components/dashboard/Header";

export default function ChangePasswordPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto py-12 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Change Password
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Update your account password
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}
