"use server";

import prisma from "@/lib/db";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const getUsers = async () => {
  const users = await prisma?.user.findMany();
  return users;
};

export const signUp = async (formData: FormData) => {
  const userInput = Object.fromEntries(formData.entries());
  const response = await fetch("http://127.0.0.1:3000/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userInput.email,
      password: userInput.password,
      passwordConfirmation: userInput.passwordConfirmation,
    }),
  });
  const result = await response.json()
  console.log(response);

  if (response.ok) {
    revalidatePath('/sign-up') // Update cached posts
    redirect(`/sign-in`) // Navigate to the new post page
  } else {
    console.log("something wrong");
  }
};
