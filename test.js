setTimeout(() => {
  console.log("arrive in call stack");
}, 1);

// async function get moved to callback queue or task queue
// and then to the stack once the stack is empty
// in this test even though the timeout is 1ms but its callback
// won't get called until this loop finishes and gets out of the stack
for (let i = 0; i < 10000000000; i++) {
  2 * 2;
}
console.log("between two loops");
for (let i = 0; i < 10000000000; i++) {
  2 * 2;
}

console.log("end of script");
