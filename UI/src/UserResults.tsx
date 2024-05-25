import { useContext } from "react";
import { InfoContext } from "./Contexts/InfoProvider";
import {
  TaskResult,
  Validate_OS_Task,
  Validate_CertTask,
  Validate_Context_Task,
  Validate_Endpoint_Task,
  Validate_Port_Task,
} from "./AssesmentService";
import "./UserResults.css";
import { CreateSummary } from "./SummaryService";

export default () => {
  //HINT: make sure the InfoContext is being provided correctly
  const { Info, Env } = useContext(InfoContext);
  const PORT_TASK = Validate_Port_Task(window.location.port);
  const CONTEXT_TASK = Validate_Context_Task(Env);
  const ENDPOINT_TASK = Validate_Endpoint_Task(
    Info?.SystemOS,
    Info?.CertificateHash
  );
  const OS_TASK = Validate_OS_Task(Info?.SystemOS);
  const CERT_TASK = Validate_CertTask(Info?.CertificateHash);
  const allTasks = [PORT_TASK, CONTEXT_TASK, ENDPOINT_TASK, OS_TASK, CERT_TASK];
  const summary = CreateSummary(allTasks);
  return (
    <div>
      <SingleResult Name="Port" Result={PORT_TASK} />
      <SingleResult Name="Context" Result={CONTEXT_TASK} />
      <SingleResult Name="Endpoint" Result={ENDPOINT_TASK} />
      <SingleResult Name="System OS" Result={OS_TASK} />
      <SingleResult Name="Cert Hash" Result={CERT_TASK} />

      <div className="completionMessage">
        <p>
          Please complete as many tasks as possible. Feel free to skip tasks you
          get stuck on.
        </p>
        <p>Once satisfied, email the interviewer a screenshot of this page</p>
        <p>Use the email subject 'Software Engineer Application: {summary}'</p>
      </div>
    </div>
  );
};

interface ISingleResult {
  Name: string;
  Result?: TaskResult;
}

const SingleResult = ({ Name, Result }: ISingleResult) => {
  return (
    <div className="singleResult">
      <div className="taskDescription">
        <div>
          <span style={{ fontSize: 20, fontWeight: 700 }}>{Name}</span>{" "}
          {Result?.Note ?? ""}
        </div>
      </div>
      <div className={"taskStatusIcon " + Result?.Rating + "_icon"} />
    </div>
  );
};
