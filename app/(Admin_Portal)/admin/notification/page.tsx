import { auth } from "@/auth";
import NotificationForm from "./NotificationForm";

export default async function AdminNotificationsPage() {
  await auth();
  return (
    <div className="mt-34 p-8">
      <div className="w-full max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">
          Send Email Notification
        </h1>
        <NotificationForm />
      </div>
    </div>
  );
}
