/**
* config {
*   portId: 'COM1',
*   terminals: [
*     {'id': 1, 'protocol': 'tenzo-m-v1'}
*   ]
* }
*/
exports.default = function TerminalManager(config) {
  config = config || {};
  if (config.portId == null) {
    throw Error('portId is empty');
  } 
  fn = function() {};
  this._port = { write: fn, on: fn, flush: fn, platformOptions  };
  this._terminals = config.terminals;
  this._hTimer = null;
  this._timerPeriod = config.refreshTime || 500;
  this._terminalIdToPoll = config.terminals.length > 0 ? config.terminals[0] : null;
}

TerminalManager.prototype.startMonitoring = function() {
  var terminal;
  if (this._terminalIdToPoll == null) {
    console.warn('no terminals to poll');
    return false;
  }
  terminal = this._terminals[terminalIdx];
  this._pollTerminal(terminal);
  return true;
}

TerminalManager.prototype.stopMonitoring = function(cb) {
  clearTimeout(this._hTimer);
  this._port.flush(cb);
}

// TerminalManager.prototype.addTerminal = function() {
//   this._port.flush(function (err) {
//     if (err) throw err;
//     this._pollTerminal
//   }); //?? callback
// }

TerminalManager.prototype._pollTerminal = function(terminal) {
  if (terminal == null) {
    throw Error('Bad terminal value');
  }

  cmd = (this._terminalIdToPoll).toString(16);
  this._port.write(cmd);
}
