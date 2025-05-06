"use client";

import StartTypingTest from "@/components/typing-test/Start-Typing";
import React, { Suspense } from "react";
export default function StartTest() {
  return (
    <div className="relative z-10">
      <Suspense fallback={<div>Loading test...</div>}>
        <StartTypingTest />
      </Suspense>
    </div>
  );
}
