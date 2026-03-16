import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Star, UserCheck, UserMinus, UserPlus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type Friend,
  getFriends,
  saveFriends,
  searchUsers,
} from "../utils/storage";

export default function FriendsPage() {
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>(() =>
    getFriends().sort((a, b) => b.points - a.points),
  );

  const results = searchUsers(query);
  const friendUsernames = new Set(friends.map((f) => f.username));

  function addFriend(user: Friend) {
    if (friendUsernames.has(user.username)) return;
    const updated = [...friends, { ...user, addedAt: Date.now() }].sort(
      (a, b) => b.points - a.points,
    );
    setFriends(updated);
    saveFriends(updated);
    toast.success(`Added ${user.username} as a friend!`);
  }

  function removeFriend(username: string) {
    const updated = friends.filter((f) => f.username !== username);
    setFriends(updated);
    saveFriends(updated);
    toast(`Removed ${username} from friends.`);
  }

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Friends
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Find &amp; add players
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative mb-5"
      >
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          data-ocid="friends.search_input"
          className="pl-9 bg-card border-border placeholder:text-muted-foreground"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.div>

      {/* Search Results */}
      <AnimatePresence mode="wait">
        {query.trim() !== "" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mb-6"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Search Results
            </p>

            {results.length === 0 ? (
              <div
                data-ocid="friends.search.empty_state"
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Search size={20} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No players found for &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {results.map((user, idx) => {
                  const isAdded = friendUsernames.has(user.username);
                  return (
                    <motion.div
                      key={user.username}
                      data-ocid={`friends.result.item.${idx + 1}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className="bg-card border-border">
                        <CardContent className="flex items-center justify-between py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-bold text-sm">
                                {user.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {user.username}
                              </p>
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 mt-0.5"
                              >
                                <Star size={9} className="mr-1 text-primary" />
                                {user.points} pts
                              </Badge>
                            </div>
                          </div>
                          <Button
                            data-ocid={`friends.add.button.${idx + 1}`}
                            size="sm"
                            variant={isAdded ? "secondary" : "default"}
                            disabled={isAdded}
                            onClick={() => addFriend(user)}
                            className={`gap-1.5 text-xs ${
                              isAdded
                                ? "text-primary border-primary/30"
                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <UserCheck size={13} /> Added
                              </>
                            ) : (
                              <>
                                <UserPlus size={13} /> Add
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Friends */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          My Friends
          {friends.length > 0 && (
            <span className="ml-2 text-primary">{friends.length}</span>
          )}
        </p>

        {friends.length === 0 ? (
          <div
            data-ocid="friends.list.empty_state"
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <UserPlus size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              No friends yet
            </p>
            <p className="text-xs text-muted-foreground">
              Search for players above to add them
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {friends.map((friend, idx) => (
                <motion.div
                  key={friend.username}
                  data-ocid={`friends.list.item.${idx + 1}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8, height: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="flex items-center justify-between py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">
                            {friend.username[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {friend.username}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] font-bold text-primary">
                              #{idx + 1}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0"
                            >
                              <Star size={9} className="mr-1 text-primary" />
                              {friend.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        data-ocid={`friends.remove.button.${idx + 1}`}
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFriend(friend.username)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5 text-xs"
                      >
                        <UserMinus size={13} /> Remove
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
