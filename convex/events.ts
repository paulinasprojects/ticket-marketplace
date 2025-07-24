import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      //Get the events that aren't cancelled
      .filter((q) => q.eq(q.field("is_cancelled"), undefined))
      .collect();
  },
});
