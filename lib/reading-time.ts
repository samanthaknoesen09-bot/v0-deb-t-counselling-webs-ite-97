export function calculateReadingTime(content: string): string {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, "")
  
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  
  return minutes === 1 ? "1 min read" : `${minutes} min read`
}
