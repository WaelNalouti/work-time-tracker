const vscode = require("vscode");
const { timeCounter } = require("./functions/counter.js");
/**
 * @param {vscode.ExtensionContext} context
 */
let stausBarItem;

function activate(context) {
  const CMD_startWorkTimeTracker = "work-time-tracker.startTimer";

  // Displays a notification when starting the counter
  let StartCMD = vscode.commands.registerCommand(
    CMD_startWorkTimeTracker,
    function () {
      vscode.window.showInformationMessage(`⌚ Starting working session timer`);
    }
  );
  context.subscriptions.push(StartCMD);

  //Creates a status bar item
  stausBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    0
  );
  stausBarItem.command = CMD_startWorkTimeTracker;
  context.subscriptions.push(stausBarItem);
  stausBarItem.show();
  timeCounter(stausBarItem);
}

module.exports = {
  activate,
};
