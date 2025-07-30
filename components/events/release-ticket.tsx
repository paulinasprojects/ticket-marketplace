"use client";

import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { XCircle } from "lucide-react";


interface Props {
  eventId: Id<"events">;
  waitingListId: Id<"waitingList">;
}



const ReleaseTicket = ({ eventId, waitingListId }: Props) => {
  const [isReleasing, setIsReleasing] = useState(false);
  const releaseTicket = useMutation(api.waitinglist.releaseTicket);

  const handleRelease = async () => {
    if (!confirm("Are you sure you want to release your ticket offer?")) return

    try {
      setIsReleasing(true);
      await releaseTicket({
        eventId,
        waitingListId,
      })
    } catch (error) {
      console.error("Error releasing ticket:", error);
    } finally {
      setIsReleasing(false);
    }
  };

  return (
    <button
      onClick={handleRelease}
      disabled={isReleasing}
      className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <XCircle className="size-4"/>
      {isReleasing ? "Releasing..." : "Release Ticket Offer"}
    </button>
  )
}

export default ReleaseTicket