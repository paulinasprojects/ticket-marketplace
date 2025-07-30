import { Id } from "@/convex/_generated/dataModel";

interface Props {
  eventId: Id<"events">;
}


const PurchaseTicket = ({ eventId }: Props) => {
  return (
    <div>PurchaseTicket</div>
  )
}

export default PurchaseTicket