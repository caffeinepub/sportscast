import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, LogIn, Plus, Trophy, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";
import {
  type Group,
  generateInviteCode,
  getGroups,
  getProfile,
  saveGroups,
} from "../utils/storage";

const MOCK_MEMBERS = [
  { name: "Ravi", points: 180, isMe: false },
  { name: "Priya", points: 150, isMe: false },
  { name: "Arjun", points: 130, isMe: false },
  { name: "Meena", points: 90, isMe: false },
];

export default function GroupsPage() {
  const { t } = useLang();
  const profile = getProfile();
  const [groups, setGroups] = useState<Group[]>(getGroups);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [inviteInput, setInviteInput] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [view, setView] = useState<"list" | "create" | "join">("list");

  function handleCreate() {
    const name = groupNameInput.trim();
    if (!name) {
      toast.error("Enter a group name");
      return;
    }
    const newGroup: Group = {
      id: `g${Date.now()}`,
      name,
      inviteCode: generateInviteCode(),
      members: [
        {
          name: profile.username || "You",
          points: profile.totalPoints,
          isMe: true,
        },
        ...MOCK_MEMBERS.slice(0, 3),
      ],
      createdAt: Date.now(),
    };
    const updated = [newGroup, ...groups];
    setGroups(updated);
    saveGroups(updated);
    setGroupNameInput("");
    setView("list");
    setSelectedGroup(newGroup);
    toast.success(`Group "${name}" created!`);
  }

  function handleJoin() {
    const code = inviteInput.trim().toUpperCase();
    if (code.length !== 6) {
      toast.error("Enter a valid 6-character code");
      return;
    }
    if (groups.find((g) => g.inviteCode === code)) {
      toast.error("You're already in this group");
      return;
    }
    const newGroup: Group = {
      id: `g${Date.now()}`,
      name: `Group ${code}`,
      inviteCode: code,
      members: [
        {
          name: profile.username || "You",
          points: profile.totalPoints,
          isMe: true,
        },
        ...MOCK_MEMBERS,
      ],
      createdAt: Date.now(),
    };
    const updated = [newGroup, ...groups];
    setGroups(updated);
    saveGroups(updated);
    setInviteInput("");
    setView("list");
    setSelectedGroup(newGroup);
    toast.success("Joined group!");
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => toast.success(t("copied")));
  }

  function handleLeave(groupId: string) {
    const updated = groups.filter((g) => g.id !== groupId);
    setGroups(updated);
    saveGroups(updated);
    if (selectedGroup?.id === groupId) setSelectedGroup(null);
    toast.success("Left group");
  }

  if (selectedGroup) {
    const sortedMembers = [...selectedGroup.members].sort(
      (a, b) => b.points - a.points,
    );
    return (
      <div className="min-h-full">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-lg"
              onClick={() => setSelectedGroup(null)}
              data-ocid="groups.back.button"
            >
              ←
            </button>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {selectedGroup.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {selectedGroup.members.length} {t("members")}
              </p>
            </div>
          </div>
        </header>
        <main className="px-4 py-4 space-y-4">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("inviteCode")}
                </p>
                <p className="font-display font-bold text-2xl text-primary tracking-widest">
                  {selectedGroup.inviteCode}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyCode(selectedGroup.inviteCode)}
                data-ocid="groups.copy.button"
                className="gap-1.5"
              >
                <Copy size={13} />
                {t("copyLink")}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Trophy size={16} className="text-primary" />
                {t("leaderboard")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {sortedMembers.map((member, i) => (
                  <li
                    key={member.name}
                    data-ocid={`groups.leaderboard.item.${i + 1}`}
                    className={`flex items-center gap-3 px-4 py-3 ${member.isMe ? "bg-primary/5" : ""}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0
                          ? "bg-yellow-500/20 text-yellow-400"
                          : i === 1
                            ? "bg-gray-400/20 text-gray-400"
                            : i === 2
                              ? "bg-orange-600/20 text-orange-400"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {member.name}
                      {member.isMe && (
                        <span className="ml-1.5 text-xs text-primary">
                          (You)
                        </span>
                      )}
                    </span>
                    <span className="text-primary font-bold text-sm">
                      {member.points}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        {t("points")}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => handleLeave(selectedGroup.id)}
            data-ocid="groups.leave.button"
          >
            Leave Group
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
        <h1 className="font-display font-bold text-xl text-foreground">
          Groups
        </h1>
        <p className="text-xs text-muted-foreground">Compete with friends</p>
      </header>

      <main className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            data-ocid="groups.create.button"
            className="bg-primary text-primary-foreground gap-2"
            onClick={() => setView(view === "create" ? "list" : "create")}
          >
            <Plus size={16} />
            {t("createGroup")}
          </Button>
          <Button
            data-ocid="groups.join.button"
            variant="outline"
            className="gap-2"
            onClick={() => setView(view === "join" ? "list" : "join")}
          >
            <LogIn size={16} />
            {t("joinGroup")}
          </Button>
        </div>

        <AnimatePresence>
          {view === "create" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="bg-card border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <p className="font-medium text-sm text-foreground">
                    {t("createGroup")}
                  </p>
                  <Input
                    data-ocid="groups.create.input"
                    placeholder={t("enterGroupName")}
                    value={groupNameInput}
                    onChange={(e) => setGroupNameInput(e.target.value)}
                    className="bg-secondary/50"
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  />
                  <Button
                    data-ocid="groups.create.submit_button"
                    className="w-full bg-primary text-primary-foreground"
                    onClick={handleCreate}
                  >
                    {t("generate")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {view === "join" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="bg-card border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <p className="font-medium text-sm text-foreground">
                    {t("joinGroup")}
                  </p>
                  <Input
                    data-ocid="groups.join.input"
                    placeholder={t("enterInviteCode")}
                    value={inviteInput}
                    onChange={(e) =>
                      setInviteInput(e.target.value.toUpperCase())
                    }
                    maxLength={6}
                    className="bg-secondary/50 font-mono tracking-widest uppercase"
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                  />
                  <Button
                    data-ocid="groups.join.submit_button"
                    className="w-full bg-primary text-primary-foreground"
                    onClick={handleJoin}
                  >
                    {t("join")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {groups.length === 0 ? (
          <div
            data-ocid="groups.empty_state"
            className="py-12 text-center text-muted-foreground"
          >
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">{t("noGroups")}</p>
            <p className="text-xs mt-1">Create or join a group to compete!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  data-ocid={`groups.group.item.${i + 1}`}
                  className="bg-card border-border cursor-pointer hover:border-primary/40 transition-colors"
                  onClick={() => setSelectedGroup(group)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {group.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Code:{" "}
                        <span className="font-mono text-primary">
                          {group.inviteCode}
                        </span>
                        {" · "}
                        {group.members.length} {t("members")}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-primary border-primary/30"
                    >
                      View →
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
