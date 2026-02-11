import { getParticipants } from "../services/participant.service";

export default defineEventHandler(async () => {
  return getParticipants();
});
