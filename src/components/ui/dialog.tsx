// src/components/ui/dialog.tsx (CODE FULL REVISI)

import * as React from "react";

// Menggunakan props agar tidak error TS6133
const Dialog = ({ children, ...props }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);
Dialog.displayName = "Dialog";

export default Dialog;