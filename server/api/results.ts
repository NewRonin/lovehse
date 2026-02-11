import { getResults } from "../services/participant.service";

export default defineEventHandler(async () => {
  return getResults();
});
