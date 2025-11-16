import React, { useState, useEffect } from "react";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setMyCourses(data);
        } else {
          const data = await res.json();
          setError(data.message || "Failed to load your courses.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching your courses.");
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      {error && <p className="text-red-500">{error}</p>}
      {myCourses.length === 0 && <p>You are not enrolled in any courses yet.</p>}
      <div className="grid md:grid-cols-2 gap-6">
        {myCourses.map((course) => (
          <div key={course._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="mb-4">{course.description}</p>
            <p className="text-sm text-gray-500">
              {course.role === "tutor" ? "You teach this course" : "You are enrolled"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
