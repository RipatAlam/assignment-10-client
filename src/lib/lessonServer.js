//Public-lessons
export const getPublicLessons = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons`)

  if (!res.ok) {
    throw new Error("Failed to fetch public lessons");
  }

  return await res.json();
};

//Publiclessons-Home Page
export const getPublicLessonsHome = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/publiclessons-home`)

  if (!res.ok) {
    throw new Error("Failed to fetch public lessons");
  }

  return await res.json();
};

//Public-lessons/:id
export const getPublicLessonsId = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/public-lessons/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch public lessons");
  }

  return await res.json();
};
