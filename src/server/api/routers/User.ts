import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { CheckUsernameSchema } from "@/types/api/commons";
import { UserSchema } from "@/types/api/models";
import { CheckEmailSchema } from "@/types/api/commons";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }),
  create: publicProcedure.input(UserSchema).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.user.create({
      data: input
    })
  }),
  update: publicProcedure
    .input(UserSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
            id: input.id,
          },
        data: { ...input, ...{updatedAt: new Date()} },
      })
    }),
  show: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
   return await ctx.prisma.user.findFirst({
      where: {
        id: input,
        deletedAt: null,
      },
    })
  }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.user.update({
      where: {
        id: input,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }),

  // Check if username or email exist
  checkUsername: publicProcedure.input(CheckUsernameSchema).mutation(async ({ ctx, input }) => {
    const exist = await ctx.prisma.user.findFirst({
      where: {
        username: {
          equals: input.username,
          ...(input.exclude && { not: input.exclude }),
        },
      },
    })

    if (exist?.id) {
      return {
        username: exist.username,
        exist: true,
      }
    }
    return {
      username: input.username,
      exist: false,
    }
  }),
  checkEmail: publicProcedure.input(CheckEmailSchema).mutation(async ({ ctx, input }) => {
    const exist = await ctx.prisma.user.findFirst({
      where: {
        email: {
          equals: input.email,
          ...(input.exclude && { not: input.exclude }),
        },
      },
    })

    if (exist?.id) {
      return {
        email: exist.email,
        exist: true,
      }
    }
    return {
      email: input.email,
      exist: false,
    }
  }),
});
