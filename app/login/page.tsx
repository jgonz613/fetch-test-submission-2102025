"use client";
import { FormEvent, useState } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/navigation";
import { loginUser } from "../lib/api";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const setAuth = useStore((state) => state.setAuth);
  const router = useRouter();

  const validateInput = (): string[] => {
    let error = [];
    if (!name) {
      error.push("Please fill up name");
    }
    if (!email) {
      error.push("Please fill up email");
    }
    return error;
  };

  const handleLogin = async () => {
    setErrors([]);
    const formErrors = validateInput();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return null;
    }

    try {
      const response = await loginUser(name, email);
      console.log(response);

      if (response.ok) {
        console.log("redirecting to search");
        setAuth({
          username: name,
          email: email,
        });
        // redirect to search page
        router.replace("/search");
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrors([e.message]);
      } else {
        setErrors(["Unknown error"]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      {errors.length > 0 && (
        <div className="bg-red-200 text-red-700 p-3 mb-4 rounded">
          {errors.map((error, index) => (
            <p key={index}>
              {error}
            </p>
          ))}
        </div>
      )}
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
        }}
      >
        <div className="my-5">
          <label htmlFor="name" className="mr-10">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="mr-10">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
