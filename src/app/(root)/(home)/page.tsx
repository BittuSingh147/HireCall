"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon, Sparkles } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";

export default function Home() {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* WELCOME SECTION */}
        <div className="rounded-2xl bg-card p-8 border shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Welcome back!
              </h1>
              <p className="text-muted-foreground text-lg">
                {isInterviewer
                  ? "Manage your interviews and review candidates effectively"
                  : "Access your upcoming interviews and preparations"}
              </p>
            </div>
            <Sparkles className="size-6 text-purple-500 animate-pulse" />
          </div>
        </div>

        {isInterviewer ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {QUICK_ACTIONS.map((action, index) => (
                <div
                  key={action.title}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ActionCard
                    action={action}
                    onClick={() => handleQuickAction(action.title)}
                  />
                </div>
              ))}
            </div>

            <MeetingModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
              isJoinMeeting={modalType === "join"}
            />
          </>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                  Your Interviews
                </h1>
                <p className="text-muted-foreground mt-1">
                  View and join your scheduled interviews
                </p>
              </div>
            </div>

            <div className="relative">
              {interviews === undefined ? (
                <div className="flex justify-center py-12">
                  <Loader2Icon className="size-8 animate-spin text-purple-500" />
                </div>
              ) : interviews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {interviews.map((interview, index) => (
                    <div
                      key={interview._id}
                      className="animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <MeetingCard interview={interview} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    You have no scheduled interviews at the moment
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}