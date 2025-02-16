'use client'; // Indicates that this component is a client-side rendered React component.

import { useState } from 'react'; // Import React's useState hook to manage local state.
import { useRouter } from 'next/navigation'; // Import Next.js router for navigation between pages.
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Import icons for UI elements.

export default function Login() {
  const router = useRouter(); // Initialize the Next.js router for page navigation.
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // State to store multiple error messages.
  const [isLoading, setIsLoading] = useState(false); // State to track loading status during form submission.

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default browser behavior of reloading the page on form submission.
    setErrorMessages([]); // Clear any previous error messages.
    setIsLoading(true); // Set loading state to true while processing the request.

    const formData = new FormData(e.currentTarget); // Extract form data from the submitted form.

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST', // Send a POST request to the login API endpoint.
        headers: { 'Content-Type': 'application/json' }, // Set headers for JSON payload.
        body: JSON.stringify({
          email: formData.get('email'), // Retrieve the email value from the form data.
          password: formData.get('password'), // Retrieve the password value from the form data.
        }),
      });

      const data = await response.json(); // Parse the response JSON.

      if (!response.ok) {
        if (data.errors) {
          setErrorMessages(data.errors.map((err: { message: string }) => err.message)); // Display specific error messages returned by the backend.
        } else {
          throw new Error(data.error || 'Login failed'); // Throw a generic error if no specific errors are provided.
        }
        return; // Exit early if there are errors.
      }

      router.push('/dashboard'); // Redirect to the dashboard on successful login.
    } catch (err: unknown) { // Explicitly type "err" as "unknown" for TypeScript compliance.
      if (err instanceof Error) {
        setErrorMessages([err.message]); // Handle known error types and display their messages.
      } else {
        setErrorMessages(['An unexpected error occurred']); // Handle unknown error types with a generic message.
      }
    } finally {
      setIsLoading(false); // Reset loading state after processing is complete.
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Outer container for centering content */}
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1> {/* Page title */}
          <p className="mt-2 text-gray-600">Sign in to your account</p> {/* Subtitle */}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm">
          {/* Email Input Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              {/* Icon inside the input field */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com" // Placeholder text for email input field.
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              {/* Icon inside the input field */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••••••" // Placeholder text for password input field.
              />
            </div>
          </div>

          {/* Error Messages Section */}
          {errorMessages.length > 0 && (
            <ul className="p-3 text-sm text-red-700 bg-red-50 rounded-md list-disc list-inside">
              {errorMessages.map((msg, index) => (
                <li key={index}>{msg}</li> /* Display each error message in a list */
              ))}
            </ul>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading} /* Disable button while loading to prevent multiple submissions */
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                        text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-500 
                        disabled:bg-blue-300 transition-colors`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'} {/* Show loading indicator or button label */}
          </button>
        </form>

        {/* Link to Registration Page */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}
