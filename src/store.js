// store.js
import { reactive } from "vue";
import { isFinite, isNaN, isNumber, round } from "lodash-es";

function getResult() {
  const runsToGet = getRunsToGet();

  if (!store.isFurtherPlayPossible && runsToGet === 1) {
    return "Match tied";
  } else if (!store.isFurtherPlayPossible && runsToGet < 1) {
    return `Team B wins by ${Math.abs(runsToGet)} run(s)`;
  } else if (!store.isFurtherPlayPossible && runsToGet > 1) {
    return `Team A wins by ${runsToGet - 1} run(s)`;
  }

  return null;
}

function getRunRate({ runs, overs, balls }) {
  runs = runs || 0;
  overs = overs || 0;
  balls = balls || 0;

  const rr = (parseInt(runs) / (parseInt(overs) * 6 + parseInt(balls))) * 6;
  return isNumber(rr) && !isNaN(rr) && isFinite(rr) ? round(rr, 2) : null;
}

function getTotalInterruptions(interruptions) {
  return interruptions.reduce((acc, time) => acc + time, 0);
}

function getOversLost() {
  const totalInterruption = getTotalInterruptions(store.interruptions);
  const oversLost = Math.floor(totalInterruption / 4.2);

  return isNumber(oversLost) ? oversLost : 0;
}

function getTarget() {
  return getParScore() + 1;
}

function getRunsToGet() {
  return getTarget() - (store.innings[1].runs || 0);
}

function isMatchAbandoned() {
  return !store.isFurtherPlayPossible && (store.innings[1].overs || 0) < store.minimumOversThatConstituteAMatch;
}

function getRevisedOvers() {
  if (!store.isFurtherPlayPossible) {
    return "NA";
  }
  const oversLost = getOversLost() || 0;

  return store.oversPerTeam - oversLost;
}

function getBallsRemaining() {
  if (!store.isFurtherPlayPossible) {
    return 0;
  }

  const revisedOvers = getRevisedOvers();
  const revisedBalls = revisedOvers * 6;

  const playedBalls = (store.innings[1].overs || 0) * 6 + (store.innings[1].balls || 0);
  return revisedBalls - playedBalls;
}

function getParScore() {
  const revisedOvers = getRevisedOvers();
  const firstInningsRunRate = getRunRate(store.innings[0]);
  const playedBalls = (store.innings[1].overs || 0) * 6 + (store.innings[1].balls || 0);

  const applicableBalls = store.isFurtherPlayPossible ? revisedOvers * 6 : playedBalls;

  return Math.round((applicableBalls * firstInningsRunRate) / 6);
}

export const store = reactive({
  oversPerTeam: 0,
  minimumOversThatConstituteAMatch: 0,
  count: 0,
  innings: [
    {
      team: "A",
      runs: 0,
      overs: 0,
      balls: 0,
    },
    {
      team: "B",
      runs: 0,
      overs: 0,
      balls: 0,
    },
  ],
  interruptions: [0],
  getRunRate,
  getOversLost,
  getTotalInterruptions,
  isFurtherPlayPossible: true,
  getTarget,
  getBallsRemaining,
  getParScore,
  getRunsToGet,
  isMatchAbandoned,
  getResult,
});
