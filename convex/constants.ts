import { Doc } from "./_generated/dataModel";

export const DURATIONS = {
  TICKET_OFFER: 30 * 60 * 1000, // 30 minutes
} as const;

// Status types for better type safety
export const WAITING_LIST_STATUS: Record<string, Doc<"waitingList">["status"]> =
  {
    WAITING: "waiting",
    OFFERED: "offered",
    PURCHASED: "purchased",
    EXPIRED: "expired",
  } as const;

export const TICKET_STATUS: Record<string, Doc<"tickets">["status"]> = {
  VALID: "valid",
  USED: "used",
  REFUNDED: "refunded",
  CANCELLED: "cancelled",
} as const;

export interface CheckAvailabilityResult {
  available: boolean;
  availableSpots: number;
  totalTickets: number;
  purchasedCount: number;
  activeOffers: number;
}

type WaitingListStatus =
  (typeof WAITING_LIST_STATUS)[keyof typeof WAITING_LIST_STATUS];

export interface JoinWaitingListResult {
  success: boolean;
  status: WaitingListStatus;
  message: string;
}
