// test-audit.js
import 'dotenv/config';
import vimeoHandler from './functions/getVimeoUsage.js';
import publitioHandler from './functions/getPublitioUsage.js';

const runTest = async () => {
  console.log("🚀 [LOCAL AUDIT TEST START]");

  const mockRes = {
    status: (code) => ({ json: (data) => console.log(`Status ${code}:`, data) }),
    json: (data) => console.log("📊 Result Data:", JSON.stringify(data, null, 2))
  };

  // Test 1: Publitio (Passive Sync - should show > 0MB)
  console.log("\n--- Testing Publitio (Standard Sync) ---");
  await publitioHandler({ query: {} }, mockRes);

  // Test 2: Vimeo
  console.log("\n--- Testing Vimeo Sync ---");
  await vimeoHandler({}, mockRes);
};

runTest();