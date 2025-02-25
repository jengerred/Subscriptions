import { cookies } from 'next/headers'; // Importing cookies to manage session tokens.
import { verifyJWT } from '@/lib/auth'; // Function to verify JSON Web Tokens for authentication.
import { redirect } from 'next/navigation'; // Redirect users to other pages if necessary.
import connectDB from '@/lib/db'; // Function to establish a connection to the MongoDB database.
import { User, IUser } from '@/models/User'; // Mongoose model for interacting with the User collection in MongoDB.
import Dashboard from '@/app/components/Dashboard';

// NOTE: This entire file is a placeholder and can be completely customized or removed based on your needs.
// The dashboard is meant to demonstrate how to create a protected page and display user-specific data.

export default async function ProtectedDashboard() {
  const cookieStore = await cookies(); // Retrieve cookies from the user's browser.
  const token = cookieStore.get('token')?.value; // Extract the 'token' cookie value.

  if (!token) redirect('/login'); // If no token is found, redirect the user to the login page.

  try {
    const { payload } = await verifyJWT(token); // Verify the JWT token and extract its payload.
    await connectDB(); // Establish a connection to MongoDB.

    // Fetch user details by ID from the database.
    // NOTE: Modify this query to include any additional user data you need for your dashboard.
    const user = await User.findById(payload.userId)
      .select('firstName email createdAt')
      .lean<IUser>();

    if (!user) redirect('/login'); // If no user is found, redirect back to the login page.

    // NOTE: The following JSX can be completely replaced with your own dashboard layout and components.
    return (
     
      <main>
      <Dashboard user={user} />
        </main>
     
    );

  } catch (error) {
    console.error('Dashboard auth error:', error); // Log any errors that occur during authentication or data fetching.
    redirect('/login'); // Redirect users back to login if an error occurs.
  }
}
