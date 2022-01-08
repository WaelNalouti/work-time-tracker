const vscode = require("vscode");
const {
  StartTimeCounter,
  PauseTimeCounter,
  ResumeTimeCounter,
  ResetTimeCounter,
} = require("./utils/counter.js");
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

  let activeCMD = "NOT_ACTIVE";

  // Starts the time counter whenever the start command gets executed
  let StartCMD = vscode.commands.registerCommand(
    CMD_startWorkTimeTracker,
    function () {
      if (activeCMD === "NOT_ACTIVE") {
        vscode.window.showInformationMessage(
          `💪🤖 Starting working session timer`
        );
        activeCMD = "ACTIVE";
        StartTimeCounter(stausBarItem);
      } else if (activeCMD === "ACTIVE") {
        vscode.window.showWarningMessage(
          `👾 Working session timer already been started!`
        );
      }
    }
  );
  context.subscriptions.push(StartCMD);

  // Pauses the time counter whenever the pause command gets executed
  let PauseCMD = vscode.commands.registerCommand(
    CMD_pauseWorkTimeTracker,
    function () {
      if (activeCMD === "ACTIVE") {
        vscode.window.showInformationMessage(
          `🤖🤙 Working session timer paused`
        );
        activeCMD = "PAUSE";
        PauseTimeCounter(stausBarItem);
      } else if (activeCMD === "NOT_ACTIVE") {
        vscode.window.showErrorMessage(
          `👾 No active working session timer to pause!`
        );
      } else {
        vscode.window.showWarningMessage(
          `👾 Working session timer alredy been paused!`
        );
      }
    }
  );
  context.subscriptions.push(PauseCMD);

  // Resume the time counter whenever the resume command gets executed
  let ResumeCMD = vscode.commands.registerCommand(
    CMD_resumeWorkTimeTracker,
    function () {
      if (activeCMD === "PAUSE") {
        vscode.window.showInformationMessage(
          `👌🤖 Working session timer resumed`
        );
        activeCMD = "ACTIVE";
        ResumeTimeCounter(stausBarItem);
      } else if (activeCMD === "ACTIVE") {
        vscode.window.showWarningMessage(
          `👾 Working session timer already running!`
        );
      } else if (activeCMD === "NOT_ACTIVE") {
        vscode.window.showErrorMessage(
          `👾 No active Working session timer to resume!`
        );
      }
    }
  );
  context.subscriptions.push(ResumeCMD);

  // Reset the time counter whenever the reset command gets executed
  let ResetCMD = vscode.commands.registerCommand(
    CMD_resetWorkTimeTracker,
    function () {
      if ((activeCMD === "ACTIVE") | (activeCMD === "PAUSE")) {
        vscode.window.showInformationMessage(`👋🤖 Reseting timer`);
        activeCMD = "NOT_ACTIVE";
        ResetTimeCounter(stausBarItem);
      } else {
        vscode.window.showInformationMessage(`👾 Timer is already 00:00:00 `);
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

//Cleanup function
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
