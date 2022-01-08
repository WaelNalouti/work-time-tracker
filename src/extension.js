const vscode = require("vscode");
const {
  StartTimeCounter,
  PauseTimeCounter,
  ResumeTimeCounter,
  ResetTimeCounter,
} = require("./functions/counter.js");
/**
 * @param {vscode.ExtensionContext} context
 */
let stausBarItem;

function activate(context) {
  // Commands
  const CMD_startWorkTimeTracker = "work-time-tracker.startTimer";
  const CMD_pauseWorkTimeTracker = "work-time-tracker.pauseTimer";
  const CMD_resumeWorkTimeTracker = "work-time-tracker.resumeTimer";
  const CMD_resetWorkTimeTracker = "work-time-tracker.resetTimer";

  let activeCMD = "START_NOT_ACTIVE";

  // Starts the time counter whenever the start command gets executed
  let StartCMD = vscode.commands.registerCommand(
    CMD_startWorkTimeTracker,
    function () {
      if (activeCMD === "START_NOT_ACTIVE") {
        vscode.window.showInformationMessage(
          `💪🤖 Starting working session timer`
        );
        activeCMD = "START_ACTIVE";
        StartTimeCounter(stausBarItem);
      } else return;
    }
  );
  context.subscriptions.push(StartCMD);

  // Pauses the time counter whenever the pause command gets executed
  let PauseCMD = vscode.commands.registerCommand(
    CMD_pauseWorkTimeTracker,
    function () {
      if (activeCMD === "START_ACTIVE") {
        vscode.window.showInformationMessage(
          `🤖🤙 Working session timer paused`
        );
        activeCMD = "PAUSE";
        PauseTimeCounter(stausBarItem);
      }
    }
  );
  context.subscriptions.push(PauseCMD);

  // Resume the time counter whenever the pause command gets executed
  let ResumeCMD = vscode.commands.registerCommand(
    CMD_resumeWorkTimeTracker,
    function () {
      if (activeCMD === "PAUSE") {
        vscode.window.showInformationMessage(
          `👌🤖 Working session timer resumed`
        );
        activeCMD = "RESUME";
        ResumeTimeCounter(stausBarItem);
      }
    }
  );
  context.subscriptions.push(ResumeCMD);

  // Reset the time counter whenever the pause command gets executed
  let ResetCMD = vscode.commands.registerCommand(
    CMD_resetWorkTimeTracker,
    function () {
      if ((activeCMD === "RESUME") | (activeCMD === "START_ACTIVE")) {
        vscode.window.showInformationMessage(`👋🤖 Reseting timer`);
        activeCMD = "REST";
        ResetTimeCounter(stausBarItem);
      }
    }
  );
  context.subscriptions.push(ResetCMD);

  //Creates a status bar item
  stausBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    0
  );
  stausBarItem.show();
  context.subscriptions.push(stausBarItem);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
