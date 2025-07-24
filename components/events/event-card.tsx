"use client";

import { Id } from "@/convex/_generated/dataModel"

interface Props {
  eventId: Id<"events">;
}

const EventCard = ({ eventId }: Props) => {
  return (
    <div>EventCard</div>
  )
}

export default EventCard