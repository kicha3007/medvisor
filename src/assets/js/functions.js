function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
}