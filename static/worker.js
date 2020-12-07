let self = this;

function isPrime(number) {
  if (number == 1 || number === 0) return true
  for (let i=2; i<=Math.sqrt(number);i++) {
    if (number % i === 0) return false
  }
  return true
}

self.onmessage = function(e) {
  const data = e.data;
  result = isPrime(data)
  postMessage(result)
}