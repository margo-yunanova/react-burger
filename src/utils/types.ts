import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { AppDispatch, AppThunk, RootState } from "..";

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: 'bun' | 'main' | 'sauce';
  __v: number;
  _id: string;
};

export type TMadeOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
  };
  price: number;
  status: 'done' | 'pending' | 'created';
  updatedAt: string;
  _id: string;
}

export type TAction<T, U = never> = {
  readonly type: T;
  readonly payload?: U;
}

export type TPayloadUser = {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export type WsActionsName = 'wsInit' | 'wsSendMessage' | 'onOpen' | 'onClose' | 'onError' | 'onMessage' | 'wsStop';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;
