export interface Post {
  preview_url: string
  sample_url: string
  file_url: string
  directory: number
  hash: string
  width: number
  height: number
  id: number
  image: string
  change: number
  owner: string
  parent_id: number
  rating: 'explicit' | 'questionable' | 'safe' | string
  sample: boolean
  sample_height: number
  sample_width: number
  score: number
  tags: string
  source: string
  status: string
  has_notes: boolean
  comment_count: number
}
export interface sendPost {
  preview_url: string
  sample_url: string
  file_url: string
  id: number
}
export interface ApiResponse {
  posts: Post[]
}
export interface TabsResponse {
  label: string
  value: string
}
export interface ru34Request {
  tabs: string
  useProxy: boolean
}
