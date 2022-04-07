/* eslint-disable import/prefer-default-export */
import { CSSObject, Keyframes } from '@ant-design/cssinjs';

const initMotionCommon = (duration: string): CSSObject => ({
  animationDuration: duration,
  animationFillMode: 'both',
});

// FIXME: origin less code seems same as initMotionCommon. Maybe we can safe remove
const initMotionCommonLeave = (duration: string): CSSObject => ({
  animationDuration: duration,
  animationFillMode: 'both',
});

export const initMotion = (
  hashId: string,
  motionName: string,
  inKeyframes: Keyframes,
  outKeyframes: Keyframes,
  duration: string,
): CSSObject => {
  const motionCls = `.${motionName}`;

  return {
    [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
      ...initMotionCommon(duration),
      animationPlayState: 'paused',
    },

    [`${motionCls}-leave`]: {
      ...initMotionCommonLeave(duration),
      animationPlayState: 'paused',
    },

    [`
      ${motionCls}-enter${motionCls}-enter-active,
      ${motionCls}-appear${motionCls}-appear-active
    `]: {
      animationName: inKeyframes.getName(hashId),
      animationPlayState: 'running',
    },

    [`${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes.getName(hashId),
      animationPlayState: 'running',
      pointerEvents: 'none',
    },
  };
};