export type Rating = "PASS" | "FAIL" | "SOLVED";

export interface TaskResult {
  Rating: Rating;
  Note: string;
  Key: string;
}

//This service is correct, no need to change it.

//HINT: what this service is checking for?

//check the user is connected to the backend correctly
export const Validate_Port_Task = (port?: string): TaskResult => {
  if (port === "3000") {
    return {
      Rating: "PASS",
      Note: "Port Is Correct: " + port,
      Key: "P" + port,
    };
  }
  return { Rating: "FAIL", Note: "Task has not been solved", Key: "F" };
};

export const Validate_Context_Task = (env?: string): TaskResult => {
  if (env === "ACTIVE") {
    return {
      Rating: "PASS",
      Note: "Context Is Correct: " + env,
      Key: "P" + env,
    };
  }
  return { Rating: "FAIL", Note: "Task has not been solved", Key: "F" };
};

export const Validate_Endpoint_Task = (
  systemOS?: string,
  certHash?: string
): TaskResult => {
  if (!systemOS || !certHash || systemOS != "DECOY" || certHash != "DECOY") {
    return { Rating: "FAIL", Note: "Task has not been solved", Key: "F" };
  }

  return {
    Rating: "PASS",
    Note: "Endpoint Is Correct: Info",
    Key: "P" + (systemOS ?? "") + (certHash ?? ""),
  };
};

//validate system OS
export const Validate_OS_Task = (systemOS?: string): TaskResult => {
  if (systemOS?.startsWith("OS_") || systemOS?.startsWith("DECOY")) {
    return {
      Rating: "PASS",
      Note:
        "Valid System OS Found: " +
        systemOS.replace("OS_", "").replace("DECOY", "Android"),
      Key: "P" + (systemOS ?? ""),
    };
  }
  return { Rating: "FAIL", Note: "Task has not been solved", Key: "F" };
};

//validate certificate hash
export const Validate_CertTask = (certHash?: string): TaskResult => {
  //the start of the file hash
  const expectedHash =
    "9b3be43abccf9a2e48a02ea10bffaf9a61df1c567035414cd091443703";
  if (certHash?.startsWith(expectedHash) || certHash?.startsWith("DECOY")) {
    return {
      Rating: "PASS",
      Note: "Valid Certificate Hash Found: " + certHash.slice(-8),
      Key: "P" + (certHash ?? ""),
    };
  }
  return { Rating: "FAIL", Note: "Task has not been solved", Key: "F" };
};
