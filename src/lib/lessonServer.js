//Public-lessons
export const getPublicLessons = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch public lessons");
  }

  return await res.json();
};

//Publiclessons-Home Page
export const getPublicLessonsHome = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/publiclessons-home`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch public lessons");
  }

  return await res.json();
};

//Public-lessons/:id
export const getPublicLessonsId = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons/${id}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch public lessons");
  }

  return await res.json();
};

//Profile
export const updateProfile = async (id, { name, email, image, password }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}dashboardfile/profile/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        image,
        password,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Profile update failed");
  }

  return data;
};

//Add Lesson
// Add Public Lesson
export const addPublicLesson = async (lessonData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add lesson");
  }

  return data;
};

//My Lessons Delete
export const deletePublicLesson = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons/${id}`,
    {
      method: "DELETE",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete lesson");
  }

  return data;
};

//My Lessons Update
export const updatePublicLesson = async (id, lessonData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update lesson");
  }

  return data;
};

//Like count 
export const likeLesson = async (lessonId, userData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons/like/${lessonId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return await res.json();
};