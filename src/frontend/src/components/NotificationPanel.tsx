import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const TYPE_ICON: Record<string, string> = {
  info: "🔔",
  success: "✅",
  warning: "⚠️",
};

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({
  open,
  onClose,
}: NotificationPanelProps) {
  const { notifications, unreadCount, markAllRead, dismissNotification } =
    useNotifications();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        data-ocid="notifications.sheet"
        className="h-[75vh] rounded-t-2xl px-0 pb-0 flex flex-col"
      >
        <SheetHeader className="px-4 pt-2 pb-3 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-lg text-foreground">
              Notifications
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                data-ocid="notifications.mark_all_read.button"
                className="text-xs text-primary hover:text-primary/80 h-7"
                onClick={markAllRead}
              >
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 py-3">
          {notifications.length === 0 ? (
            <div
              data-ocid="notifications.empty_state"
              className="flex flex-col items-center justify-center py-16 text-muted-foreground"
            >
              <span className="text-5xl mb-3">🔕</span>
              <p className="font-medium">No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif, i) => (
                <div
                  key={notif.id}
                  data-ocid={`notifications.item.${i + 1}`}
                  className={`relative flex gap-3 p-3 rounded-xl border transition-all ${
                    notif.read
                      ? "bg-card border-border"
                      : "bg-primary/5 border-primary/20 border-l-4 border-l-primary"
                  }`}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {TYPE_ICON[notif.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold leading-tight ${notif.read ? "text-foreground" : "text-foreground"}`}
                    >
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {notif.body}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">
                      {timeAgo(notif.createdAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-ocid={`notifications.dismiss.button.${i + 1}`}
                    onClick={() => dismissNotification(notif.id)}
                    className="flex-shrink-0 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Dismiss notification"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
