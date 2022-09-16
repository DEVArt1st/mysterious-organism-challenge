// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


//MY CODE:

//Factory Function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    get dnaBases() {
      return this.dna;
    },

    mutate() {
      const randomBase = Math.floor(Math.random() * dna.length);
      dna[randomBase] = returnRandBase();
      return dna;
    },
    compareDNA(otherPAequor) {
      let sameBaseCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (dna[i] === otherPAequor.dna[i]) {
          sameBaseCount++;
        }
      }
      const percent = ((sameBaseCount / this.dna.length) * 100).toFixed();
      console.log(
        `specimen ${this.specimenNum} and specimen ${otherPAequor.specimenNum} have ${percent}% DNA in common.`
      );
    },
    willLikelySurvive() {
      let baseCGCount = 0;
      for (const bases of this.dna) {
        if (bases === "C" || bases === "G") {
          baseCGCount++;
        }
      }
      const percent = ((baseCGCount / dna.length) * 100).toFixed();
      if (percent >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand(){
      let compStrand = [];
      for(const base of dna){
        switch(base){
          case "A":
          compStrand.push("T");
          break;
          case "T":
          compStrand.push("A");
          break;
          case "C":
          compStrand.push("G");
          break;
          case "G":
          compStrand.push("C");
          break;
          default:
          return "Unidentified base";
          break;
        }
      }
      return compStrand;
    }
  };
};

//Creates an array of 30 survivable instances:
function createPAequorInstances() {
  let survivablePAequor = [];
  //I set (i = 1) because our first specimen is always 1 not 0. And to print 30 and NOT 29 I put (i <= 30) since i starts at 1.
  for (let i = 1; i <= 30; i++) {
    //When we create our specimens we use (i) for our specimen number because not all specimens can have the same number when created!
    let newPAequor = pAequorFactory(i, mockUpStrand());
    //
    if (newPAequor.willLikelySurvive() === true) {
      survivablePAequor.push(newPAequor);
    }
    //Since we need 30 instances we need to subtract (i) one time, if one of the newPAequors did not match the true condition.
    //Because if we dont then (i) will continue to add until it reaches 30. 
    else {
      i--;
    }
  }
  return survivablePAequor;
}

// console.log(mockUpStrand());
const pAequorCurrent = pAequorFactory(1, [
  "C",
  "G",
  "T",
  "G",
  "T",
  "A",
  "T",
  "G",
  "T",
  "T",
  "C",
  "C",
  "G",
  "C",
  "C",
]);

console.log(pAequorCurrent.complementStrand());
// const pAequorOther = pAequorFactory(2, mockUpStrand());
// console.log(pAequorCurrent.dnaBases);
// pAequorCurrent.compareDNA(pAequorOther);
// console.log(pAequorCurrent.dnaBases);
// console.log(createPAequorInstances());
