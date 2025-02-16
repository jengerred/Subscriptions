import { cookies } from 'next/headers'; // Importing cookies to manage session tokens.
import { verifyJWT } from '@/lib/auth'; // Function to verify JSON Web Tokens for authentication.
import { redirect } from 'next/navigation'; // Redirect users to other pages if necessary.
import connectDB from '@/lib/db'; // Function to establish a connection to the MongoDB database.
import { User, IUser } from '@/models/User'; // Mongoose model for interacting with the User collection in MongoDB.
import {
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'; // Icons for UI design.

export default async function Dashboard() {
  const cookieStore = await cookies(); // Retrieve cookies from the user's browser.
  const token = cookieStore.get('token')?.value; // Extract the 'token' cookie value.

  if (!token) redirect('/login'); // If no token is found, redirect the user to the login page.

  try {
    const { payload } = await verifyJWT(token); // Verify the JWT token and extract its payload.
    await connectDB(); // Establish a connection to MongoDB.

    const user = await User.findById(payload.userId) // Fetch user details by ID from the database.
      .select('firstName email createdAt') // Select specific fields to return (e.g., firstName, email).
      .lean<IUser>(); // Optimize query performance by returning plain JavaScript objects.

    if (!user) redirect('/login'); // If no user is found, redirect back to the login page.

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Welcome Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Your Dashboard, {user.firstName}! 👋
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                This protected page serves as a foundation for any application. 
                Customize it to build anything from banking apps to SaaS platforms.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Button: Learn How to Add User Data */}
                <a
                  href="/docs/customization"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Learn How to Add User Data
                  <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                </a>

                {/* Button: Learn How to Customize UI */}
                <a
                  href="/docs/customization"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Learn How to Customize UI
                  <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Example Banking Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <BanknotesIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">Banking App Ready</h3>
                </div>
                <p className="text-gray-600">
                  Start building financial features using our secure foundation.
                  Add transaction lists, account balances, and payment workflows.
                </p>
              </div>

              {/* Customization Guide Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <CommandLineIcon className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Easy Customization</h3>
                </div>
                <p className="text-gray-600">
                  Modify colors, layouts, and features through our intuitive
                  customization system. No complex configurations needed.
                </p>
              </div>
            </div>
          <br/>
            {/* Personalization Example Note */}
            <div className="mb-3 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                * Note: We&apos;re already displaying user first name (<span className="font-mono font-medium">{user.firstName}</span>), 
                and we could include user email (<span className="font-mono font-medium">{user.email}</span>), 
                and account creation date (<span className="font-mono font-medium">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>) - this demonstrates how to personalize dashboards for your own users!
              </p>
            </div>

            {/* Custom Content Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Your Application Space</h2>
              <div className="space-y-4">
                {/* Placeholder Content */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">
                    Replace this section with your application-specific components.
                    Add charts, tables, or any interactive elements needed.
                  </p>
                </div>

                {/* Example Widgets */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-blue-600">Sample Widget 1</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-sm text-green-600">Sample Widget 2</p>
                  </div>
                </div>
              </div>
            </div>
            <br/>

            {/* Logout Note */}
            <div className="mb-3 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                * Note: Below is a logout button with built-in functionality to securely log out users. 
                You can place this button anywhere in your application,
                 such as at the bottom of the dashboard or within a navbar for easy access. 
                 Additionally, you can customize its style to match your app&apos;s design and branding.
              </p>
            </div>

            {/* Logout Button */}
            <div className="mt-6 text-center">
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>

          </div>

          {/* Footer Section */}
          <footer className="mt-12 text-center text-sm text-gray-500">
            <p>
              Built with ❤️ using Next.js and Tailwind CSS. 
              <a href="https://github.com/jengerred/Reusable-NEXT-User-Auth" target="_blank"
                 rel="noopener noreferrer" 
                 className="text-blue-600 hover:underline">View on GitHub</a>.
            </p>
          </footer>
        </main>
      </div>
    );

  } catch (error) {
    console.error('Dashboard auth error:', error); // Log any errors that occur during authentication or data fetching.
    redirect('/login'); // Redirect users back to login if an error occurs.
  }
}
