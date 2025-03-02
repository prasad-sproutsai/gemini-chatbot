import { Message } from "ai";

// Define the types manually to avoid issues with Prisma client generation
export interface User {
  id: string; // MongoDB ObjectId as string
  email: string;
  password: string | null;
}

export interface PrismaChat {
  id: string; // MongoDB ObjectId as string
  createdAt: Date;
  messages: any;
  userId: string; // MongoDB ObjectId as string
}

export type Chat = Omit<PrismaChat, "messages"> & {
  messages: Array<Message>;
};

export interface Reservation {
  id: string; // MongoDB ObjectId as string
  createdAt: Date;
  details: any;
  hasCompletedPayment: boolean;
  userId: string; // MongoDB ObjectId as string
}

// Once Prisma client is properly generated, you can switch back to:
// import { User as PrismaUser, Chat as PrismaChat, Reservation as PrismaReservation } from "@prisma/client";
// export type User = PrismaUser;
// export type Chat = Omit<PrismaChat, "messages"> & { messages: Array<Message> };
// export type Reservation = PrismaReservation;

// This file now serves as a type definition file for Prisma models
// The actual schema is defined in prisma/schema.prisma
