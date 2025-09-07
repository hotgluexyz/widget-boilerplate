'use client'

import HotglueConfig from "@hotglue/widget";
import WidgetLauncher from "./widgetLauncher";
import GraphView from "./GraphView";
import { useState } from "react";

export default function Home() {
  const [tenantIsLinked, setTenantIsLinked] = useState(false)
  return (
    <HotglueConfig config={{
      apiKey: process.env.NEXT_PUBLIC_HOTGLUE_PUBLIC_KEY ?? '',
      envId: process.env.NEXT_PUBLIC_HOTGLUE_ENV_ID ?? '',
    }}>
    <div className={`
      flex flex-col items-center gap-8
      h-screen py-20 text-center
      bg-gradient-to-b from-red-100 to-purple-100
      `}>
      <h1 className="text-3xl font-bold">Hotglue Widget Boilerplate</h1>
      <GraphView tenantIsLinked={tenantIsLinked} />
      <WidgetLauncher setTenantIsLinked={setTenantIsLinked} />
    </div>
    </HotglueConfig>
  );
}
