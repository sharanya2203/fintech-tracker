"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6">
          User Profile 👤
        </h1>

        <div className="space-y-4">

          <div>
            <label className="font-semibold">
              Name
            </label>
            <p className="border p-3 rounded">
              {user?.name}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>
            <p className="border p-3 rounded">
              {user?.email}
            </p>
          </div>

          <div>
            <label className="font-semibold">
              User ID
            </label>
            <p className="border p-3 rounded">
              {user?.id}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}