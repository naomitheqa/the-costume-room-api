import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL || "http://localhost:8080";
const supabaseAnonKey = process.env.ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getSignedUrl = async function (bucketName, filePath, expiresIn = 60) {
  console.log(`Fetching signed URL for ${filePath} in bucket ${bucketName}...`);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error("Error creating signed URL:", error.message);
    return null;
  }

  console.log("Generated signed URL:", data.signedUrl);
  return data.signedUrl;
};

const listFilesInBucket = async function (bucketName) {
  console.log(`Listing files in bucket ${bucketName}...`);

  const { data, error } = await supabase.storage.from(bucketName).list();

  if (error) {
    console.error("Error listing files:", error.message);
    return [];
  }

  console.log("Files in bucket:", data);
  return data;
};

export const fetchItemImage = async function (filePath) {
  const bucketName = process.env.BUCKET_NAME || "tcr-items";

  // List files in the bucket
  const files = await listFilesInBucket(bucketName);
  console.log("Files retrieved:", files);

  // Check if file exists in the bucket
  const fileExists = files.some((file) => file.name === filePath);
  if (!fileExists) {
    console.log(`File ${filePath} not found in bucket ${bucketName}`);
    return null;
  }

  // Fetch signed URL if file exists
  const signedUrl = await getSignedUrl(bucketName, filePath);
  if (signedUrl) {
    console.log("Signed URL:", signedUrl);
    return signedUrl;
  } else {
    console.log("Failed to get signed URL.");
  }
};
