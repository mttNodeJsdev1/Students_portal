// pages/online-test/[id]/page.js
import StartTest from "@/components/start-test/Start-test";
import React from "react";

const TestPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <StartTest testId={id} />
    </div>
  );
};

export default TestPage;
