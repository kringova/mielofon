import React, { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  useMemo, 
  useContext, 
  createContext,
  Fragment,
  forwardRef
} from 'react';

// Экспортируем все хуки React явно
export const {
  useReducer,
  useLayoutEffect,
  useImperativeHandle,
  useDebugValue
} = React;

// Другие экспорты React
export const {
  Children,
  cloneElement,
  isValidElement,
  createElement,
  Component
} = React;

export {
  React as default,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
  createContext,
  Fragment,
  forwardRef
}; 