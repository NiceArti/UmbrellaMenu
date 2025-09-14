import path from "path";
import { COLLECTIONS_DIR, COLLECTIONS_FILE_NAME } from "../constants/constants";

export const getCollectionsPath = () => {
  return path.join(process.cwd(), COLLECTIONS_DIR, COLLECTIONS_FILE_NAME);
};
