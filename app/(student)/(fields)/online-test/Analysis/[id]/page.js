// // app/online-test/[id]/page.js
import Analysis from "@/components/analysis/Analysis";
import React from "react";

const AnalysisPage = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <Analysis resultId={id} />;
    </div>
  );
};

export default AnalysisPage;
