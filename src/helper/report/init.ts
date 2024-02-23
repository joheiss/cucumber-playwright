import { ensureDir, emptyDir } from "fs-extra";

try {
  ensureDir("test-results");
  emptyDir("test-results");
} catch (error) {
  console.error("Could not create 'test-results' folder: " + error);
}
