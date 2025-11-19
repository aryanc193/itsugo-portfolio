import { getBlogPosts } from "../lib/getBlogPosts";
import Writing from "./Writing";

export default function WritingWrapper() {
  const personalPosts = getBlogPosts(); // runs server-side
  return <Writing personalPosts={personalPosts} />;
}
