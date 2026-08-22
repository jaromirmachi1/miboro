"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

const isConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export default function StudioPage() {
  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-svetly p-8">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-grafit">Sanity není nakonfigurováno</h1>
          <p className="mt-3 text-sm text-sedy">
            Nastavte <code className="text-grafit">NEXT_PUBLIC_SANITY_PROJECT_ID</code> v
            souboru <code className="text-grafit">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
