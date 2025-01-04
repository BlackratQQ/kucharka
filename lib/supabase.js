import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://synphehqbhamvydikqim.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bnBoZWhxYmhhbXZ5ZGlrcWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5Mzg5MjAsImV4cCI6MjA1MTUxNDkyMH0.QnS55gcrNKY3E5VRPeig1RvG6R_Pq7bwqAlXXi-pGdk";
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5bnBoZWhxYmhhbXZ5ZGlrcWltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTkzODkyMCwiZXhwIjoyMDUxNTE0OTIwfQ.SRTjSBp3SiuN_W-2Tdfa0NQmCalS0X-wOkxfcXIR4TM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);
