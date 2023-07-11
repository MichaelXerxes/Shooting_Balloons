import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
export type RootStackParamList = {
  Home: undefined;
  SelectCharacter: { quizType: string } | undefined;
  Settings: undefined;
  Scores: undefined;
  Game: {playerImageName: number;};
  Quiz: { quizType: string; numberQuestions: number };
  EndGame: undefined;
  CustomGameEngine:undefined;

};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type SelectCharacterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SelectCharacter"
>;
//export type SelectCharacterScreenRouteProp = RouteProp<RootStackParamList, "SelectCharacter">;
export type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

export type ScoreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Scores"
>;
export type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Game"
>& {
  navigate: (
    screen: "Game",
    params: { playerImageName: number }
  ) => void;
};
export type QuizScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Quiz"
>;
export type EndGameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EndGame"
> & {
  navigate: (
    screen: "EndGame",
    params: {
      quizType: string;
      numberQuestions: number;
      goodAnswers: string;
      totalTime: number;
    }
  ) => void;
};

export type QuizScreenRouteProp = RouteProp<RootStackParamList, "Quiz">;

export type EndGameScreenRouteProp = RouteProp<RootStackParamList, "EndGame">;

export type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;
export type UniversalNavigationProps =
  | HomeScreenNavigationProp
  | SelectCharacterScreenNavigationProp
  | SettingsScreenNavigationProp
  | ScoreScreenNavigationProp
  | GameScreenNavigationProp
  | QuizScreenNavigationProp
  | EndGameScreenNavigationProp;
