"use client";
import React, { useEffect, useState } from "react";
import { get } from "../../actions";

export default function Page({ params }: { params: { taskId: string } }) {
  const [taskId, setTaskId] = useState("");
  useEffect(() => {
    get(params.taskId).then((taskId) => {
      setTaskId(taskId);
    });
  }, []);
  return (
    <div>
      <h1>
        Task ID: {params.taskId} with content {taskId}
      </h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
