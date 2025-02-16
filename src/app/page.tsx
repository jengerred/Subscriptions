// Import the Image component from Next.js for optimized image rendering
import Image from "next/image";

// Define and export the Home component, which serves as the landing page of the application
export default function Home() {
  return (
    // Main container with a grid layout and styling for centering content
    // NOTE: You can modify the styling here to fit your design preferences
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]"> 
      
      {/* Main section of the page */}
      {/* NOTE: Feel free to reorganize or remove sections as needed for your landing page */}
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start"> 
       
        {/* Text content container */}
        {/* NOTE: Customize this section with your own welcome message and app description */}
        <div className="text-center">
       
          {/* Page heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎈🎊 Congrats 🎉 on setting up your super-secure user authentication! 🔐
          </h1>

          {/* Informational paragraph about the app's functionality */}
          {/* NOTE: Replace this with information specific to your application */}
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Your login and registration functionality is fully integrated with MongoDB, ensuring that user data is stored securely. 

            <br/><br/><br/><strong> 🔐 You can use the following links at any entry point in your app. 🔑🔒</strong>
            <br/>Check out the secure user authentication system you created! 
          </p>
        
          {/* Links to registration and login pages */}
          {/* NOTE: These links are crucial for user authentication. Keep them easily accessible */}
          {/* ⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇⬇️⬇ */}

          <div className="flex gap-4 justify-center">

              {/* Link to the registration page */}
              <a
                href="/register"
                className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Create Account
              </a>
             
              {/* Link to the login page */}
              <a
                href="/login"
                className="px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm font-medium"
              >
                Login
              </a>
          </div>
          
          {/* ⬆️⬆⬆️⬆⬆️⬆⬆️⬆ End Links ⬆️⬆⬆️⬆⬆️⬆⬆️⬆ */}

          {/* Additional information about the purpose of this page */}
          {/* NOTE: You can remove or replace this section with content relevant to your app */}
          <div className="mt-20">
            <p>
              <strong>This page is your homepage/landing page.</strong><br/>
              It serves as an introduction to your app where you can guide users
              to log in, create an account, or explore other features. 
            </p>
          </div>
        </div>
    
        {/* Displaying an image (Next.js logo) */}
        {/* NOTE: Replace this with your own logo or remove if not needed */}
        <div className="mx-auto w-fit">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>

        {/* Instructions for developers */}
        {/* NOTE: This section is for development guidance. You can remove it in production */}
        <div className="mx-auto w-fit">
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                src/app/page.tsx
              </code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>
        </div>

        {/* Links to deploy or read documentation */}
        {/* NOTE: These links are helpful during development. You can remove or replace them for your final app */}
        <div className="mx-auto w-fit">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
           
            {/* Link to deploy the app using Vercel */}
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>

            {/* Link to Next.js documentation */}
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
         </div>
        </div>
       
      </main>

      {/* Footer section with additional helpful links */}
      {/* NOTE: You can customize this footer with your own links or remove it if not needed */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
        {/* Link to Next.js learning resources */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>

        {/* Link to Next.js examples */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>

        {/* Link to Next.js official website */}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
