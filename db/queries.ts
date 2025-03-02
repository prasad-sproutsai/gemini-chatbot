import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { Message } from "ai";
import { prisma } from "../lib/prisma";

// Optionally, if not using email/pass login, you can
// use the Prisma adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/prisma

export async function getUser(email: string) {
  try {
    return await prisma.User.findMany({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  try {
    return await prisma.User.create({
      data: {
        email,
        password: hash,
      },
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string;
  messages: any;
  userId: string;
}) {
  try {
    const existingChat = await prisma.Chat.findUnique({
      where: {
        id,
      },
    });

    if (existingChat) {
      return await prisma.Chat.update({
        where: {
          id,
        },
        data: {
          messages: messages,
        },
      });
    }

    return await prisma.Chat.create({
      data: {
        id,
        createdAt: new Date(),
        messages: messages,
        userId,
      },
    });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    return await prisma.Chat.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Failed to delete chat by id from database");
    throw error;
  }
}

export async function getChatsByUserId({ id }: { id: string }) {
  try {
    return await prisma.Chat.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error("Failed to get chats by user from database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    return await prisma.Chat.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}

export async function createReservation({
  id,
  userId,
  details,
}: {
  id: string;
  userId: string;
  details: any;
}) {
  return await prisma.Reservation.create({
    data: {
      id,
      createdAt: new Date(),
      userId,
      hasCompletedPayment: false,
      details: details,
    },
  });
}

export async function getReservationById({ id }: { id: string }) {
  return await prisma.Reservation.findUnique({
    where: {
      id,
    },
  });
}

export async function updateReservation({
  id,
  hasCompletedPayment,
}: {
  id: string;
  hasCompletedPayment: boolean;
}) {
  return await prisma.Reservation.update({
    where: {
      id,
    },
    data: {
      hasCompletedPayment,
    },
  });
}
