'use client'

import HotglueConfig from "@hotglue/widget";
import WidgetLauncher from "./widgetLauncher";

export default function Home() {
  
  

  
  
  return (
    <HotglueConfig config={{
      apiKey: process.env.NEXT_PUBLIC_HOTGLUE_PUBLIC_KEY ?? '',
      envId: process.env.NEXT_PUBLIC_HOTGLUE_ENV_ID ?? '',
    }}>
    <div>
      <h1>Hotglue Widget Boilerplate</h1>
      <WidgetLauncher />
    </div>
    </HotglueConfig>
  );
}
