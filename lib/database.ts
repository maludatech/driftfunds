"use server";

import mongoose from "mongoose";

let isConnected = false; // Track connection state

export const connectToDb = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return; // Return early if already connected
  }

  const MONGODB_URI = process.env.MONGODB_URI as string;

  if (!MONGODB_URI) {
    return; // Exit early if the URI is not defined
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true; // Mark as connected
  } catch (error) {
    throw error; // Rethrow the error for higher-level handling
  }
};
