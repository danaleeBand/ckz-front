import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const getRelativeTimeString = (date: Date): string => {
  const now = dayjs();
  const target = dayjs(date);
  const diffMinutes = now.diff(target, 'minute');
  const diffHours = now.diff(target, 'hour');
  const diffDays = now.diff(target, 'day');
  const diffMonths = now.diff(target, 'month');
  const diffYears = now.diff(target, 'year');

  if (diffMinutes < 3) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 30) return `${diffDays}일 전`;
  if (diffMonths < 12) return `${diffMonths}개월 전`;
  return `${diffYears}년 전`;
};
