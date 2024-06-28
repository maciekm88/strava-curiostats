import {AthleteData} from './types';

export const SET_ATHLETE_DATA = 'SET_ATHLETE_DATA';
export const SET_TOTAL_DISTANCES = 'SET_TOTAL_DISTANCES';
export const SET_ELEVATION_STATS = 'SET_ELEVATION_STATS';

export interface SetAthleteDataAction {
  type: typeof SET_ATHLETE_DATA;
  payload: AthleteData;
}

export interface SetTotalDistancesAction {
  type: typeof SET_TOTAL_DISTANCES;
  payload: {
    ride: number;
    run: number;
    total: number;
    biggestBike: number;
  };
}

export interface SetElevationStatsAction {
  type: typeof SET_ELEVATION_STATS;
  payload: {
    runElevation: number;
    rideElevation: number;
    totalElevation: number;
  };
}

export type ActionTypes =
  | SetAthleteDataAction
  | SetTotalDistancesAction
  | SetElevationStatsAction;

export const setAthleteData = (data: AthleteData): SetAthleteDataAction => ({
  type: SET_ATHLETE_DATA,
  payload: data,
});

export const setTotalDistances = (
  ride: number,
  run: number,
  total: number,
  biggestBike: number,
): SetTotalDistancesAction => ({
  type: SET_TOTAL_DISTANCES,
  payload: {ride, run, total, biggestBike},
});

export const setElevationStats = (
  runElevation: number,
  rideElevation: number,
  totalElevation: number,
): SetElevationStatsAction => ({
  type: SET_ELEVATION_STATS,
  payload: {runElevation, rideElevation, totalElevation},
});
