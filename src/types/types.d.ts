const PHONE: string = "PHONE";
const EMAIL: string = "EMAIL";

export type VerificationTarget = PHONE | EMAIL;

const ACCEPTED = "ACCEPTED";
const FINISHED = "FINISHED";
const CANCELED = "CANCELED";
const REQUESTING = "REQUESTING";
const ONROUTE = "ONROUTE";

export type rideStatus = ACCEPTED | FINISHED | CANCELED | REQUESTING | ONROUTE;
