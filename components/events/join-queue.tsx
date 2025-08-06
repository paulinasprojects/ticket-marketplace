"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import Spinner from "./spinner";
import { WAITING_LIST_STATUS } from "@/convex/constants";
import { Clock, OctagonXIcon } from "lucide-react";


interface Props {
  eventId: Id<"events">;
  userId: string;
}

const JoinQueue = ({ eventId, userId}: Props) => {
  const { toast } = useToast();
  const joinWaitingList = useMutation(api.events.joinWaitingList);
  const queuePosition = useQuery(api.waitinglist.getQueuePosition, {
    eventId,
    userId,
  });
  const userTicket = useQuery(api.tickets.getUserTicketForEvent, {
    userId,
    eventId,
  });

  const availability = useQuery(api.events.getEventAvailability, {
    eventId,
  });
  const event = useQuery(api.events.getById, {eventId});

  const isEvenOwner = userId === event?.userId;

  const handleJoinQueue = async () => {
    try {
      const result = await joinWaitingList({eventId, userId});

      if (result.success) {
        console.log("Successfully joined waiting list");
      }
    } catch (error) {
      if (
        error instanceof ConvexError && error.message.includes("joined the waiting list too many times")
      ) {
        toast({
          variant: "destructive",
          title: "Slow down there!",
          description: error.data,
          duration: 5000,
        });
      } else {
        console.error("Error joining waiting list:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong",
          description: "Failed to join queue. Please try again later."
        })
      }
    } 
  };

  if (queuePosition === undefined || availability === undefined || !event) {
    return <Spinner/>;
  }

  if (userTicket) {
    return null;
  }

  const isPastEvent = event.eventDate < Date.now();

  return (
    <div>
      {(!queuePosition || queuePosition.status === WAITING_LIST_STATUS.EXPIRED || (queuePosition.status === WAITING_LIST_STATUS.OFFERED && 
        queuePosition.offerExpiresAt && queuePosition.offerExpiresAt <= Date.now())) && (
          <>
            {isEvenOwner ? (
              <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg">
                <OctagonXIcon className="size-5"/>
                <span>You cannot buy a ticket for your own event`</span>
              </div>
            ) : (
              isPastEvent ? (
                <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg cursor-not-allowed">
                  <Clock className="size-5"/>
                  <span>Event has ended</span>
                </div>
              ) : availability.purchasedCount >= availability?.totalTickets ? (
                <div className="text-center p-4">
                  <p className="text-lg font-semibold text-red-600">Sorry, this event is sold out</p>
                </div>
              ) : (
                <button
                  onClick={handleJoinQueue}
                  disabled={isPastEvent || isEvenOwner}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Buy Ticket
                </button>
              )
            )}
          </>
        )}
    </div>
  )
}

export default JoinQueue