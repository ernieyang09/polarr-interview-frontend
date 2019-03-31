function randomArraySize10() {
  return [...Array(10)].map(() => Math.ceil(Math.random() * 10))
}


function getIndicesOfLargestValues(arr) {
  lens = arr.length;

  const idxMap = new Map();
  const haveValue = [];

  arr.forEach((v, i) => {
    if (!idxMap.get(v)) {
      idxMap.set(v, []);
      haveValue.push(v);
    }
    idxMap.get(v).push(i);
  });

  result = []

  haveValue.sort((a,b) => b-a).every((num)=> {
    result = [...result, ...idxMap.get(num)];
    if (result.length >= 5) {
      return false
    }
    return true
  });

  return result;
}

