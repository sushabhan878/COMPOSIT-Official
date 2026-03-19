import React from "react";

type RegistrationClosedProps = {
  title?: string;
  message?: string;
};

const RegistrationClosed = ({
  title = "Registrations Closed",
  message = "Registration window for this event is closed. You can still view event structure, FAQs, and contact details.",
}: RegistrationClosedProps) => {
  return (
    <div className="w-full rounded-xl border border-amber-300/35 bg-amber-500/10 px-4 py-3 text-left shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-amber-200">
        {title}
      </p>
      <p className="mt-1 text-sm text-amber-100/90">{message}</p>
    </div>
  );
};

export default RegistrationClosed;
