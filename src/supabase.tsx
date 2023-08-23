import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eouwlhnrehkfrjlbqxhw.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdXdsaG5yZWhrZnJqbGJxeGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2OTQzMjIsImV4cCI6MjAwODI3MDMyMn0.SSohK1l1ZR4yDjMHK40tYaAbjLQaXNFdwiW8jUEgfM4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
