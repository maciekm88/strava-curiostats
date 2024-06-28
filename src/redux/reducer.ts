import {AthleteData} from './types';
import {
  SET_ATHLETE_DATA,
  SET_TOTAL_DISTANCES,
  SET_ELEVATION_STATS,
  ActionTypes,
} from './actions';

export interface State {
  athleteData: AthleteData;
  totalRideDistance: number | null;
  totalRunDistance: number | null;
  totalDistance: number | null;
  biggestBikeDistance: number | null;
  runElevationGain: number | null;
  rideElevationGain: number | null;
  totalElevation: number | null;
}

const initialState: State = {
  athleteData: {},
  totalRideDistance: null,
  totalRunDistance: null,
  totalDistance: null,
  biggestBikeDistance: null,
  runElevationGain: null,
  rideElevationGain: null,
  totalElevation: null,
};

const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_ATHLETE_DATA:
      return {
        ...state,
        athleteData: action.payload,
      };
    case SET_TOTAL_DISTANCES:
      return {
        ...state,
        totalRideDistance: action.payload.ride,
        totalRunDistance: action.payload.run,
        totalDistance: action.payload.total,
        biggestBikeDistance: action.payload.biggestBike,
      };
    case SET_ELEVATION_STATS:
      return {
        ...state,
        runElevationGain: action.payload.runElevation,
        rideElevationGain: action.payload.rideElevation,
        totalElevation: action.payload.totalElevation,
      };
    default:
      return state;
  }
};

export default reducer;
