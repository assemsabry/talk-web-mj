import { supabase } from "./supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

export class RealtimeManager {
  private channels: Map<string, RealtimeChannel> = new Map()

  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    if (!supabase) return null

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe()

    this.channels.set(`notifications:${userId}`, channel)
    return channel
  }

  subscribeToPost(postId: string, callback: (payload: any) => void) {
    if (!supabase) return null

    const channel = supabase
      .channel(`post:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        callback,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
          filter: `post_id=eq.${postId}`,
        },
        callback,
      )
      .subscribe()

    this.channels.set(`post:${postId}`, channel)
    return channel
  }

  subscribeToFeed(callback: (payload: any) => void) {
    if (!supabase) return null

    const channel = supabase
      .channel("feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        callback,
      )
      .subscribe()

    this.channels.set("feed", channel)
    return channel
  }

  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName)
    if (channel) {
      supabase?.removeChannel(channel)
      this.channels.delete(channelName)
    }
  }

  unsubscribeAll() {
    this.channels.forEach((channel, name) => {
      supabase?.removeChannel(channel)
    })
    this.channels.clear()
  }
}

export const realtimeManager = new RealtimeManager()
