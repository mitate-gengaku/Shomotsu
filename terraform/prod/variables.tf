variable "vercel_api_token" {
  description = "VercelのAPIトークン"
  type = string
  sensitive = true
}

variable "vercel_team_id" {
  description = "VercelのTeam ID"
  type = string
  sensitive = true
}