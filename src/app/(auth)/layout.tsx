import Link from "next/link";
import {Shield} from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>

      {children}

      {/* Footer */}
      <div className="text-center mt-8 text-sm text-gray-500">
        © 2024 StoreRank. All rights reserved.
      </div>
    </div>
  )
}
