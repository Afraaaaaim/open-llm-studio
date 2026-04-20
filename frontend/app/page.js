// getData is an async function that calls your Go backend
// It runs on the server (not in the browser) because this is a Server Component
async function getData() {
  // Call the backend service using Docker network name "backend"
  // Inside docker-compose, services can reach each other by name
  const res = await fetch("http://backend:8000/hello", {
    // Disable caching so every request hits the backend
    // Useful during development to always see fresh data
    cache: "no-store",
  });

  // Convert response (JSON string) into a JavaScript object
  return res.json();
}

// This is the main page component (mapped to "/")
// It is async, so it can await data before rendering
export default async function Page() {
  // Fetch data from backend before rendering the page
  const data = await getData();

  return (
    <div>
      <h1>Next.js</h1>

      {/* Display the JSON response as a string */}
      {/* <pre> preserves formatting */}
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
