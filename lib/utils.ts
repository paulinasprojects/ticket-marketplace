import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { clsx, type ClassValue } from "clsx";
import { useQuery } from "convex/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useStorageUrl(storageId: Id<"_storage"> | undefined) {
  //it will skip the image if the image does not exist
  return useQuery(api.storage.getUrl, storageId ? { storageId } : "skip");
}
